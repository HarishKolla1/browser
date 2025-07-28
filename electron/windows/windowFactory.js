
import { getCurentUser } from "../main/userSession";
import WindowController from "./windowController";

const windowMap= new Map();

let windowCounter=0;

function createWindow(){
    const id=++windowCounter;
    this.user=getCurrentUser();
    this.userId=null;
    if(this.user.user_id !=null){
        this.userId=this.user.user_id;
    }
    const controller = new WindowController(id,userId,profile=''); //profiles
    windowMap.set(id,controller);

    controller.window.on("closed",() =>{
        windowMap.delete(id);
    })

    return controller;
}

function getWindow(win){
    for(const[id, controller] of windowMap.entries()){
        if(controller.window===win){
            return controller;
        }
    }
    return null;
}

function getAllWindows(){
    return Array.from(windowMap.values());
}

export {createWindow, getWindow, getAllWindows};