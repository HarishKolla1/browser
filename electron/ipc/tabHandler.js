import { ipcMain,BrowserWindow } from "electron";


export default function registerTabHandlers(controller){
    // ipcMain.on('nav-back', (event) =>{
    //     const win=BrowserWindow.fromWebContents(event.sender);
    //     const controller=getWindow(win);
    //     if(controller){
    //         const tab= controller.tabManager.getActiveTab();
    //         if(tab && tab.view.webContents.canGoBack()){
    //             tab.view.webContents.goBack();
    //         }
    //     }
    // });

    // ipcMain.on('nav-forward', (event) =>{
    //     const win=BrowserWindow.fromWebContents(event.sender);
    //     const controller=getWindow(win);
    //     if(controller){
    //         const tab= controller.tabManager.getActiveTab();
    //         if(tab && tab.view.webContents.canGoForward()){
    //             tab.view.webContents.goForward();
    //         }
    //     }
    //     if (!controller) {
    //         console.warn('No controller for tab-new event');
    //         return;
    //     }
    // });

    // ipcMain.on('reload', (event) => {
    //     const win=BrowserWindow.fromWebContents(event.sender);
    //     const controller=getWindow(win);
    //     if(controller){
    //         const tab= controller.tabManager.getActiveTab();
    //         if(tab){
    //             tab.view.webContents.reload();
    //         }
    //     }
    // });

    // ipcMain.on('search-query', (event,query) => {
    //     const win=BrowserWindow.fromWebContents(event.sender);
    //     const controller=getWindow(win);
    //     if(controller){
    //         controller.tabManager.loadTabUrl(query);

    //     }
    // });

    // ipcMain.on('tab-new', (event)=> {
    //     const win=BrowserWindow.fromWebContents(event.sender);
    //     const controller=getWindow(win);
    //     if(controller){
    //         const id=controller.tabManager.createTab();
    //     }

    // });

    // ipcMain.on('tab-switch', (event,id) => {
    //     const win=BrowserWindow.fromWebContents(event.sender);
    //     const controller=getWindow(win);
    //     if(controller){
    //         controller.tabManager.setActiveTab(id);
    //     }
    // });

    // ipcMain.on('close-tab', (event,id) => {
    //     const win=BrowserWindow.fromWebContents(event.sender);
    //     const controller=getWindow(win);
    //     if(controller){
    //         controller.tabManager.closeTab(id);
    //     }
    // })

    
    ipcMain.on('tab-new', (event) =>{
        if(event.sender!== controller.window.webContents) return;
        controller.tabManager.createTab();
    });

    ipcMain.on('tab-switch', (event, id) => {
        if(event.sender!==controller.window.webContents) return;
        controller.tabManager.setActiveTab(id);
    });

    ipcMain.on('tab-close', (event,id) => {
        if(event.sender!== controller.window.webContents) return;
        controller.tabManager.closeTab(id);
    });



    ipcMain.on('search-query',(event,query) => {
        if(event.sender!== controller.window.webContents) return;
        const tab= controller.tabManager.tabs.find(t=> t.id ===controller.tabManager.activeTabId);
        if(tab){
            tab.query=query;
            const searchUrl=`https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
            tab.url=searchUrl;
            tab.view.webContents.loadURL(searchUrl);
        }
    });

    ipcMain.on('nav-back', (event) => {
        if(event.sender!== controller.window.webContents) return;
        const tab=controller.tabManager.tabs.find(t=> t.id ===controller.tabManager.activeTabId);

        if(tab?.view.webContents.canGoBack()){
            tab.view.webContents.goBack();
        }
    });

    ipcMain.on('nav-forward', (event) => {
        if(event.sender!== controller.window.webContents) return;
        const tab=controller.tabManager.tabs.find(t=> t.id ===controller.tabManager.activeTabId);
        if(tab?.view.webContents.canGoForward()){
            tab.view.webContents.goForward();
        }
    });

    ipcMain.on('nav-reload', (event) => {
        if(event.sender!== controller.window.webContents) return;
        const tab=controller.tabManager.tabs.find(t=> t.id ===controller.tabManager.activeTabId);
        if(tab) tab.view.webContents.reload();
    });

}