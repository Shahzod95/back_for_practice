const db = require('./database');

exports.createUser = (username, password, callback) => {
  const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
  db.run(query, [username, password], function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, username });
  });
};

exports.findUserByUsername = (username, callback) => {
  const query = `SELECT * FROM users WHERE username = ?`;
  db.get(query, [username], (err, row) => {
    if (err) return callback(err);
    callback(null, row);
  });
};
