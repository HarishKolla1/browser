const { contextBridge, ipcRenderer } = require('electron');

console.log("Preload script loaded");

contextBridge.exposeInMainWorld('electronAPI', {
    sendSearch: (query) => ipcRenderer.send('search-query', query),
    hideBrowserView: () => ipcRenderer.send('hide-browser-view'),
    showBrowserView: () => ipcRenderer.send('show-browser-view'),
});