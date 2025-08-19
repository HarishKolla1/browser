import {app ,BrowserWindow, ipcMain} from 'electron';
import WindowController from './windows/windowController.js';
import registerWindowHandlers from './ipc/windowHandlers.js';
import registerAccountHandlers from './ipc/accountHandler.js';
import registerTabHandlers from './ipc/tabHandler.js';
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

    registerWindowHandlers(controller);
    registerTabHandlers(controller);
    registerAccountHandlers(controller);
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