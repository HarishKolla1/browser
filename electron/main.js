import {app, BrowserWindow, BrowserView} from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { ipcMain } from 'electron';
import { title } from 'process';
import { act } from 'react';
import { url } from 'inspector';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const windows =[];

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

  const state ={
    mainwindow,
    tabs:[],
    activeTabId: null,
    nextTabId: 1
  };

  const firstTabId =state.nextTabId++;
  const firstTab={
    id:firstTabId,
    view: null,
    title: 'New Tab',
    url: '',
    query: ''
  };

  state.tabs.push(firstTab);
  state.activeTabId=firstTabId;

  windows.push(state);

  setupWindowIpcHandlers(state);
}

function createNewTab(state) {
  const id=state.nextTabId++;
  const view = new BrowserView({
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: true,
    },
  });

  const tab= {
    id,
    view,
    title: 'New Tab',
    query:'',
    url:'',
  };



  state.tabs.push(tab);

  view.webContents.on('page-title-updated', (_, title) => {
    const t = state.tabs.find(tab => tab.id === id);
    if (t) {
      t.title = title;
      state.mainwindow.webContents.send('tab-updated', {
        id,
        title,
      });
    }
    });

    view.webContents.on('did-navigate', (_, url) => {
      const t = state.tabs.find(tab => tab.id === id);
      if (t) {
        t.url = url;
        state.mainwindow.webContents.send('tab-url-updated', {
          id,
          url,
        });
      }
    });


    state.mainwindow.webContents.send('tab-created', {
      id,
      title: 'New Tab',
      url: '',
    });

    return id;
  }

function setActiveTab(state,id) {
  const tab = state.tabs.find(t => t.id === id);
  if(!tab) {
    return;
  }

  activeTabId = id;

  const bounds= mainwindow.getBounds();

  tab.view.setBounds({
    x: 0,
    y: UI_HEIGHT,
    width: bounds.width,
    height: bounds.height - UI_HEIGHT,
  });
  tab.view.setAutoResize({width: true, height: true});
  state.mainwindow.setBrowserView(tab.view);

  state.mainwindow.webContents.send('tab-activated', id);
}

function closeTab(state,id) {
  const tabIndex = state.tabs.findIndex(t => t.id === id);
  if(tabIndex === -1) {
    return;
  }

  const [tab] = state.tabs.splice(tabIndex, 1);
  if(tab.view && typeof tab.view.destroy === 'function') {
    tab.view.destroy();
  }
  state.mainwindow.webContents.send('tab-closed', id);

  if(state.activeTabId === id) {
    if(state.tabs.length >0){
      setActiveTab(state,state.tabs[state.tabs.length - 1].id);
    }
    else {
      state.activeTabId = null;
      state.mainwindow.setBrowserView(null);
    }
  }
}

function setupWindowIpcHandlers(state){

  const window =state.mainwindow;

  ipcMain.on('tab-new', (event) => {
    if(event.sender !=mainwindow.webContents) return;
    const id=createNewTab(state);
    setActiveTab(state,id);
  });

  ipcMain.on('tab-switch', (event, id) => {
    if(event.sender!==mainwindow.webContents) return;
    setActiveTab(state,id);
  });

  ipcMain.on('tab-close', (event, id) => {
    if(event.sender!==mainwindow.webContents) return;
    closeTab(state,id);
  });


  ipcMain.on('hide-browser-view', (event) =>{
    if(event.sender !== mainwindow.webContents) return;
    mainwindow.setBrowserView(null);
  });

  ipcMain.on('show-browser-view', (event) => {
    if(event.sender!== mainwindow.webContents) return;

    const tab = state.tabs.find(t => t.id === activeTabId);
    if(tab) {
      const bounds = mainwindow.getBounds();
      tab.view.setBounds({x: 0, y: UI_HEIGHT, width: bounds.width, height: bounds.height - UI_HEIGHT});
      tab.view.setAutoResize({width: true, height: true});
      mainwindow.setBrowserView(tab.view);
    }
  });

  ipcMain.on('search-query', (event, query) => {
    if(event.sender!==  mainwindow.webContents) return;
    let tab= state.tabs.find(t => t.id === activeTabId);
    if(!tab) {
      const id= createNewTab(state);
      setActiveTab(state,id);
      tab=state.tabs.find(t => t.id === id);
    }

    tab.query= query;
    const searchUrl=`https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
    tab.url=searchUrl;
    tab.view.webContents.loadURL(searchUrl);
  });

  ipcMain.on('nav-back', (event) => {
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

}


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