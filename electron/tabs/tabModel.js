
import { BrowserView } from "electron";


export default class Tab{
    constructor(id, url='', title='New Tab',window){
        this.id=id;
        this.url=url;
        this.window=window;
        this.title=title;
        this.query="";
        this.view= this.createBrowserView();
    }

    createBrowserView(){
        const view=new BrowserView({
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                sandbox: true,
            }
        });
        return view;
    }

    toSerializable(){
        const id=this.id;
        const title=this.title;
        const url =this.url;
        const query=this.query;
        return{
            id,
            title,
            url,
            query,
        };
    }
};