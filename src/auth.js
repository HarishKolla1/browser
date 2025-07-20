import db from './database.js';
import bcrypt from 'bycryptjs';

export function findUserByEmail(email){
    return db.prepare('SELECT * FROM Users WHERE email= ?').get(email);
}

export function createUser(email,password){
    const passwordHash =bcrypt.hashSync(password, 10);
    return db. prepare('INSERT INTO Users (email, password_hash) VALUES(?,?)').run(email,passwordHash);
}

export function validateUser(email,password){
    const user= db.prepare('Select * From Users WHERE email=?').get(email);

    if(!user) return false;
    return bcrypt.compareSync(password, user.password_hash);
}