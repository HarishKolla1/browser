const { contextBridge, ipcRenderer } = require('electron');

console.log("Preload script loaded");

contextBridge.exposeInMainWorld('electronAPI', {
    sendSearch: (query) => ipcRenderer.send('search-query', query),
});