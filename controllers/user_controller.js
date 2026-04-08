const jwt = require("jsonwebtoken");

const user_model = require("../models/user_model");

exports.showUsers = (req, res) => {

/*if (!req.session.user) {
    return res.status(401).send({
      message: "Login required"
    });
  }*/


  user_model.getUsers((err, results) => {

    if (err) {
      return res.status(500).send(err);
    }

    res.send({
      status: "success",
      users: results
    });

  });

};

exports.showForm = (req, res) => {
  res.render("addUser");
};

exports.addUser = (req, res) => {

  const { name, email } = req.body;

  user_model.addUser(name, email, (err, result) => {

    if (err) {
      return res.status(500).send(err);
    }

    res.send({
      message: "User added successfully"
    });

  });

};

exports.editUser = (req, res) => {

  /*if (!req.session.user) {
    return res.status(401).send({
      message: "Login required"
    });
  }*/

  const id = req.params.id;

  user_model.getUserById(id, (err, results) => {

    if (err) return res.status(500).send(err);

    res.send(results);

  });

};

exports.updateUser = (req, res) => {

  /*if (!req.session.user) {
    return res.status(401).send({
      message: "Login required"
    });
  }*/


  const id = req.params.id;
  const { name, email } = req.body;

  user_model.updateUser(id, name, email, (err) => {

    if (err) return res.status(500).send(err);

    res.send({
      message: "User updated successfully"
    });

  });

};

exports.loginPage = (req, res) => {

  res.render("login");

};


exports.loginUser = (req, res) => {

  const { email, password } = req.body;

  user_model.loginUser(email, password, (err, results) => {

    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const user = results[0];

    const token = jwt.sign(
      { id: user.id, email: user.email },
      "secretkey",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token: token
    });

  });

};

exports.logout = (req, res) => {

  /*if (!req.session.user) {
    return res.status(401).send({
      message: "Login required"
    });
  }*/


  const userId = req.session.user.id;

  user_model.logLogout(userId, (err) => {

    if (err) return res.status(500).send(err);

    req.session.destroy(() => {

      res.send({
        message: "Logged out successfully"
      });

    });

  });

};