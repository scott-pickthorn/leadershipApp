angular.module('myApp.admin', [])
    .directive('admin', ['profileService', function (profileService) {
        return {
            scope: true,
            bind: true,
            controllerAs: 'ctrl',
            controller: function () {
                this.assignmentTitle = ''
                this.assignmentDescription = ''
                this.date = ''
                this.profile = profileService.getProfile();
                this.user = profileService.getUsername();
                this.assignmentList = this.profile.assignments;
                this.setAssignment = function () {
                    assignment = {
                        "title": this.assignmentTitle,
                        "description": this.assignmentDescription,
                        "status": "Todo",
                        "dueDate": new Date(this.date)
                    }
                    profileService.setAssignment(this.profile.id, assignment, this.assignmentUserList);
                    assignment.userList = this.assignmentUserList;
                    this.assignmentList.push(assignment);
                }
            },
            templateUrl: 'components/admin/admin.html'
        }
    }]);