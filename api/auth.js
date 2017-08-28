const mongojs = require('mongojs');
const db = mongojs('users', ['users']);
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const uuidv1 = require('uuid/v1');

module.exports.login = function (req, res) {
    user = req.body.username;
    pass = req.body.password;
    db.users.findOne({ "username": user, "password": pass }, function (err, docs) {
        if (err) {
            res.status(400);
            res.send(err);
            return;
        }
        else {
            if (docs === null) {
                res.status(403);
                return;
            }
            res.status(200);
            var token = jwt.sign({ data: user }, 'shhhh');
            console.log(token);
            res.send({ "username": docs.username, "profile": docs.profile, 'token': token });
            return;
        }
    });
};
module.exports.register = function (req, res) {
    console.log(req.body);
    db.users.findOne({ "username": req.body.username }, function (err, docs) {
        if (err) {
            res.status(400);
            res.send(err);
            return;
        }
        else {
            if (docs === null) {
                db.users.count(function (err, count) {
                    var id = count + 1242345
                    db.users.insert({
                        "username": req.body.username,
                        "password": req.body.password,
                        "profile": {
                            "mentorId": "59a3992722297d03d040c48c",
                            "admin": true,
                            "assignments": [{
                                "id": uuidv1(),
                                "title": 'first assignment',
                                "description": 'this is a demo assignmetn',
                                "start": new Date(),
                                "status": "Todo",
                                "dueDate": new Date(),
                            }, {
                                "id": uuidv1(),
                                "title": 'another assignment',
                                "description": 'another demo assignment',
                                "start": new Date(),
                                "status": "In progress",
                                "dueDate": new Date(),
                            }, {
                                "id": uuidv1(),
                                "title": 'test assignment',
                                "description": 'we getting assignments',
                                "start": new Date(),
                                "status": "Todo",
                                "dueDate": new Date(),
                            }]
                        }
                    });
                    var token = jwt.sign({ data: req.body.username }, 'shhhh');
                    console.log("hello " + token);
                    res.send({ 'token': token });
                });
            }
            else {
                console.log('first');
                res.status(403);
                res.send({ "err": "username already exists" });
                return;
            }
        }
    });
};
module.exports.profile = function (req, res) {
    if (!req.query.token) {
        res.status(403);
        res.send();
    }
    jwt.verify(req.query.token, 'shhhh', function (err, decoded) {
        if (err) {
            res.send(err);
            return;
        }
        if (decoded === undefined) {
            console.log('yay')
            res.status(403);
            res.send();
            return;
        }
        db.users.findOne({ "username": decoded.data }, function (err, docs) {
            if (err) {
                res.status(400);
                res.send(err);
                return;
            }
            else {
                if (docs === null) {
                    res.status(403);
                    return;
                }
                res.status(200);
                res.send({ "username": docs.username, "profile": docs.profile });
            }
        });
    });
}