import { ipcMain,BrowserWindow } from "electron";
import { getWindow } from "../windows/windowFactory.js";


export default function registerTabHandlers(){
    ipcMain.on('nav-back', (event) =>{
        const win=BrowserWindow.fromWebContents(event.sender);
        const controller=getWindow(win);
        if(controller){
            const tab= controller.tabManager.getActiveTab();
            if(tab && tab.view.webContents.canGoBack()){
                tab.view.webContents.goBack();
            }
        }
    });

    ipcMain.on('nav-forward', (event) =>{
        const win=BrowserWindow.fromWebContents(event.sender);
        const controller=getWindow(win);
        if(controller){
            const tab= controller.tabManager.getActiveTab();
            if(tab && tab.view.webContents.canGoForward()){
                tab.view.webContents.goForward();
            }
        }
        if (!controller) {
            console.warn('No controller for tab-new event');
            return;
        }
    });

    ipcMain.on('reload', (event) => {
        const win=BrowserWindow.fromWebContents(event.sender);
        const controller=getWindow(win);
        if(controller){
            const tab= controller.tabManager.getActiveTab();
            if(tab){
                tab.view.webContents.reload();
            }
        }
    });

    ipcMain.on('search-query', (event,query) => {
        const win=BrowserWindow.fromWebContents(event.sender);
        const controller=getWindow(win);
        if(controller){
            controller.tabManager.loadTabUrl(query);

        }
    });

    ipcMain.on('tab-new', (event)=> {
        const win=BrowserWindow.fromWebContents(event.sender);
        const controller=getWindow(win);
        if(controller){
            const id=controller.tabManager.createTab();
        }

    });

    ipcMain.on('tab-switch', (event,id) => {
        const win=BrowserWindow.fromWebContents(event.sender);
        const controller=getWindow(win);
        if(controller){
            controller.tabManager.setActiveTab(id);
        }
    });

    ipcMain.on('close-tab', (event,id) => {
        const win=BrowserWindow.fromWebContents(event.sender);
        const controller=getWindow(win);
        if(controller){
            controller.tabManager.closeTab(id);
        }
    })

    
}