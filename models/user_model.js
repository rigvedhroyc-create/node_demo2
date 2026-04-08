const db = require("../config/db")
exports.getUsers = (callback) => {
  db.query("SELECT * FROM users", callback);
};

exports.addUser = (name, email, callback) => {
  db.query(
    "INSERT INTO users (name,email) VALUES (?,?)",
    [name, email],
    callback
  );
};

exports.getUserById = (id, callback) => {
  db.query("SELECT * FROM users WHERE id = ?", [id], callback);
};

exports.updateUser = (id, name, email, callback) => {
  db.query(
    "UPDATE users SET name=?, email=? WHERE id=?",
    [name, email, id],
    callback
  );
};

exports.loginUser = (email, password, callback) => {

  db.query(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email, password],
    callback
  );

};

exports.logLogin = (userId, callback) => {

  db.query(
    "INSERT INTO user_login_logs (user_id, login_time) VALUES (?, NOW())",
    [userId],
    callback
  );

};


exports.logLogout = (userId, callback) => {

  db.query(
    "UPDATE user_login_logs SET logout_time = NOW() WHERE user_id=? AND logout_time IS NULL",
    [userId],
    callback
  );

};