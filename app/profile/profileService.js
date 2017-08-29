angular.module('myApp.profileService', [])

    .service('profileService', ['$http', function ($http) {
        var assignments = []
        var username = undefined;
        var admin = false;
        var profile = undefined;
        this.getAssignments = function () {
            return this.assignments;
        }
        this.setAssignments = function (assignments) {
            this.assignments = assignments;
        }
        this.getUsername = function () {
            return this.username;
        }
        this.fetchAdminAssignments = function (username) {
            return $http.get('/api/admin/assignments', { params: { 'id': username } }).then(function (res) {
                return res;
            },
                function (err) {
                    return err;
                });
        }
        this.setAssignment = function (id, assignment, userList) {
            return $http.post('/api/admin/assignments', { params: { 'userList': userList, 'id': id, 'assignment': assignment } }).then(function (res) {
                return res;
            }, function (err) {
                return err;
            });
        }
        this.setAssignmentStatus = function (username, id, status) {
            return $http.post('/api/user/assignments', { params: { 'username': username, 'assignmentid': id, 'status': status } }).then(function (res) {
                return res;
            }, function (err) {
                return err;
            });
        }
        this.setProfile = function (profile, username) {
            this.profile = profile;
            this.admin = profile.admin;
            this.assignments = profile.assignments;
            this.username = username;
        }
        this.getProfile = function () {
            return this.profile;
        }
        this.fetchProfile = function (token) {
            return $http.get('/api/auth/profile', { params: { 'token': token } }).then(function (res) {
                return res;
            }, function (err) {
                console.log(err);
            });
        }
        this.clearProfile = function () {
            this.assignments = [];
            this.admin = false;
            this.username = undefined;
            this.profile = undefined;
        }
    }]);