import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


const __filename= fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);

const dataDir =path.resolve(__dirname,'../data');

if(!fs.existsSync(dataDir)){
    fs.mkdirSync(dataDir);
}

const dbPath= path.join(__dirname,'..','data','ldb.db');

const db=new Database(dbPath);

db.prepare(`CREATE TABLE IF NOT EXISTS Users(
        user_id Integer PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS Profiles(
        profile_id Integer PRiMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        profile_name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_synced DATETIME,
        FOREIGN KEY(user_id) REFERENCES Users(user_id) ON DELETE CASCADE
    )`
).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS Bookmarks(
        bookmark_id INTEGER PRIMARY KEY AUTOINCREMENT,
        profile_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        url TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (profile_id) REFERENCES Profiles(profile_id) ON DELETE CASCADE
    )
`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS History(
        history_id INTEGER PRIMARY KEY AUTOINCREMENT,
        profile_id INTEGER NOT NULL,
        url TEXT NOT NULL,
        title TEXT,
        visited_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(profile_id) REFERENCES Profiles(profile_id) ON DELETE CASCADE
    )
`).run();

export default db;