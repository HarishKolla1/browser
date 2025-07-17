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
    close: () => ipcRenderer.send('close-window'),
    newTab: () => ipcRenderer.send('tab-new'),
    switchTab: (id) => ipcRenderer.send('tab-switch', id),
    closeTab: (id) => ipcRenderer.send('tab-close', id),

    onTabCreated: (callback) => ipcRenderer.on('tab-created', (_e,tab) => callback(tab)),
    onTabUpdated: (callback) => ipcRenderer.on('tab-updated', (_e, data) => callback(data)),
    onTabActivated: (callback) => ipcRenderer.on('tab-activated', (_e, id) => callback(id)),
    onTabClosed: (callback) => ipcRenderer.on('tab-closed', (_e, id) => callback(id)),
    onTabUrlUpdated: (callback) =>ipcRenderer.on('tab-url-updated', (_e, data) => callback(data)),

    getInitialState: () => ipcRenderer.invoke('get-initial-state'),

    removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
});