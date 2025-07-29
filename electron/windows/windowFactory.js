
import { getCurrentUser } from "../main/userSession.js";
import WindowController from "./windowController.js";


function createWindow(){
    const user=getCurrentUser();
    const userId=user?.user_id?? null;
    const profile='';
    const controller = new WindowController(id,userId,profile); //profiles

    setupWindowIpcHandlers(controller);
    
}

export {createWindow};