import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync(':memory:');


// Execute SQL statements from string

db.exec(`

        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            Password TEXT
        )    
    `)

db.exec(`
        CREATE TABLE todo (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            task TEXT,
            completed BOLEAN DEFAULT 0,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    
    `)

export default db;