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
  const template = HtmlService.createTemplateFromFile("Sidebar");
  template.config = { backendUrl: BACKEND_URL, siteUrl: SITE_URL };
  DocumentApp.getUi().showSidebar(template.evaluate().setTitle("Publish to Wavyrn blog"));
}

// Same file as File → Download → Web Page (.html, zipped), returned base64-encoded.
// Drive caps exports at 10 MB.
function exportDocZip() {
  const id = DocumentApp.getActiveDocument().getId();
  const response = UrlFetchApp.fetch(
    `https://www.googleapis.com/drive/v3/files/${id}/export?mimeType=application/zip`,
    {
      headers: { Authorization: `Bearer ${ScriptApp.getOAuthToken()}` },
      muteHttpExceptions: true,
    },
  );
  if (response.getResponseCode() !== 200) {
    throw new Error(`Export failed (${response.getResponseCode()}): ${response.getContentText()}`);
  }
  return Utilities.base64Encode(response.getBlob().getBytes());
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
