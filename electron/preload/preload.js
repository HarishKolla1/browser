import { contextBridge } from "electron";

import tabsAPI from './apis/tabsAPI.js';
import navigationAPI from './apis/navigationAPI.js';
import searchAPI from './apis/searchAPI.js';
import userAPI from './apis/userAPI.js';

contextBridge.exposeInMainWorld('electronAPI',{
    ...tabsAPI,
    ...navigationAPI,
    ...searchAPI,
    ...userAPI,
});



















// const { contextBridge, ipcRenderer } = require('electron');

// console.log("Preload script loaded");

// contextBridge.exposeInMainWorld('electronAPI', {
//     sendSearch: (query) => ipcRenderer.send('search-query', query),
//     hideBrowserView: () => ipcRenderer.send('hide-browser-view'),
//     showBrowserView: () => ipcRenderer.send('show-browser-view'),
//     goBack: () => ipcRenderer.send('nav-back'),
//     goForward: () => ipcRenderer.send('nav-forward'),
//     reloadPage: () => ipcRenderer.send('nav-reload'),
//     minimize: () => ipcRenderer.send('minimize-window'),
//     maximize: () => ipcRenderer.send('maximize-window'),
//     close: () => ipcRenderer.send('close-window'),
//     newTab: () => ipcRenderer.send('tab-new'),
//     switchTab: (id) => ipcRenderer.send('tab-switch', id),
//     closeTab: (id) => ipcRenderer.send('tab-close', id),

//     onTabCreated: (callback) => ipcRenderer.on('tab-created', (_e,tab) => callback(tab)),
//     onTabUpdated: (callback) => ipcRenderer.on('tab-updated', (_e, data) => callback(data)),
//     onTabActivated: (callback) => ipcRenderer.on('tab-activated', (_e, id) => callback(id)),
//     onTabClosed: (callback) => ipcRenderer.on('tab-closed', (_e, id) => callback(id)),
//     onTabUrlUpdated: (callback) =>ipcRenderer.on('tab-url-updated', (_e, data) => callback(data)),

//     getInitialState: () => ipcRenderer.invoke('get-initial-state'),

//     openAccountWindow: () => ipcRenderer.invoke('open-account-window'),
//     getCurrentUser: () => ipcRenderer.invoke('get-current-user'),

//     login: (email,password) => ipcRenderer.invoke('login',{email,password}),
//     signup: (email, password) => ipcRenderer.invoke('signup', {email, password}),
//     logout: () =>ipcRenderer.invoke('logout'),

//     onCurrentUser: (callback) => ipcRenderer.on('current-user',(_e,user) => callback(user)),

//     getProfiles: (userId) => ipcRenderer.invoke('get-profiles', userId),
//     addProfile: (userId, profileName) =>ipcRenderer.invoke('add-profile', {userId,profileName}),
    

//     removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
// });