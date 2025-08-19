import {ipcMain ,BrowserWindow} from 'electron';


export default function registerWindowHandlers(controller){
    // ipcMain.on('minimize-window', (event) => {
    //     const win = BrowserWindow.fromWebContents(event.sender);
    //     win?.minimize();

    // });

    // ipcMain.on('maximize-window', (event) => {
    //     const win=BrowserWindow.fromWebContents(event.sender);
    //     if(!win) return;

    //     if(win.isMaximized()){
    //         win.unmaximize();
    //     }
    //     else{
    //         win.maximize();
    //     }
    // });

    // ipcMain.on('close-window', (event) =>{
    //     const win =BrowserWindow.fromWebContents(event.sender);
    //     win?.close();
    // });

    // ipcMain.on('hide-browser-view' , (event) =>{
    //     const win= BrowserWindow.fromWebContents(event.sender);
    //     const controller= getWindow(win);
    //     if(controller){
    //         controller.hideBrowserView();
    //     }
    // });

    // ipcMain.on('show-browser-view', (event) =>{
    //     const win=BrowserWindow.fromWebContents(event.sender);
    //     const controller=getWindow(win);
    //     if(controller){
    //         controller.showBrowserView();
    //     }
    // });

    // ipcMain.on('new-window', () =>{
    //     const userId= getCurrentUser();
    //     createWindow(userId);
    //     if (!controller) {
    //         console.warn('No controller for tab-new event');
    //         return;
    //     }
    // });

    // ipcMain.handle('get-initial-state', (event) =>{
    //     const win = BrowserWindow.fromWebContents(event.sender);
    //     const controller=getWindow(win);
        
    //     return { 
    //         tabs: Array.from(controller.tabManager.tabs.entries()).map(([id,tab]) => ({
    //             id,
    //             title,
    //         })),
    //         activeTabId: controller.tabManager.activeTabId,
    //     }
    // })

    ipcMain.handle('get-initial-state',(event) => {
        if(event.sender!== controller.window.webContents) return;
        const tabsArray=controller.tabManager.tabs.map(tab => tab.toSerializable());
        const result={
            tabs: tabsArray,
            activeTabId: controller.tabManager.activeTabId,
        }
        return result;
    });

    ipcMain.on('minimize-window', (event) =>{
        if(event.sender!== controller.window.webContents) return;
        controller.window.minimize();
    });

    ipcMain.on('maximize-window', (event) => {
        if(event.sender!== controller.window.webContents) return;
        if(controller.window.isMaximized()){
            controller.window.unmaximize();
        }
        else{
            controller.window.maximize();
        }
    });

    ipcMain.on('close-window',(event) =>{
        if(event.sender!== controller.window.webContents) return;
        controller.window.close();
    })

    ipcMain.on('hide-browser-view', (event) => {
        if(event.sender!==controller.window.webContents) return;
        controller.window.setBrowserView(null);
    });

    ipcMain.on('show-browser-view', (event) =>{
        if(event.sender!== controller.window.webContents) return;

        const tab=controller.tabManager.tabs.find(t=> t.id ===controller.tabManager.activeTabId);
        if(tab){
            const bounds=controller.window.getBounds();
                tab.view.setBounds({
                x:0,
                y:100,
                width:bounds.width,
                height:bounds.height-100,
            });
            tab.view.setAutoResize({width: true, height: true});
            controller.window.setBrowserView(tab.view);
        }
    });

}