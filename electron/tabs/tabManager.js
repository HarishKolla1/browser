import {BrowserView} from 'electron';
import Tab from './tabModel.js';


class TabManager {
    constructor(window){
        this.window=window;
        this.tabs=[];
        this.nextTabId=1;
        this.activeTabId=null;
        //this.setupIPC();
    }

    createTab(url=''){
        const id=this.nextTabId++;
        const title='New Tab';
        const tab= new Tab(id,url,title,this.window);
        this.tabs.push(tab);
        const view=tab.view;
        view.webContents.setWindowOpenHandler(({url}) =>{
            this.createTab(url);
            return {action: 'deny'};
        });
        view.webContents.on('page-title-updated',(_,title)=> {
            tab.title=title;
            this.window.webContents.send('tab-updated', {
                id,
                title,
            });
        });
        view.webContents.on('did-navigate',(_,url) => {
            tab.url=url;
            this.window.webContents.send('tab-url-updated', {
                id,
                url,
            });
        });

        this.window.webContents.send('tab-created', {
            id,
            title: 'New Tab',
            url: '',
        })

        this.setActiveTab(id);

        if(url){
            view.webContents.loadURL(url);
            tab.url=url;
        }
    }

    setActiveTab(id){
        const tab=this.tabs.find(t =>t.id ===id);
        if(!tab){
            return;
        }
        this.activeTabId=id;

        const bounds=this.window.getBounds();
        tab.view.setBounds({
            x:0,
            y:100,
            width:bounds.width,
            height: bounds.height-100,
        });
        tab.view.setAutoResize({width: true,height: true});
        this.window.setBrowserView(tab.view);
        this.window.webContents.send('tab-activated' ,id);
    }
    closeTab(id){
        const tabIndex=this.tabs.findIndex(t => t.id ===id);
        if(tabIndex ===-1) return;
        
        const [tab] = this.tabs.splice(tabIndex,1);

        if(tab?.view){
            this.window.removeBrowserView(tab.view);
            if(typeof tab.view.destroy === 'function'){
                tab.view.destroy();
            }
        }

        this.window.webContents.send('tab-closed',id);

        if(this.tabs.length===0){
            this.window.close();
            return;
        }

        if(this.activeTabId ===id){
            this.setActiveTab(this.tabs[this.tabs.length - 1].id);
        }

    }

}

export default TabManager;