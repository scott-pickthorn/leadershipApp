angular.module('myApp.assignments', [])
    .directive('assignments', ['profileService', function (profileService) {
        return {
            scope: true,
            bind: true,
            controllerAs: 'ctrl',
            controller: function () {
                this.filter = '';
                this.profile = profileService.getProfile();
                this.user = profileService.getUsername();
                this.assignments = profileService.getAssignments();
                this.setAssignmentStatus = function (id, status) {
                    profileService.setAssignmentStatus(this.user, id, status).then(function (res) {
                        console.log(res);
                    }, function (err) {
                        console.log(err);
                    });
                }
            },
            templateUrl: 'components/assignments/assignments.html'
        }
    }]);