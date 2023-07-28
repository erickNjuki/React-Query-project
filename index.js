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

  // /notes endpoint of the method GET to fetch all notes
  
  app.get('/notes', (req, res) => {
    db.all('SELECT * FROM notes', (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'An error occurred, please try again later' });
      }
  
      return res.json({ success: true, data: rows });
    });
  });

app.listen(port, () => {
  console.log(`Notes app listening on port ${port}`);
});