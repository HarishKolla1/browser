import db from './database.js';
import bcrypt from 'bcryptjs';

export function findUserByEmail(email){
    return db.prepare('SELECT * FROM Users WHERE email= ?').get(email);
}

export function createUser(email,password){
    const passwordHash =bcrypt.hashSync(password, 10);
    const result=db. prepare('INSERT INTO Users (email, password_hash) VALUES(?,?)').run(email,passwordHash);
    const user=db.prepare('SELECT * FROM Users WHERE user_id=?').get(result.lastInsertRowid);
    return user;
}

export function validateUser(email,password){
    const user= findUserByEmail(email);

    if(!user) return false;
    return bcrypt.compareSync(password, user.password_hash);
}