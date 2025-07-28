import { ipcRenderer } from "electron";

const userAPI ={

    openAccountWindow: ()=> ipcRenderer.invoke('open-account-window'),
    getCurentUser:() => ipcRenderer.invoke('get-current-user'),

    login: (email,password) => ipcRenderer.invoke('login', {email,password}),
    signup: (email,password) =>ipcRenderer.invoke('signup',{email,password}),
    logout: () => ipcRenderer.invoke('logout'),

    onCurrentUser: (callback) => ipcRenderer.on('current-user', (_e, user) => callback(user)),

    getProfiles: (userId) => ipcRenderer.invoke('get-profiles', userId),
    addProfiles: (userId, profileName) => ipcRenderer.invoke('add-profile',{userId, profileName}),

    removeAllListners: (channel) => ipcRenderer.removeAllListeners(channel),

}

export default userAPI;