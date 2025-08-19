import db from './init.js';

export function createProfileForUser(userID, profileName){
    const stmt= db.prepare('INSERT INTO Profiles (user_id, profile_name) VALUES (?,?)');
    const result=stmt.run(userID,profileName);

    return {
        userID: userID,
        profileName: profileName,
        profileId:result.lastInsertRowid
    }
}

export function getProfileForUser(userID){
    const gpfu= db.prepare('SELECT * FROM Profiles WHERE user_id=?');
    return gpfu.all(userID);
}

export function addProfileForUser(userID,profileName){
    createProfileForUser(userID,profileName);
    return getProfileForUser(userID);
}