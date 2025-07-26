let lastLoggedInUser =null;

function getLastUser(){
    return lastLoggedInUser;
}

function setLastUser(user){
    lastLoggedInUser=user;
}

module.export={
    getLastUser,
    setLastUser,
}