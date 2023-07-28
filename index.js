const express = require('express');

const app = express();
const port = 3001;
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

const db = new sqlite3.Database('data.db', (err) => {
    if (err) {
      throw err;
    }
  
    // create tables if they don't exist
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, 
        created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP)`);
    });
  });

app.listen(port, () => {
  console.log(`Notes app listening on port ${port}`);
});