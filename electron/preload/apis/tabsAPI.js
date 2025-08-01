import { ipcRenderer } from "electron";

const tabsAPI = {
    newTab: () => ipcRenderer.send('tab-new'),
    switchTab: (id) => ipcRenderer.send('tab-switch',id),
    closeTab: (id) => ipcRenderer.send('tab-close',id),


    onTabCreated: (callback) =>ipcRenderer.on('tab-created',(_e,tab) => callback(tab)),
    onTabUpdated: (callback) =>ipcRenderer.on('tab-updated',(_e,data) => callback(data)),
    onTabActivated: (callback) =>ipcRenderer.on('tab-activated', (_e,id) => callback(id)),
    onTabClosed: (callback) =>ipcRenderer.on('tab-closed',(_e,id) =>callback(id)),
    onTabUrlUpdated: (callback) =>ipcRenderer.on('tab-url-updated', (_e,data) => callback(data)),


};

export default tabsAPI;