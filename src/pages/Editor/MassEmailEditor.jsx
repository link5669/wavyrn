import { useEffect, useRef, useState } from "react";
import { FiTrash2 } from "react-icons/fi";

const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

// MXRoute's default outgoing limit per email account
const HOURLY_SEND_LIMIT = 400;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const labelStyle = { display: "block", marginBottom: "5px", fontWeight: "bold" };
const inputStyle = { width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box" };
const hintStyle = { fontSize: "12px", color: "#666", margin: "4px 0 0" };
const fieldStyle = { marginBottom: "15px" };
const button = (backgroundColor) => ({
  backgroundColor, color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer",
});

const authHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem("authToken")}` });

const api = async (path, options = {}) => {
  const response = await fetch(`${BACKEND_URL}/api/mail${path}`, {
    ...options,
    headers: { ...authHeaders(), "Content-Type": "application/json", ...(options.headers || {}) },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
  return data;
};

// Splits one CSV line, honoring double-quoted fields
const splitCsvLine = (line) => {
  const cells = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (quoted) {
      if (c === '"' && line[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === "," || c === ";" || c === "\t") { cells.push(cell.trim()); cell = ""; }
    else cell += c;
  }
  cells.push(cell.trim());
  return cells;
};

// Reads contacts from CSV or one-per-line text. Uses "email"/"name" header
// columns when present; otherwise takes the first email-looking cell per row
// and the first other non-empty cell as the name.
const parseContacts = (text) => {
  const rows = text.split(/\r?\n/).filter((line) => line.trim()).map(splitCsvLine);
  if (rows.length === 0) return { contacts: [], skipped: 0 };

  const header = rows[0].map((cell) => cell.toLowerCase());
  const emailColumn = header.findIndex((cell) => cell === "email" || cell === "e-mail" || cell === "email address");
  const nameColumn = header.findIndex((cell) => cell === "name" || cell === "full name");
  const dataRows = emailColumn >= 0 ? rows.slice(1) : rows;

  const contacts = [];
  let skipped = 0;
  for (const row of dataRows) {
    let email, name;
    if (emailColumn >= 0) {
      email = row[emailColumn];
      name = nameColumn >= 0 ? row[nameColumn] : "";
    } else {
      const emailIndex = row.findIndex((cell) => EMAIL_PATTERN.test(cell));
      email = row[emailIndex];
      name = row.find((cell, i) => i !== emailIndex && cell) || "";
    }
    if (email && EMAIL_PATTERN.test(email)) contacts.push({ email: email.toLowerCase(), name: name || "" });
    else skipped++;
  }
  return { contacts, skipped };
};

const mergeContacts = (existing, added) => {
  const seen = new Set(existing.map((c) => c.email));
  const merged = [...existing];
  for (const contact of added) {
    if (!seen.has(contact.email)) {
      seen.add(contact.email);
      merged.push(contact);
    }
  }
  return merged;
};

const MassEmailEditor = () => {
  const [config, setConfig] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [pasted, setPasted] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isHtml, setIsHtml] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [progress, setProgress] = useState(null); // { sent, failed: [{email, error}], total }
  const [message, setMessage] = useState(null);
  const stopRequested = useRef(false);

  const showMessage = (text, type) => setMessage({ text, type });

  useEffect(() => {
    api("/config")
      .then(setConfig)
      .catch((error) => showMessage("Failed to load email settings: " + error.message, "error"));
  }, []);

  const addContacts = (text) => {
    const { contacts: parsed, skipped } = parseContacts(text);
    const merged = mergeContacts(contacts, parsed);
    const added = merged.length - contacts.length;
    setContacts(merged);
    const duplicates = parsed.length - added;
    showMessage(
      `Added ${added} contact${added === 1 ? "" : "s"}` +
        (duplicates ? `, ${duplicates} duplicate${duplicates === 1 ? "" : "s"} ignored` : "") +
        (skipped ? `, ${skipped} row${skipped === 1 ? "" : "s"} without a valid email skipped` : ""),
      added ? "success" : "error",
    );
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) addContacts(await file.text());
  };

  const handlePaste = () => {
    addContacts(pasted);
    setPasted("");
  };

  const sendBatches = async (recipients) => {
    const batchSize = config?.maxBatchSize || 25;
    const failed = [];
    let sent = 0;
    setProgress({ sent, failed, total: recipients.length });
    for (let i = 0; i < recipients.length; i += batchSize) {
      if (stopRequested.current) break;
      const batch = recipients.slice(i, i + batchSize);
      try {
        const { results } = await api("/send", {
          method: "POST",
          body: JSON.stringify({ subject, body, isHtml, recipients: batch }),
        });
        for (const result of results) {
          if (result.ok) sent++;
          else failed.push({ email: result.email, error: result.error });
        }
      } catch (error) {
        failed.push(...batch.map((c) => ({ email: c.email, error: error.message })));
      }
      setProgress({ sent, failed: [...failed], total: recipients.length });
    }
    return { sent, failed };
  };

  const validate = () => {
    if (!subject.trim()) return "Subject is required.";
    if (!body.trim()) return "Body is required.";
    return null;
  };

  const handleSendTest = async () => {
    const error = validate() || (!EMAIL_PATTERN.test(testEmail.trim()) && "Enter a valid test address.");
    if (error) return showMessage(error, "error");
    setSending(true);
    try {
      const { results } = await api("/send", {
        method: "POST",
        body: JSON.stringify({ subject, body, isHtml, recipients: [{ email: testEmail.trim(), name: contacts[0]?.name || "" }] }),
      });
      if (results[0].ok) showMessage(`Test email sent to ${testEmail.trim()}`, "success");
      else showMessage(`Test failed: ${results[0].error}`, "error");
    } catch (err) {
      showMessage("Test failed: " + err.message, "error");
    } finally {
      setSending(false);
    }
  };

  const runSend = async (recipients) => {
    stopRequested.current = false;
    setSending(true);
    setMessage(null);
    const { sent, failed } = await sendBatches(recipients);
    setSending(false);
    const stopped = stopRequested.current && sent + failed.length < recipients.length;
    showMessage(
      `${stopped ? "Stopped. " : ""}Sent ${sent} of ${recipients.length}` + (failed.length ? `, ${failed.length} failed` : ""),
      failed.length || stopped ? "error" : "success",
    );
  };

  const handleSendAll = () => {
    const error = validate() || (contacts.length === 0 && "Add at least one contact.");
    if (error) return showMessage(error, "error");
    const confirmed = window.confirm(
      `Send "${subject}" to ${contacts.length} contact${contacts.length === 1 ? "" : "s"}? This cannot be undone.`,
    );
    if (confirmed) runSend(contacts);
  };

  const handleRetryFailed = () => {
    const failedEmails = new Set(progress.failed.map((f) => f.email));
    runSend(contacts.filter((c) => failedEmails.has(c.email)));
  };

  return (
    <div>
      <h2 style={{ marginBottom: "10px" }}>Mass Email</h2>
      {config && !config.configured && (
        <p style={{ padding: "10px", backgroundColor: "#fff3cd", color: "#856404", borderRadius: "4px" }}>
          Email sending is not configured on the server. Set SMTP_HOST, SMTP_USER and SMTP_PASS in the backend environment.
        </p>
      )}
      {config?.from && <p style={hintStyle}>Sending from: <strong>{config.from}</strong></p>}

      {message && (
        <div
          style={{
            padding: "10px",
            margin: "15px 0",
            borderRadius: "4px",
            backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da",
            color: message.type === "success" ? "#155724" : "#721c24",
            border: message.type === "success" ? "1px solid #c3e6cb" : "1px solid #f5c6cb",
          }}
        >
          {message.text}
        </div>
      )}

      <section style={{ border: "1px solid #ddd", borderRadius: "4px", padding: "15px", margin: "15px 0" }}>
        <h3 style={{ marginTop: 0 }}>1. Contacts ({contacts.length})</h3>
        <div style={fieldStyle}>
          <label style={{ ...button("#007bff"), display: "inline-block", margin: 0 }}>
            Upload CSV / TXT
            <input type="file" accept=".csv,.txt,text/csv,text/plain" onChange={handleFile} disabled={sending} hidden />
          </label>
          <p style={hintStyle}>
            CSV with an &quot;email&quot; column (and optional &quot;name&quot; column), or one address per line.
            Duplicates are ignored.
          </p>
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Or paste contacts:</label>
          <textarea
            value={pasted}
            onChange={(e) => setPasted(e.target.value)}
            rows={3}
            placeholder={"jane@example.com, Jane Doe\njohn@example.com"}
            style={inputStyle}
          />
          <button type="button" onClick={handlePaste} disabled={!pasted.trim() || sending} style={{ ...button("#007bff"), marginTop: "8px" }}>
            Add
          </button>
        </div>
        {contacts.length > 0 && (
          <>
            <div style={{ maxHeight: "200px", overflowY: "auto", border: "1px solid #eee", borderRadius: "4px" }}>
              {contacts.map((contact) => (
                <div
                  key={contact.email}
                  style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 8px", borderBottom: "1px solid #f3f3f3" }}
                >
                  <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>
                    {contact.email}
                    {contact.name && <span style={{ color: "#666" }}> ({contact.name})</span>}
                  </span>
                  <button
                    type="button"
                    onClick={() => setContacts(contacts.filter((c) => c.email !== contact.email))}
                    disabled={sending}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#555", display: "flex" }}
                    aria-label={`Remove ${contact.email}`}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => window.confirm("Remove all contacts?") && setContacts([])}
              disabled={sending}
              style={{ ...button("#dc3545"), marginTop: "8px" }}
            >
              Clear all
            </button>
            {contacts.length > HOURLY_SEND_LIMIT && (
              <p style={{ ...hintStyle, color: "#856404" }}>
                MXRoute limits each account to about {HOURLY_SEND_LIMIT} emails per hour. Sends past that will fail;
                use &quot;Retry failed&quot; after an hour to finish the rest.
              </p>
            )}
          </>
        )}
      </section>

      <section style={{ border: "1px solid #ddd", borderRadius: "4px", padding: "15px", margin: "15px 0" }}>
        <h3 style={{ marginTop: 0 }}>2. Message</h3>
        <div style={fieldStyle}>
          <label style={labelStyle}>Subject:</label>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} style={inputStyle} />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={12}
            style={{ ...inputStyle, fontFamily: isHtml ? "monospace" : "inherit" }}
          />
          <p style={hintStyle}>
            Use {"{{name}}"} and {"{{email}}"} to insert each contact&apos;s details (in the subject too).
          </p>
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "bold" }}>
          <input type="checkbox" checked={isHtml} onChange={(e) => setIsHtml(e.target.checked)} />
          Body is HTML
        </label>
        {isHtml && body.trim() && (
          <div style={{ marginTop: "10px" }}>
            <label style={labelStyle}>Preview:</label>
            <iframe
              title="Email preview"
              srcDoc={body}
              sandbox=""
              style={{ width: "100%", height: "300px", border: "1px solid #ccc", borderRadius: "4px", background: "white" }}
            />
          </div>
        )}
      </section>

      <section style={{ border: "1px solid #ddd", borderRadius: "4px", padding: "15px", margin: "15px 0" }}>
        <h3 style={{ marginTop: 0 }}>3. Send</h3>
        <div style={{ ...fieldStyle, display: "flex", gap: "8px" }}>
          <input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="Send a test to..."
            style={{ ...inputStyle, flex: 1 }}
          />
          <button type="button" onClick={handleSendTest} disabled={sending} style={{ ...button(sending ? "#ccc" : "#6c757d"), whiteSpace: "nowrap" }}>
            Send test
          </button>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            type="button"
            onClick={handleSendAll}
            disabled={sending || contacts.length === 0}
            style={{ ...button(sending || contacts.length === 0 ? "#ccc" : "#28a745"), fontWeight: "bold", padding: "12px 24px" }}
          >
            {sending ? "Sending..." : `Send to ${contacts.length} contact${contacts.length === 1 ? "" : "s"}`}
          </button>
          {sending && (
            <button type="button" onClick={() => { stopRequested.current = true; }} style={button("#dc3545")}>
              Stop
            </button>
          )}
        </div>

        {progress && (
          <div style={{ marginTop: "15px" }}>
            <div style={{ height: "10px", background: "#eee", borderRadius: "5px", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${((progress.sent + progress.failed.length) / progress.total) * 100}%`,
                  background: progress.failed.length ? "#ffc107" : "#28a745",
                  transition: "width 0.3s",
                }}
              />
            </div>
            <p style={hintStyle}>
              {progress.sent} sent, {progress.failed.length} failed, {progress.total} total
            </p>
            {progress.failed.length > 0 && !sending && (
              <>
                <div style={{ maxHeight: "150px", overflowY: "auto", fontSize: "13px", color: "#721c24", marginTop: "8px" }}>
                  {progress.failed.map((f) => (
                    <div key={f.email}>{f.email}: {f.error}</div>
                  ))}
                </div>
                <button type="button" onClick={handleRetryFailed} style={{ ...button("#ffc107"), color: "black", marginTop: "8px" }}>
                  Retry failed
                </button>
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default MassEmailEditor;
