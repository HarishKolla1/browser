import { BrowserWindow} from "electron";
import TabManager from '../tabs/tabManager.js';
import { accountWindow } from "../account/accountWindow.js";


class WindowController {
    constructor(userId,profile,id){
        const width = 1200;
        const height = 800;

        this.user=userId;
        this.profile=profile;
        this.id=id;
        this.accountwin=null;

        this.window = new BrowserWindow({
            width: width,
            height: height,
            resizable: true,
            frame: false,
            titleBarStyle: 'hidden',
            webPreferences: {
                contextIsolation: true,
                nodeIntegration:false,
                sandbox: true,
            }
        });

            //restoreWindowState(this.window, this.user);
        this.window.loadURL("http://localhost:5173/");

        this.tabManager = new TabManager(this.window);

        this.tabManager.createTab();

        this.window.on('ready-to-show', () => {
            this.window.show();
        })


        this.window.on("closed",() =>{
            this.tabManager.destoryAllTabs();
            this.window=null;
        });
    }

    openAccountWindow(){
        if(!this.accountwin){
            this.accountwin=new accountWindow(this.window, this.user, this.profile);
        }
        
    }

    hideBrowserView(){
        this.window.setBrowserView(null);
    }


    showBrowserView(){
        const tab=this.tabManager.getActiveTab();
        if(tab && tab.view){
            this.window.setBrowserView(tab.view);
        }
    }
}

export default WindowController;

