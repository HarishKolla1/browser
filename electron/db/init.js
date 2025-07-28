import Database  from "better-sqlite3";
import path from 'path';
import fs from 'fs';
import {fileURLToPath, fireURLToPath} from 'url';

import initUsers from "./userTable";
import initProfiles from "./profileTable";
import initBookmarks from "./bookmarkTable";
import initHistory from "./historyTable";

const __filename=fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);
const dataDir =path.resolve(__dirname, '../data');

if(!fs.existsSync(dataDir)){
    fs.mkdirSync(dataDir);
}

const dbPath=path.join(dataDir, 'ldb.db');
const db=new Database(dbPath);

initUsers(db);
initProfiles(db);
initBookmarks(db);
initHistory(db);

export default db;