var mongojs = require('mongojs');
var db = mongojs('users', ['users']);
var crypto = require('crypto');

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
            req.session.id = docs.id;
            console.log(req.session);
            res.status(200);
            res.send(docs);
        }
    });
};
module.exports.register = function (req, res) {
    console.log(req.body);
    
    db.users.count(function(err, count){
    var id = count + 1242345
    db.users.insert({
        "username": req.body.username,
        "password": req.body.password,
        "id": id,
        "access": "basic",
        "profile":{
        }
    });
    });
    res.status(200);
    res.send('success');
};