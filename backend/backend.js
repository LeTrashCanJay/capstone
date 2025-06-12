const path = require('path');
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.listen(8080, () => {
    console.log("Server started on port 8080");
});

const connection = mysql.createConnection({
    host: "localhost",
    user: "phpuser",
    password: "phpuser",
    database: "privacy_marketplace"
});

connection.connect(function(err) {
    if(err) {
        console.log(err.code);
        console.log(err.fatal);
    }
});

$query = "SELECT * FROM users";

connection.query($query, function(err, rows, fields) {
    if(err) {
        console.log("An error occured with the query");
        return;
    }

    console.log("Query Successfully Executed.", rows);
});

connection.end(function(){
    console.log("Connection closed.")
});

app.post('/api/cookie-settings', (req, res) => {
    const {
        user_id,
        strictly_necessary,
        performance,
        analytics,
        advertisng
    } = req.body;

    const sql = `
    INSERT INTO cookie_preferences (
      user_id, strictly_necessary, performance, analytics, advertising
    )
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      strictly_necessary = VALUES(strictly_necessary),
      performance = VALUES(performance),
      analytics = VALUES(analytics),
      advertising = VALUES(advertising)
  `;
    db.query(sql, [user_id, strictly_necessary, performance, analytics, advertising], (err) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ status: 'saved' });
    });
});

app.get('/api/checkout-summary', (req, res) => {
  const { user_id } = req.query;

  const sql = `SELECT * FROM cookie_preferences WHERE user_id = ?`;

  db.query(sql, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!results.length) {
        return res.json({ exists: false });
    }

    const prefs = results[0];

    const dataMap = {
      strictly_necessary: [],
      performance: ['session stability', 'resource usage'],
      analytics: ['browsing history', 'engagement data'],
      advertising: ['location', 'purchase intent']
    };

    const givenAway = Object.entries(prefs)
      .filter(([key, val]) => ['performance', 'analytics', 'advertising'].includes(key) && val)
      .flatMap(([key]) => dataMap[key]);

    res.json({ givenAway, basedOn: prefs });
  });
});


app.get('/api/items', (req, res) => {
  res.json([
    { id: 1, name: 'Privacy Cloak', price: 19.99 },
    { id: 2, name: 'Cookie Destroyer', price: 14.99 }
  ]);
});

app.post('/api/eula', (req, res) => {
  const { user_id, accepted } = req.body;
  const sql = `
    INSERT INTO eula_acceptance (user_id, accepted)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE accepted = VALUES(accepted), accepted_at = CURRENT_TIMESTAMP
  `;
  db.query(sql, [user_id, accepted], (err) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ status: 'EULA status recorded' });
  });
});

app.get('/api/eula-status', (req, res) => {
  const { user_id } = req.query;
  const sql = `SELECT accepted FROM eula_acceptance WHERE user_id = ?`;
  db.query(sql, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (!results.length) return res.json({ accepted: 0 });
    res.json({ accepted: results[0].accepted });
  });
});
