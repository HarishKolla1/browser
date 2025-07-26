

class Tab{
    constructor(id, url='', title='New Tab'){
        this.id=id;
        this.url=url;
        this.title=title;
        this.query="";
        this.view=null;
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