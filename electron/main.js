import {app, BrowserWindow, BrowserView} from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { ipcMain } from 'electron';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainwindow;
let googleview;

function createWindow() {
  const width = 1200;
  const height = 800;
  const uiHeight = 100;

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

  googleview = new BrowserView({
    webPreferences:{
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  mainwindow.setBrowserView(googleview);


  googleview.setBounds({x: 0, y: uiHeight, width: width, height: height - uiHeight});

  googleview.setAutoResize({width: true, height: true});

  // googleview.webContents.loadURL('https://www.google.com/search?q=is+google+programmable+search+engine+limited+per+day&sca_esv=06aa7bafa5db9320&rlz=1C1VDKB_enIN1051IN1051&sxsrf=AE3TifNeWP6R4qEqzrpXkkZ3NBtXsMHrvQ%3A1751978079918&ei=XxBtaKPrN6f6seMPsMruwQU&oq=is+google+programmable+search+engine+limited+per+d&gs_lp=Egxnd3Mtd2l6LXNlcnAiMmlzIGdvb2dsZSBwcm9ncmFtbWFibGUgc2VhcmNoIGVuZ2luZSBsaW1pdGVkIHBlciBkKgIIADIHECEYoAEYCjIHECEYoAEYCjIHECEYoAEYCjIFECEYnwVI1DlQugdYjitwAXgBkAEAmAHaAqABjByqAQYyLTEzLjG4AQPIAQD4AQGYAg-gAuAcwgIKEAAYsAMY1gQYR8ICChAjGIAEGCcYigXCAgYQABgWGB7CAgUQIRigAcICBBAhGBWYAwCIBgGQBgiSBwgxLjAuMTIuMqAHoUeyBwYyLTEyLjK4B9UcwgcIMC40LjEwLjHIBzk&sclient=gws-wiz-serp');


}

ipcMain.on('hide-browser-view', () =>{
  if(mainwindow && googleview){
    mainwindow.setBrowserView(null);
  }
});

ipcMain.on('show-browser-view', () => {
  if(mainwindow && googleview){
    const bounds=mainwindow.getBounds();
    const uiHeight=100;
    googleview.setBounds({x:0, y: uiHeight, width: bounds.width,height: bounds.height-uiHeight});
    mainwindow.setBrowserView(googleview);
    googleview.setAutoResize({width: true, height: true});
  }
});

ipcMain.on('search-query', (event, query) => {
  const searchURL= `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
  googleview.webContents.loadURL(searchURL);
});

ipcMain.on('nav-back', () => {
  if (googleview && googleview.webContents.canGoBack()) {
    googleview.webContents.goBack();
  }
});

ipcMain.on('nav-forward', () => {
  if (googleview && googleview.webContents.canGoForward()) {
    googleview.webContents.goForward();
  }
});

ipcMain.on('nav-reload', () => {
  if (googleview) {
    googleview.webContents.reload();
  }
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