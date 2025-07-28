import { createUser, findUserByEmail, validateUser } from "../../src/auth";


let currentUser=null;

function setCurrentUser(userId,userEmail){
    currentUser={user_id: userId, email: userEmail};
}

function getCurrentUser() {
    return currentUser;
}

function clearCurrentUser(){
    currentUser=null;
}

function isValid(email,password){ //async
    const valid =validateUser(email,password);
    if(!valid){
        return {success: false, message: 'Invalid email or password'};
    }
    const user=findUserByEmail(email);
    setCurrentUser(user.user_id, user.email);
    return {success :true, message: 'Login successfull' ,user:currentUser};
}

async function signUp(email,password){ //async
    const existingUser= await findUserByEmail(email);
    if(existingUser){
        return {success: false, message: 'User already exists'};
    }
    const user =createUser(email,password);
    setCurrentUser(user.user_id,user.email);
    return {success: true, message: 'Signup succesful', user: currentUser};
}

export {setCurrentUser, getCurentUser, clearCurrentUser};