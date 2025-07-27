import { BrowserWindow} from "electron";
import TabManager from '../tabs/tabManager.js';

class WindowController {
    constructor(userId,id){
        const width = 1200;
        const height = 800;

        this.user=userId;
        this.id=id;

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
}

export default WindowController;

