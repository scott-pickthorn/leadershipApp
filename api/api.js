const auth = require('./auth');
const admin = require('./admin');
const user = require('./user');

module.exports = function (app) {
    app.get('/api/admin/assignments', function (req, res) {
        admin.getAssignmentList(req, res);
    });
    app.post('/api/admin/assignments', function (req, res) {
        admin.setAssignment(req, res);
    });
    app.put('/api/admin/assignments', function (req, res) {
        admin.updateAssignment(req, res);
    });
    app.post('/api/user/assignments', function (req, res) {
        user.updateAssignment(req, res);
    });
    app.post('/api/auth/login', function (req, res) {
        auth.login(req, res);
    });
    app.post('/api/auth/register', function (req, res) {
        auth.register(req, res);
    });
    app.get('/api/auth/profile', function (req, res) {
        auth.profile(req, res);
    });
};