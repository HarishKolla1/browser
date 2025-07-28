

export default function initUsers(db){
    db.prepare(
        `CREATE TABLE IF NOT EXISTS Users(
        user_id Integer PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
    ).run();
}
