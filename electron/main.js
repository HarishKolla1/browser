import {app, BrowserWindow, BrowserView} from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { ipcMain } from 'electron';
import {findUserByEmail ,createUser, validateUser} from '../src/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const windows =[];

const UI_HEIGHT = 100;

let currentUser=null;

function createWindow() {
  const width = 1200;
  const height = 800;
  const mainwindow = new BrowserWindow({
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

  createNewTab(state);

  windows.push(state);

  setupWindowIpcHandlers(state);
}

function createNewTab(state, url= '') {
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

  view.webContents.setWindowOpenHandler(({url}) => {
    createNewTab(state,url);
    return  {action: 'deny'};
  })

  view.webContents.on('page-title-updated', (_, title) => {
    tab.title=title;
    state.mainwindow.webContents.send('tab-updated', {
      id,
      title,
    });
    
    });

    view.webContents.on('did-navigate', (_, url) => {
  
      tab.url = url;
      state.mainwindow.webContents.send('tab-url-updated', {
        id,
        url,
      });
    });


    state.mainwindow.webContents.send('tab-created', {
      id,
      title: 'New Tab',
      url: '',
    });

    setActiveTab(state,id);

    if(url){
      view.webContents.loadURL(url);
      tab.url=url;
    }
  }

function setActiveTab(state,id) {
  const tab = state.tabs.find(t => t.id === id);
  if(!tab) {
    return;
  }

  state.activeTabId = id;

  const bounds= state.mainwindow.getBounds();

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
  if(tab?.view){
    state.mainwindow.removeBrowserView(tab.view);
    if(typeof tab.view.destroy === 'function'){
      tab.view.destroy();
    }
  }

  state.mainwindow.webContents.send('tab-closed', id);

  if(state.tabs.length===0){
    state.mainwindow.close();
    return;
  }

  if(state.activeTabId === id) {
    setActiveTab(state,state.tabs[state.tabs.length - 1].id);
  }
}

function setupWindowIpcHandlers(state){

  ipcMain.handle('get-current-user', () => currentUser);

  ipcMain.handle('login', async (_e, {email, password}) =>{
    const isValid= await validateUser(email,password);
    if(!isValid){
      return {success: false, message: 'Invalid email or password'};
    }
    currentUser={email};
    return {success: true, message:'Login successfull' ,user: currentUser};
  });

  ipcMain.handle('signup', async (_e,{email,password}) =>{
    const existingUser= await findUserByEmail(email);
    
    if(existingUser){
      return {success: false, message: 'Useralready exists'};
    }
    createUser(email,password);
    currentUser={email};
    return {success: true, message: 'Signup succesful', user: currentUser};
  });

  ipcMain.handle('logout', async () =>{
    currentUser=null;
    return {success: true};
  });


  ipcMain.handle('open-account-window', () =>{
    const accountWindow=new BrowserWindow({
      width: 300,
      height: 400,
      parent: state.mainwindow,
      modal: true,
      frame: false,
      resizable: false,
      webPreferences: {
        nodeIntegration:false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.cjs'),
      },

    });
    accountWindow.loadURL('http://localhost:5173/account');

    accountWindow.webContents.on('did-finish-load',() => {
      accountWindow.webContents.send('current-user',currentUser);
    });
  });


  ipcMain.handle('get-initial-state', (event) =>{
    if(event.sender!== state.mainwindow.webContents) return;
    return {
      tabs: state.tabs.map(t => ({ id : t.id , title: t.title, url: t.url, query: t.query})),
      activeTabId: state.activeTabId,
    }
  });

  ipcMain.on('tab-new', (event) => {
    if(event.sender !==state.mainwindow.webContents) return;
    createNewTab(state);
  });

  ipcMain.on('tab-switch', (event, id) => {
    if(event.sender!==state.mainwindow.webContents) return;
    setActiveTab(state,id);
  });

  ipcMain.on('tab-close', (event, id) => {
    if(event.sender!==state.mainwindow.webContents) return;
    closeTab(state,id);
  });


  ipcMain.on('hide-browser-view', (event) =>{
    if(event.sender !== state.mainwindow.webContents) return;
    state.mainwindow.setBrowserView(null);
  });

  ipcMain.on('show-browser-view', (event) => {
    if(event.sender!== state.mainwindow.webContents) return;

    const tab = state.tabs.find(t => t.id === state.activeTabId);
    if(tab) {
      const bounds = state.mainwindow.getBounds();
      tab.view.setBounds({x: 0, y: UI_HEIGHT, width: bounds.width, height: bounds.height - UI_HEIGHT});
      tab.view.setAutoResize({width: true, height: true});
      state.mainwindow.setBrowserView(tab.view);
    }
  });

  ipcMain.on('search-query', (event, query) => {
    if(event.sender!==  state.mainwindow.webContents) return;
    const tab= state.tabs.find(t => t.id === state.activeTabId);
    if(tab) {
      tab.query=query;
      const searchUrl=`https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
      tab.url=searchUrl;
      tab.view.webContents.loadURL(searchUrl);
    }

  });

  ipcMain.on('nav-back', (event) => {
    if(event.sender!== state.mainwindow.webContents) return;
    const tab = state.tabs.find(t => t.id === state.activeTabId);
    if(tab?.view.webContents.canGoBack()) {
      tab.view.webContents.goBack();
    }
  });

  ipcMain.on('nav-forward', (event) => {
    if(event.sender!==  state.mainwindow.webContents) return;
    const tab = state.tabs.find(t => t.id === state.activeTabId);
    if(tab?.view.webContents.canGoForward()) {
      tab.view.webContents.goForward();
    }
  });

  ipcMain.on('nav-reload', (event) => {
    if(event.sender!== state.mainwindow.webContents) return;
    const tab = state.tabs.find(t => t.id === state.activeTabId);
    if(tab) tab.view.webContents.reload();
  });

  ipcMain.on('minimize-window', (event) =>{
    if(event.sender!== state.mainwindow.webContents) return;
    state.mainwindow.minimize();
  });

  ipcMain.on('maximize-window', (event) =>{
    if(event.sender!== state.mainwindow.webContents) return;
    if(state.mainwindow.isMaximized()){
      state.mainwindow.unmaximize();
    }
    else{
      state.mainwindow.maximize();
    }
  })

  ipcMain.on('close-window', (event) => {
    if(event.sender!== state.mainwindow.webContents) return;
    state.mainwindow.close();
  
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