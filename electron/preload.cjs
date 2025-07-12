const { contextBridge, ipcRenderer } = require('electron');

console.log("Preload script loaded");

contextBridge.exposeInMainWorld('electronAPI', {
    sendSearch: (query) => ipcRenderer.send('search-query', query),
    hideBrowserView: () => ipcRenderer.send('hide-browser-view'),
    showBrowserView: () => ipcRenderer.send('show-browser-view'),
    goBack: () => ipcRenderer.send('nav-back'),
    goForward: () => ipcRenderer.send('nav-forward'),
    reloadPage: () => ipcRenderer.send('nav-reload'),
    minimize: () => ipcRenderer.send('minimize-window'),
    maximize: () => ipcRenderer.send('maximize-window'),
    close: () => ipcRenderer.send('close-window')
});