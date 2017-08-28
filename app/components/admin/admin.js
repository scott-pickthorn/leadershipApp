angular.module('myApp.admin', [])
    .directive('admin', ['profileService', function (profileService) {
        return {
            scope: true,
            bind: true,
            controllerAs: 'ctrl',
            controller: function () {
                this.profile = profileService.getProfile();
                this.user = profileService.getUsername();
                this.assignmentList = profileService.fetchAdminAssignments(this.profile.id);
            },
            templateUrl: 'components/admin/admin.html'
        }
    }]);