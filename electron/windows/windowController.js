import { BrowserWindow , BrowserView} from "electron";
import { path } from "path";

class windowController {
    constructor(){
        const lastUser=getUserSession();
        const width = 1200;
        const height = 800;
        this.user=lastUser;
        this.tabs= new Map();
        this.nextTabId=1;
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

            this.window.loadURL('http://localhost:5173/');

            this.createNewTab();
            this.window.on('closed',()=>{
                this.tabs.clear();
                this.window=null;
            });
        



    }
}