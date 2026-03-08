import express from "express";

const router = express.Router();

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;

if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID) {
  console.warn("Mailchimp: MAILCHIMP_API_KEY or MAILCHIMP_LIST_ID not set. Newsletter signup will fail.");
}

function getMailchimpBaseUrl() {
  if (!MAILCHIMP_API_KEY) return null;
  const dc = MAILCHIMP_API_KEY.split("-").pop();
  return `https://${dc}.api.mailchimp.com/3.0`;
}

router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "Email is required" });
    }

    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      return res.status(400).json({ error: "Email is required" });
    }

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID) {
      return res.status(503).json({ error: "Newsletter signup is not configured" });
    }

    const baseUrl = getMailchimpBaseUrl();
    const url = `${baseUrl}/lists/${MAILCHIMP_LIST_ID}/members`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString("base64")}`,
      },
      body: JSON.stringify({
        email_address: trimmed,
        status: "subscribed",
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 400 && data.title === "Member Exists") {
        return res.status(200).json({ message: "Already subscribed" });
      }
      return res.status(response.status).json({
        error: data.detail || data.title || "Subscription failed",
      });
    }

    return res.status(200).json({ message: "Subscribed successfully" });
  } catch (err) {
    console.error("Newsletter subscribe error:", err);
    return res.status(500).json({ error: "Subscription failed" });
  }
});

export default router;
