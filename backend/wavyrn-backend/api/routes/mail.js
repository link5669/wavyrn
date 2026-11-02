import express from "express";
import nodemailer from "nodemailer";
import { requireAuth } from "../middleware/auth.js";

// MXRoute SMTP settings, e.g. SMTP_HOST=xyz.mxrouting.net, SMTP_PORT=465
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT) || 465;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const MAIL_FROM = process.env.MAIL_FROM || SMTP_USER;

// The editor sends a large list as several small requests so each one finishes
// well within serverless time limits and progress can be shown per batch.
export const MAX_BATCH_SIZE = 25;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isConfigured = () => Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);

if (!isConfigured()) {
  console.warn("Mail: SMTP_HOST, SMTP_USER or SMTP_PASS not set. Mass email will fail.");
}

let transporter;
const getTransporter = () => {
  transporter ??= nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    pool: true,
    maxConnections: 3,
  });
  return transporter;
};

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// Replaces {{name}} and {{email}} with the recipient's values
const personalize = (template, recipient, isHtml) => {
  const values = {
    name: recipient.name || "",
    email: recipient.email,
  };
  return template.replace(/\{\{\s*(name|email)\s*\}\}/gi, (_, key) => {
    const value = values[key.toLowerCase()];
    return isHtml ? escapeHtml(value) : value;
  });
};

// Appended to the message when the editor's "Add signature" box is checked
const SIGNATURE_HTML = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:small;line-height:1.5;color:#888888;margin-top:16px">
<div>--</div>
<div><b>The Casting Team @</b> <a href="https://wavyrn.com/portfolio" style="color:#0000ee">Wavyrn</a></div>
<div>e: <a href="mailto:casting@wavyrn.com" style="color:#1155cc">casting@wavyrn.com</a></div>
<div><img src="https://wavyrn.com/images/logo_red.png" alt="Wavyrn" width="200" height="49" style="display:block;margin-top:4px;border:0"></div>
</div>`;

const SIGNATURE_TEXT = `--
The Casting Team @ Wavyrn (https://wavyrn.com/portfolio)
e: casting@wavyrn.com`;

// Builds the message content. A signature needs HTML for its links and logo,
// so a plain-text body is converted to HTML (keeping its line breaks) and
// also sent as the text alternative.
const buildContent = (body, recipient, isHtml, signature) => {
  const personalized = personalize(body, recipient, isHtml);
  if (!signature) return { [isHtml ? "html" : "text"]: personalized };
  if (isHtml) return { html: personalized + SIGNATURE_HTML };
  return {
    html: `<div style="white-space:pre-wrap">${escapeHtml(personalized)}</div>${SIGNATURE_HTML}`,
    text: `${personalized}\n\n${SIGNATURE_TEXT}`,
  };
};

const router = express.Router();

router.get("/config", requireAuth, (req, res) => {
  res.json({ configured: isConfigured(), from: MAIL_FROM || "", maxBatchSize: MAX_BATCH_SIZE, signatureHtml: SIGNATURE_HTML });
});

router.post("/send", requireAuth, async (req, res) => {
  if (!isConfigured()) {
    return res.status(503).json({ error: "Email sending is not configured on the server" });
  }

  const { subject, body, isHtml, signature, recipients } = req.body;
  if (typeof subject !== "string" || !subject.trim()) {
    return res.status(400).json({ error: "Subject is required" });
  }
  if (typeof body !== "string" || !body.trim()) {
    return res.status(400).json({ error: "Body is required" });
  }
  if (!Array.isArray(recipients) || recipients.length === 0) {
    return res.status(400).json({ error: "At least one recipient is required" });
  }
  if (recipients.length > MAX_BATCH_SIZE) {
    return res.status(400).json({ error: `At most ${MAX_BATCH_SIZE} recipients per request` });
  }

  const mailer = getTransporter();
  // Each recipient gets their own message, so nobody sees the rest of the list
  const results = await Promise.all(
    recipients.map(async (raw) => {
      const recipient = {
        email: typeof raw?.email === "string" ? raw.email.trim() : "",
        name: typeof raw?.name === "string" ? raw.name.trim() : "",
      };
      if (!EMAIL_PATTERN.test(recipient.email)) {
        return { email: recipient.email, ok: false, error: "Invalid email address" };
      }
      try {
        await mailer.sendMail({
          from: MAIL_FROM,
          to: recipient.name ? { name: recipient.name, address: recipient.email } : recipient.email,
          subject: personalize(subject, recipient, false),
          ...buildContent(body, recipient, Boolean(isHtml), Boolean(signature)),
        });
        return { email: recipient.email, ok: true };
      } catch (error) {
        return { email: recipient.email, ok: false, error: error.message };
      }
    }),
  );

  res.json({ results });
});

export default router;
