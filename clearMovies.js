const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    db.run(`
      DELETE FROM movie
    `);
  });

db.close();