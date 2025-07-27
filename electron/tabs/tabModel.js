import { BrowserView } from "electron";


class Tab{
    constructor(id, url='', title='New Tab'){
        this.id=id;
        this.url=url;
        this.title=title;
        this.query="";
        this.view= this.creteBrowserView();
        this.loadURL(url);
    }

    creteBrowserView(){
        const view=new BrowserView({
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                sandbox: true,
            }
        });

        return view;
    }

    loadURL(url){
        if(url && this.view){
            this.view.webContents.loadURL(url);
        }
    }
    setURL(newUrl){
        this.url=newUrl;
    }

    setTitle(newTitle){
        this.title=newTitle;
    }
    setView(browserView){
        this.view=browserView;
    }

    setQuery(newQuery){
        this.query=newQuery;
    }
}

module.exports=Tab;