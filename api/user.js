const mongojs = require('mongojs');
const db = mongojs('users', ['users']);

module.exports.updateAssignment = function (req, res) {
    var username = req.body.username;
    var assignmentid = req.body.assignmentid;
    var status = req.body.status;
    db.users.update({ "username": username, "profile.assignments.id": assignmentid }, { "profile.assignments.status": status });
}