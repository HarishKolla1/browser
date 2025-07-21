import db from './database.js';

export function createProfileForUser(userID, profileName){
    const cpfu= db.prepare('INSERT INTO Profiles (userid, profile_name) VALUES (?,?)');
    cpfu.run(userID,profileName);
}

export function getProfileForUser(userID){
    const gpfu= db.prepare('SELECT * FROM Profiles WHERE user_id=?');
    return gpfu.all(userID);
}

export function addProfileForUser(userID,profileName){
    createProfileForUser(userID,profileName);
    return getProfileForUser(userID);
}