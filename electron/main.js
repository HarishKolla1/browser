import {app, session, BrowserWindow, WebContentsView} from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let win;
let view;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  if(app.isPackaged) {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  } else {
    win.loadURL('http://localhost:5173');
  }

  view = new WebContentsView({
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  view.webContents.loadURL('http://www.bing.com');

  win.setContentView(view);

  view.setBounds({
    x: 0,
    y: 100,
    width: 1200,
    height: 700,
  });

  view.setAutoResize({
    width: true,
    height: true,
  });


}

app.whenReady().then(() => {
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    callback(false); // Deny all permission requests
  });

  createWindow();
});
app.on('before-quit', () => {
  if (view && !view.webContents.isDestroyed()) {
    view.webContents.close();
  }
  if (win && !win.isDestroyed()) {
    win.close();
  }   
});

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