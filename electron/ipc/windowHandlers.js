import {ipcMain ,BrowserWindow} from 'electron';
import { createWindow, getWindow } from '../windows/windowFactory.js';
import { getCurrentUser } from '../main/userSession.js';


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
    });

    ipcMain.on('show-browser-view', (event) =>{
        const win=BrowserWindow.fromWebContents(event.sender);
        const controller=getWindow(win);
        if(controller){
            controller.showBrowserView();
        }
    });

    ipcMain.on('new-window', () =>{
        const userId= getCurrentUser();
        createWindow(userId);
        if (!controller) {
            console.warn('No controller for tab-new event');
            return;
        }
    });

    ipcMain.handle('get-initial-state', (event) =>{
        const win = BrowserWindow.fromWebContents(event.sender);
        const controller=getWindow(win);
        
        return { 
            tabs: Array.from(controller.tabManager.tabs.entries()).map(([id,tab]) => ({
                id,
                title,
            })),
            activeTabId: controller.tabManager.activeTabId,
        }
    })
}