

export default function initProfiles(db){
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
}