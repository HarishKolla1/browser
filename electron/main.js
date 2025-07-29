import {app ,BrowserWindow, ipcMain} from 'electron';
import WindowController from './windows/windowController.js';
import { createUser, findUserByEmail, validateUser } from './db/auth.js';
import { addProfileForUser, createProfileForUser, getProfileForUser } from './db/profiles.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let currentUser=null;
function createWindow(){
    const user=currentUser;
    const userId=user?.user_id?? null;
    const profile='';
    const controller = new WindowController(userId,profile); //profiles

    setupWindowIpcHandlers(controller);
    
}

function setupWindowIpcHandlers(controller){
    ipcMain.handle('get-current-user', () => currentUser);

    ipcMain.handle('login', async(_default, {email,password}) =>{
        const isValid =validateUser(email,password);
        if(!isValid){
            return {success: false, message: 'Invalid email or password'};
        }
        const user= findUserByEmail(email);
        currentUser= {user_id: user.user_id,email: user.email};
        return {success: true, message:'Login successfull' ,user: currentUser};
    });

    ipcMain.handle('signup', async (e_,{email,password}) =>{
        const existingUser=await findUserByEmail(email);
        if(existingUser){
            return {success: false, message: 'Useralready exists'};
        }
        const user= createUser(email,password);
        currentUser={user_id: user.user_id, email: user.email};;
        createProfileForUser(user.user_id,'Default');
        
        return {success: true, message: 'Signup succesful', user: currentUser};
    });

    ipcMain.handle('logout', async () => {
        currentUser=null;
        return {success :true};
    })

    ipcMain.handle('get-profiles', (_e,userId) =>{
        return getProfileForUser(userId);
    })

    ipcMain.handle('add-profile', (_e, {userId, profileName}) => {
        return addProfileForUser(userId,profileName);
    })

    ipcMain.handle('open-account-window', ()=> {
        const accountWindow=new BrowserWindow({
            width: 300,
            height: 400,
            parent: controller.window,
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

        accountWindow.webContents.on('did-finish-load', () =>{
            accountWindow.webContents.send('current-user',currentUser);
        });
    });

    ipcMain.handle('get-initial-state',(event) => {
        if(event.sender!== controller.window.webContents) return;
        const tabsArray=controller.tabManager.tabs.map(tab => tab.toSerializable());
        const result={
            tabs: tabsArray,
            activeTabId: controller.tabManager.activeTabId,
        }
        return result;
    });

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

    ipcMain.on('minimize-window', (event) =>{
        if(event.sender!== controller.window.webContents) return;
        controller.window.minimize();
    });

    ipcMain.on('maximize-window', (event) => {
        if(event.sender!== controller.window.webContents) return;
        if(controller.window.isMaximized()){
            controller.window.unMaximize();
        }
        else{
            controller.window.maximize();
        }
    });

    ipcMain.on('close-window',(event) =>{
        if(event.sender!== controller.window.webContents) return;
        controller.window.close();
    })


}
app.whenReady().then(() =>{
    createWindow();

});

app.on('window-all-closed', () =>{
    if(process.platform != 'darwin'){
        app.quit();
    }
});

app.on('activate', ()=> {
    if(BrowserWindow.getAllWindows().length ===0){
        createWindow();
    }
})