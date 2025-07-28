

export default function initHistory(db){
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
}