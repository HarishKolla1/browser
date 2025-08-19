import { BrowserWindow} from "electron";
import TabManager from '../tabs/tabManager.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import AccountWindow from '../account/accountWindow.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


class WindowController {
    constructor(userId,profile){
        const width = 1200;
        const height = 800;

        this.window = new BrowserWindow({
            width,
            height,
            resizable: true,
            frame: false,
            titleBarStyle: 'hidden',
            webPreferences: {
                contextIsolation: true,
                nodeIntegration:false,
                sandbox: true,
                preload: path.join(__dirname, '../preload.cjs')
            }
        });
        this.window.webContents.openDevTools({ mode: 'detach' });

            //restoreWindowState(this.window, this.user);
        this.window.loadURL("http://localhost:5173/");

        this.tabManager = new TabManager(this.window);
        this.AccountWindow=new AccountWindow(this.window);

        this.tabManager.createTab();

        this.window.on('ready-to-show', () => {
            this.window.show();
        })


        this.window.on("closed",() =>{
            this.tabManager.destroyAllTabs();
            this.window=null;
        });
    }
}

export default WindowController;

