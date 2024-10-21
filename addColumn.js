const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db');


/*
    Directed by
    Written by	
    Produced by	
    Starring
    Cinematography
    Edited by
    Music by	
    Production
    companies
    Distributed by	
    Release date	
    Running time	
    Country
    Language
    Budget
    Box office	
*/
db.serialize(() => {

    db.run(`
        ALTER TABLE movie add director TEXT
    `);
  });

db.close();