// Points any Dropbox link at dl.dropboxusercontent.com, which serves the raw file.
// Also repairs www.dl.dropboxusercontent.com links: Dropbox's certificate doesn't
// cover that host, so browsers refuse to load them.
export function replaceDropboxUrl(url) {
    if (!url) return url;
    return url.replace(
        /^(?:https?:\/\/)?(?:www\.)?(?:dl\.)?dropbox(?:usercontent)?\.com(?=[/?#]|$)/i,
        'https://dl.dropboxusercontent.com'
    );
}
