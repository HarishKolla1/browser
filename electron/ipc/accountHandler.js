import { ipcMain } from "electron";
import { findUserByEmail , createUser, validateUser} from "../db/auth.js";
import {createProfileForUser, addProfileForUser, getProfileForUser } from "../db/profiles.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename);

export default function registerAccountHandlers(controller){
    // ipcMain.handle('open-account-window', (event) => {
    //     const win=BrowserWindow.fromWebContents(event.sender);
    //     const controller=getWindow(win);
    //     if(controller){
    //         controller.openAccountWindow();
    //     }
    // });

    // ipcMain.handle('get-current-user', () => getCurrentUser());

    // ipcMain.handle('login', async (_e , {email,password}) => {
    //     return isValid(email,password);
    // });

    // ipcMain.handle('signup', async (_e, {email,password}) => {
    //     return signUp(email,password);
    // });

    // ipcMain.handle('logout' ,async () =>{
    //     clearCurrentUser();
    //     return {success: true};
    // });

    // ipcMain.handle('get-profiles' , (_e,userId) => {
    //     return getProfileForUser(userId);
    // }); 

    // ipcMain.handle('add-profile', (_e, {userId,profileName}) => {
    //     return addProfileForUser(userId,profileName);
    // });


    ipcMain.handle('get-current-user', () => controller.AccountWindow.getCurentUser_Email());

    ipcMain.handle('login', async(_default, {email,password}) =>{
        const isValid =validateUser(email,password);
        if(!isValid){
            return {success: false, message: 'Invalid email or password'};
        }
        const user= findUserByEmail(email);
        controller.AccountWindow.setActiveUser(user.user_id,user.email);
        currentUser= controller.AccountWindow.getCurentUser();
        return {success: true, message:'Login successfull' ,user: currentUser};
    });

    ipcMain.handle('signup', async (e_,{email,password}) =>{
        const existingUser=await findUserByEmail(email);
        if(existingUser){
            return {success: false, message: 'Useralready exists'};
        }
        const user= createUser(email,password);
        userProfile=createProfileForUser(user.user_id,'Default');
        controller.AccountWindow.setActiveUser(user.user_id,user.email);
        currentUser=controller.AccountWindow.getCurentUser();

        
        return {success: true, message: 'Signup succesful', user: currentUser};
    });

    ipcMain.handle('logout', async () => {
        controller.AccountWindow.setActiveUser(null,null);
        return {success :true};
    })

    ipcMain.handle('get-profiles', (_e,userId) =>{
        return getProfileForUser(userId);
    })

    ipcMain.handle('add-profile', (_e, {userId, profileName}) => {
        
        return addProfileForUser(userId,profileName);
    })

    ipcMain.handle('open-account-window', ()=> {
        controller.AccountWindow.initWindow();
    });

}
