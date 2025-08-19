import path from 'path';
import { BrowserWindow } from 'electron';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getProfileForUser } from '../db/profiles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class AccountWindow{
    constructor(parentWindow, currentUser=null, currentProfile=null,currentUser_ID=null){
        this.User_Id=currentUser_ID;
        this.User=currentUser;
        this.activeProfile_Id=null;
        this.activeProfile=null;
        this.parentWindow=parentWindow;
        this.accountWin=null;
        this.selectDefaultProfile();
    }

    initWindow(){
        this.accountWin=new BrowserWindow({
            width: 300,
            height: 400,
            parent: this.parentWindow,
            modal: true,
            frame: false,
            resizable: false,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                preload: path.join(__dirname,  '../preload.cjs'),
            }
        });
        this.accountWin.loadURL('http://localhost:5173/account');

        this.accountWin.once('ready-to-show',()=>this.show);

        // this.accountWin.webContents.on('did-finish-load', () => {
        //     this.webContents.send('account-data' ,{
        //         user: this.User,
        //         profile: this.profile,
            
        //     }); 
        // });
        this.accountWin.webContents.on('did-finish-load', () =>{
            this.accountWin.webContents.send('current-user',this.User);
        });



        this.accountWin.on('closed', () =>{
            this.window=null;
        });
    }
    show() {
        if(this.accountWin) this.accountWin.show();
    }

    close() {
        if(this.accountWin) this.window.close();
    }

    sendCurrentState(){
        if(this.accountWin && this.accountWin.webContents){
            this.accountWin.webContents.send('account-data', {
                user:this.User,
                profile:this.activeProfile
            });
        }
    }

    setActiveUser(User_Id,email) {
        this.User_Id=User_Id;
        this.User=email;
        this.selectDefaultProfile();
    }

    getCurrentUser_Email() {
        return this.User;
    }

    getCurrentUser(){
        return {user_id: this.User_Id, email: this.User};
    }
    getActiveProfile() { return this.activeProfile;}

    setActiveProfile(profile){
        this.activeProfile =profile;
        this.sendCurrentState();
    }

    selectDefaultProfile(){
        if(this.User_Id){
            const profiles=getProfileForUser(this.User_Id);
            if(profiles.length>0){
                this.activeProfile_Id=profiles[0].id;
                this.activeProfile=profiles[0].profile_name;
            }
        }
        else{
            this.activeProfile_Id=null;
            this.activeProfile=null;
        }
    }
}

export default AccountWindow;