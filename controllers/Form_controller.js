exports.viewUsers = (req, res) => {
    res.render("User_form", { users: [] });
};

exports.showForm = (req, res) => {
    res.render("form");
};