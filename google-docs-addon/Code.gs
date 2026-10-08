// Google Docs add-on that publishes the open document to the Wavyrn blog.
// The sidebar (Sidebar.html) does the parsing and talks to the backend;
// this file only builds the menu, exports the document, and stores small bits of state.

// Set these before deploying.
const BACKEND_URL = "https://YOUR-BACKEND-HOST"; // same value as VITE_REACT_APP_BACKEND_URL
const SITE_URL = "https://wavyrn.com";

function onOpen() {
  DocumentApp.getUi()
    .createAddonMenu()
    .addItem("Publish to blog", "showSidebar")
    .addToUi();
}

function onInstall(e) {
  onOpen(e);
}

function showSidebar() {
  if (BACKEND_URL.includes("YOUR-BACKEND-HOST")) {
    throw new Error("Set BACKEND_URL at the top of Code.gs to the blog backend's address.");
  }
  const template = HtmlService.createTemplateFromFile("Sidebar");
  template.config = { backendUrl: BACKEND_URL, siteUrl: SITE_URL };
  DocumentApp.getUi().showSidebar(template.evaluate().setTitle("Publish to Wavyrn blog"));
}

// Same file as File → Download → Web Page (.html, zipped), returned base64-encoded.
// Uses the Docs download URL rather than the Drive API, so the Drive API doesn't
// need to be enabled in the add-on's Cloud project.
function exportDocZip() {
  const id = DocumentApp.getActiveDocument().getId();
  const response = UrlFetchApp.fetch(
    `https://docs.google.com/document/d/${id}/export?format=zip`,
    {
      headers: { Authorization: `Bearer ${ScriptApp.getOAuthToken()}` },
      muteHttpExceptions: true,
    },
  );
  const type = String(response.getHeaders()["Content-Type"] || "");
  if (response.getResponseCode() !== 200 || type.startsWith("text/html")) {
    // A sign-in page comes back as 200 text/html, so check the type too.
    throw new Error(
      `Export failed (${response.getResponseCode()}, ${type}). Token scopes: ${tokenScopes_()}. ` +
        response.getContentText().slice(0, 500),
    );
  }
  return Utilities.base64Encode(response.getBlob().getBytes());
}

// Scopes the script's OAuth token actually carries. These come from the running version's
// manifest, which can differ from what the account page lists as granted.
function tokenScopes_() {
  const response = UrlFetchApp.fetch(
    `https://oauth2.googleapis.com/tokeninfo?access_token=${ScriptApp.getOAuthToken()}`,
    { muteHttpExceptions: true },
  );
  try {
    return JSON.parse(response.getContentText()).scope || "unknown";
  } catch (e) {
    return "unknown";
  }
}

// The editor token is per user; the published post id and topics are per document,
// so republishing a document updates the same post.
function getState() {
  const doc = PropertiesService.getDocumentProperties();
  return {
    token: PropertiesService.getUserProperties().getProperty("authToken"),
    postId: doc.getProperty("postId"),
    topics: JSON.parse(doc.getProperty("topics") || "[]"),
  };
}

function saveToken(token) {
  const props = PropertiesService.getUserProperties();
  if (token) props.setProperty("authToken", token);
  else props.deleteProperty("authToken");
}

function savePost(postId, topics) {
  const props = PropertiesService.getDocumentProperties();
  if (postId) props.setProperty("postId", postId);
  else props.deleteProperty("postId");
  props.setProperty("topics", JSON.stringify(topics || []));
}
