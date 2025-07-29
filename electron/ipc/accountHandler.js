import { BrowserWindow, ipcMain } from "electron";
import { getWindow } from "../windows/windowFactory.js";
import { clearCurrentUser, getCurrentUser } from "../main/userSession.js";
import { addProfileForUser, getProfileForUser } from "../db/profiles.js";


export default function registerAccountHandlers(){
    ipcMain.handle('open-account-window', (event) => {
        const win=BrowserWindow.fromWebContents(event.sender);
        const controller=getWindow(win);
        if(controller){
            controller.openAccountWindow();
        }
    });

    ipcMain.handle('get-current-user', () => getCurrentUser());

    ipcMain.handle('login', async (_e , {email,password}) => {
        return isValid(email,password);
    });

    ipcMain.handle('signup', async (_e, {email,password}) => {
        return signUp(email,password);
    });

    ipcMain.handle('logout' ,async () =>{
        clearCurrentUser();
        return {success: true};
    });

    ipcMain.handle('get-profiles' , (_e,userId) => {
        return getProfileForUser(userId);
    }); 

    ipcMain.handle('add-profile', (_e, {userId,profileName}) => {
        return addProfileForUser(userId,profileName);
    });

}
