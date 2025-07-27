import { use } from "react";
import WindowController from "./windowController";

const windowMap= new Map();

let windowCounter=0;

function createWindow(userId){
    const id=++windowCounter;
    const controller = new WindowController(id,userId);
    windowMap.set(id,controller);

    controller.window.on("closed",() =>{
        windowMap.delete(id);
    })

    return controller;
}

function getWindowById(id){
    return windowMap.get(id);
}

function getAllWindows(){
    return Array.from(windowMap.values());
}

export {createWindow, getWindowById, getAllWindows};