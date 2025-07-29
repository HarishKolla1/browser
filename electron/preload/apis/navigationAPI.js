import { ipcRenderer } from "electron";

const navigationAPI ={
    goback: () => ipcRenderer.send('nav-back'),
    goForward:() => ipcRenderer.send('nav-forward'),
    reloadPage: () =>ipcRenderer.send('nav-reload'),

    minimize: () => ipcRenderer.send('minimize-window'),
    maximize: () => ipcRenderer.send('maximize-window'),
    close: () =>ipcRenderer.send('close-window'),

    hideBrowserView: () => ipcRenderer.send('hide-browser-view'),
    showBrowserView: () => ipcRenderer.send('show-browser-view'),

    getInitialState: () => ipcRenderer.invoke('get-initial-state'),
};

export default navigationAPI;