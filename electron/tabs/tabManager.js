import {BrowserView, ipcMain} from 'electron';

class TabManager {
    constructor(window){
        this.window=window;
        this.tabs=new Map();
        this.nextTabId=1;
        //this.activeTabId=null;

        this.setupIPC();
    }

    createTab(url=''){
        const id=this.nextTabId++;
        const view=new BrowserView();
        const tab= new Tab(id,url);
        tab.setView(view);
        this.tabs.set(id,tab);

        view.webContents.loadURL(url);
        return id;
    }

    setActiveTab(id){
        const tab=this.tabs.get(id);
        if(!tab){
            return;
        }
        if(this.activeTabId!=null){
            const prevTab=this.tabsget(this.activeTabId);
            if(prevTab?.view){
                this.window.removeBrowserView(prevTab.view);
            }
        }
        this.window.setBrowserView(tab.view);
        tab.view.setBounds({x:0,y:40, width:this.window.getBounds().width,height:this.window.getBounds().height-40});
    }
    closeTab(id){
        const tab=this.tabs.get(id);
        if(!tab) return;
        if(tab.view){
            this.window.removeBrowserView(tab.view);
            tab.view.destroy();
        }
        this.tabs.delete(id);
        if(this.activeTabId ===id){
            const nextTabId=this.tabs.keys().next().value();
            if(nextTabId!=undefined){
                this.setActiveTab(nextTabId);
            }
            else{
                this.activeTabId=null;
            }
        }
    }

    getActiveTab(){
        return this.tabs.get(this.activeTabId);
    }

    getAllTabs(){
        return Array.from(this.tabs.values());
    }

    setTabQuery(id, query){
        const tab= this.tabs.get(id);
        if(tab){
            tab.setQuery(query);
        }
    }

    getTabQuery(id){
        const tab=this.tabs.get(id);
        return tab?.query;
    }

    addTab(url=''){
        const tabId=this.nextTabId++;
        this.tabs.set(tabId,{url});


    }

}