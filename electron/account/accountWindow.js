import path from 'path';
import { BrowserWindow } from 'electron';

export class accountWindow{
    constructor(parentWindow, currentUser, currentProfile){
        this.User=currentUser;
        this.profile=currentProfile;
        this.accountWin=new BrowserWindow({
            width: 300,
            height: 400,
            parent: parentWindow,
            modal: true,
            frame: false,
            resizable: false,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                preload: path.join(__dirname, 'preload', 'preload.js'),
            }
        });
        this.accountWin.loadURL('http://localhost:5173/account');

        this.accountWin.webContents.on('did-finish-load', () => {
            this.webContents.send('account-data' ,{
                user: this.User,
                profile: this.profile,
            
            }); 
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
}