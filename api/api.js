var auth = require('./auth');
module.exports = function (app) {
    app.post('/api/auth/login', function (req, res) {
        auth.login(req, res);
    });
    app.post('/api/auth/register', function (req, res) {
        auth.register(req, res);
    });
    app.post('/api/auth/profile', function (req, res) {
        auth.profile(req, res);
    });
};