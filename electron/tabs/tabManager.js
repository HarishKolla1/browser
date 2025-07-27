import {BrowserView} from 'electron';
import Tab from './tabModel.js';


class TabManager {
    constructor(window){
        this.window=window;
        this.tabs=new Map();
        this.nextTabId=1;
        this.activeTabId=null;

        //this.setupIPC();
    }

    createTab(url=''){
        const id=this.nextTabId++;
        const tab= new Tab(id,url);
        this.tabs.set(id,tab);
        this.setActiveTab(id);
        return id;
    }

    setActiveTab(id){
        const tab=this.tabs.get(id);
        if(!tab){
            return;
        }
        if(this.activeTabId!=null){
            const prevTab=this.tabs.get(this.activeTabId);
            if(prevTab?.view){
                this.window.removeBrowserView(prevTab.view);
            }
        }
        this.activeTabId=id;
        this.window.setBrowserView(tab.view);

        const bounds=this.window.getBounds();
        tab.view.setBounds({
            x:0,
            y:40,
            width:bounds.width,
            height: bounds.height-40
        });
        tab.view.setAutoResize({width: true,height: true});
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

        if(this.tabs.size()===0){
            this.window.close();
        }
    }

    destroyAllTabs(){
        this.tabs.forEach(tab => {
            if(tab.view && !tab.view.isDestroyed()){
                this.window.removeBrowserView(tab.view);
                tab.view.destroy();
            }
        });
        this.tabs.clear();
        this.activeTabId=null;
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

}

export default TabManager;