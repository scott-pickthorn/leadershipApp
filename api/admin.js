const mongojs = require('mongojs');
const db = mongojs('users', ['users']);
const uuidv1 = require('uuid/v1');

module.exports.setAssignment = function (req, res) {
    var userList = req.body.userList;
    var mentorId = req.body.id;
    var assignment = req.body.assignment;
    assignment.id = uuidv1();
    assignment.start = new Date();
    assignment.status = "TODO";
    console.log(userList, assignment);
    db.users.update({ "_id": mongojs.ObjectId(mentorId), }, { $push: { "profile.assignments": assignment } });
    userList.forEach(function (element) {
        db.users.update({ "profile.mentorId": mentorId, "username": element }, { $push: { "profile.assignments": assignment } });
        db.users.update({ "_id": mongojs.ObjectId(mentorId), "profile.assignments.id": assignment.id }, { $push: { "profile.assignments.usernameList": element } })
    }, this);
    res.status(200);
    res.send();
};

module.exports.updateAssignment = function (req, res) {
    var mentorId = req.body.id;
    var assignment = req.body.assignment;
    var userList = assignment.userList;
    userList.forEach(function (element) {
        db.users.update({ "profile.mentorId": mentorId, "username": element }, { $addToSet: { "profile.assignments": assignment } });
        db.users.update({ "_id": mongojs.ObjectId(mentorId), "profile.assignments.id": assignment.id }, { $addToSet: { "profile.assignments.usernameList": element } })
    }, this);
}

module.exports.getAssignmentList = function (req, res) {
    var mentorId = req.query.id;
    db.users.find({ "_id": mongojs.ObjectId(mentorId), }, { "profile.assignments": 1 }, function (err, docs) {
        if (err) {
            res.status(400);
            res.send(err);
            return;
        }
        res.send(docs);
        return;
    });
}
