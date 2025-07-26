import { BrowserWindow} from "electron";
import { path } from "path";
import TabManager from '../tabs/tabManager.js';

class windowController {
    constructor(){
        const lastUser=getUserSession();
        const width = 1200;
        const height = 800;

        this.user=lastUser;
        
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

        this.tabManager.createTab()
    }
}



    }
}