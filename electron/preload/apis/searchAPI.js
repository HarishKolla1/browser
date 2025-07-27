import { ipcRenderer} from "electron";

const searchAPI= {
    sendSearch: (query) => ipcRenderer.send('search-query',query),
};

export default searchAPI;

