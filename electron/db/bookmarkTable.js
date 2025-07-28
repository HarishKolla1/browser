

export default function initBookmarks(db){
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
}