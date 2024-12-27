const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Bazaga ulanish
const dbPath = path.resolve(__dirname, 'users.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Bazaga ulanishda xato:', err.message);
  } else {
    console.log('SQLite bazasi ulanishi muvaffaqiyatli.');
  }
});

// Foydalanuvchilar jadvalini yaratish
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);
});

module.exports = db;
