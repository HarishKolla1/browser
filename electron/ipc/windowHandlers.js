import {ipcMain ,BrowserWindow} from 'electron';
import { createWindow, getWindow } from '../windows/windowFactory';
import { getCurrentUser } from '../main/userSession';


export default function registerWindowHandlers(){
    ipcMain.on('minimize-window', (event) => {
        const win = BrowserWindow.fromWebContents(event.sender);
        win?.minimize();

    });

    ipcMain.on('maximize-window', (event) => {
        const win=BrowserWindow.fromWebContents(event.sender);
        if(!win) return;

        if(win.isMaximized()){
            win.unmaximize();
        }
        else{
            win.maximize();
        }
    });

    ipcMain.on('close-window', (event) =>{
        const win =BrowserWindow.fromWebContents(event.sender);
        win?.close();
    });

    ipcMain.on('hide-browser-view' , (event) =>{
        const win= BrowserWindow.fromWebContents(event.sender);
        const controller= getWindow(win);
        if(controller){
            controller.hideBrowserView();
        }
    })

    ipcMain.on('show-browser-view', (event) =>{
        const win=BrowserWindow.fromWebContents(event.sender);
        const controller=getWindow(win);
        if(controller){
            controller.showBrowserView();
        }
    })

    ipcMain.on('new-window', () =>{
        const userId= getCurrentUser();
        createWindow(userId);
    })
}