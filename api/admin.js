var mongojs = require('mongojs');
var db = mongojs('users', ['users']);

module.exports.setAssignment = function (req, res) {
    userList = req.body.userList;
    mentorId = req.body.id;
    assignment = req.body.assignment;
    console.log(userList, assignment);
    userList.forEach(function (element) {
        db.users.update({ "profile.mentorId": mentorId, "username": element }, { $push: { "profile.assignments": assignment } });
    }, this);
    res.status(200);
    res.send();
};

module.exports.getAssignmentList = function (req, res) {
    console.log(req.query.id);
    db.users.find({ "profile.mentorId": req.query.id }, { username: 1, "profile.assignments": 1 }, function (err, docs) {
        if (err) {
            res.status(400);
            res.send(err);
            return;
        }
        var users = docs;
        res.send(users);
        return;
    });
}

module.exports.getUser = function (req, res) {
    db.users.findOne({ username: username }, { username: 1, profile: 1 }, function (err, docs) {
        if (err) {
            res.send(err);
        }
        res.send(docs);
    });
}