import {app, BrowserWindow, BrowserView} from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { ipcMain } from 'electron';
import { title } from 'process';
import { act } from 'react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainwindow;
let tabs = [];
let activeTabId = null;
let nextTabId = 1;

const UI_HEIGHT = 100;

function createWindow() {
  const width = 1200;
  const height = 800;
  mainwindow = new BrowserWindow({
    width,
    height,
    resizable: true,
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      preload: path.join(__dirname, 'preload.cjs'),
    },
  });

  mainwindow.loadURL('http://localhost:5173/');

  createNewTab();
}

function createNewTab(isHome = false) {
  const id=nextTabId++;
  let view=null;

  if(!isHome){
    view = new BrowserView({
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: true,
    },
    });
  }




  tabs.push({
    id,
    view,
    title: isHome ? 'Home' : 'New Tab',
    isHome,
  });

  setActiveTab(id);

  mainwindow.webContents.send('tab-created', {
    id,
    title: isHome ? 'Home' : 'New Tab',
    isHome,
  });

  if(view){
    view.webContents.on('page-title-updated', (_, title) => {
      const tab = tabs.find(t => t.id === id);
      if (tab) {
        tab.title = title;
        mainwindow.webContents.send('tab-updated', {
          id,
          title,
        });
      }
    });
  }
}

function setActiveTab(id) {
  const tab = tabs.find(t => t.id === id);
  if(!tab) {
    return;
  }

  activeTabId = id;

  if(tab.isHome || !tab.view) {
    mainwindow.setBrowserView(null);
  }else{
    const bounds = mainwindow.getBounds();
    tab.view.setBounds({
      x: 0,
      y: UI_HEIGHT,
      width: bounds.width,
      height: bounds.height - UI_HEIGHT,
    });
    tab.view.setAutoResize({width: true, height: true});
    mainwindow.setBrowserView(tab.view);
  }

  mainwindow.webContents.send('tab-activated', id);
}

function closeTab(id) {
  const tabIndex = tabs.findIndex(t => t.id === id);
  if(tabIndex === -1) {
    return;
  }

  const [tab] = tabs.splice(tabIndex, 1);
  if(tab.view && typeof tab.view.destroy === 'function') {
    tab.view.destroy();
  }
  mainwindow.webContents.send('tab-closed', id);

  if(activeTabId === id) {
    if(tabs.length >0){
      setActiveTab(tabs[tabs.length - 1].id);
    }
    else {
      activeTabId = null;
      mainwindow.setBrowserView(null);
    }
  }
}

ipcMain.on('tab-new', () => {
  createNewTab();
});

ipcMain.on('tab-switch', (_, id) => {
  setActiveTab(id);
});

ipcMain.on('tab-close', (_, id) => {
  closeTab(id);
});


ipcMain.on('hide-browser-view', () =>{
  if(mainwindow && mainwindow.getBrowserView()) {
    mainwindow.setBrowserView(null);
  }
});

ipcMain.on('show-browser-view', () => {
  const tab = tabs.find(t => t.id === activeTabId);
  if(tab) {
    const bounds = mainwindow.getBounds();
    tab.view.setBounds({x: 0, y: UI_HEIGHT, width: bounds.width, height: bounds.height - UI_HEIGHT});
    tab.view.setAutoResize({width: true, height: true});
    mainwindow.setBrowserView(tab.view);
  }
});

ipcMain.on('search-query', (_, query) => {
  const tab= tabs.find(t => t.id === activeTabId);
  if(!tab) {
    return;
  }

  if(tab.isHome) {
    createNewTab(false);
    const newTab = tabs[tabs.length - 1];
    newTab.view.webContents.loadURL(`https://duckduckgo.com/?q=${encodeURIComponent(query)}`);
    setActiveTab(newTab.id);
  }
  else if(tab.view) {
    tab.view.webContents.loadURL(`https://duckduckgo.com/?q=${encodeURIComponent(query)}`);
  }
});

ipcMain.on('nav-back', () => {
  const tab = tabs.find(t => t.id === activeTabId);
  if(tab?.view.webContents.canGoBack()) {
    tab.view.webContents.goBack();
  }
});

ipcMain.on('nav-forward', () => {
  const tab = tabs.find(t => t.id === activeTabId);
  if(tab?.view.webContents.canGoForward()) {
    tab.view.webContents.goForward();
  }
});

ipcMain.on('nav-reload', () => {
  const tab = tabs.find(t => t.id === activeTabId);
  if(tab) tab.view.webContents.reload();
});

ipcMain.on('minimize-window', () =>{
  if(mainwindow){
    mainwindow.minimize();
  }
});

ipcMain.on('maximize-window', () =>{
  if(mainwindow){
    if(mainwindow.isMaximized()){
      mainwindow.unmaximize();
    }
    else{
      mainwindow.maximize();
    }
  }
})

ipcMain.on('close-window', () => {
  if(mainwindow){
    mainwindow.close();
  }
});

app.whenReady().then(() => {
  // session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
  //   callback(false); // Deny all permission requests
  // });

  createWindow();
});
// app.on('before-quit', () => {
//   if (view && !view.webContents.isDestroyed()) {
//     view.webContents.close();
//   }
//   if (win && !win.isDestroyed()) {
//     win.close();
//   }   
// });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});