// Points any Dropbox link at dl.dropboxusercontent.com, which serves the raw file, so it
// can be used as an <img> src. Share links (www.dropbox.com/...) load Dropbox's web page.
// Same as the backend's replaceDropboxUrl.
export const toDirectDropboxUrl = (url) => {
  if (!url) return url;
  return url.replace(
    /^(?:https?:\/\/)?(?:www\.)?(?:dl\.)?dropbox(?:usercontent)?\.com(?=[/?#]|$)/i,
    "https://dl.dropboxusercontent.com",
  );
};
