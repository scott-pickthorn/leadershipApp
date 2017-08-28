angular.module('myApp.assignments', [])
.directive('assignments', ['profileService', function(profileService){
    return {
        scope: true,
        bind: true,
        controllerAs: 'ctrl',
        controller: function(){
            this.profile = profileService.getProfile();
            this.user = profileService.getUsername();
            this.assignments = profileService.getAssignments();
    },
        templateUrl: 'components/assignments/assignments.html'
    }
}]);