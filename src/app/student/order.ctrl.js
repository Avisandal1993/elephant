(function() {
    'use strict';

    angular
        .module('flavido')
        .controller('StudentOrdersController', StudentOrdersController);

    /** @ngInject */
    function StudentOrdersController(CommonInfo, $log, $http, $stateParams, growl, $state) {
        var vm = this;
        var studentInfo;

        vm.showCourseDetails = showCourseDetails;

        activate();

        function activate() {
            studentInfo = CommonInfo.getInfo('studentInfo');
            getAllOrders();
        }

        function getAllOrders() {
            $http.post(CommonInfo.getAppUrl() + "/getordersby_studentid", { studentId: studentInfo.userId }).then(
                function(response) {
                    if (response && response.data) {
                        if (response.data.status == 1) {
                            vm.orders = response.data.data;
                        } else if (response.data.status == 2) {
                            growl.info(response.data.message);
                        }
                    } else {
                        growl.info('There is some issue, please try after some time');
                    }
                },
                function(response) {
                    growl.info('There is some issue, please try after some time');
                }
            );
        }

        function showCourseDetails(courseName, courseId) {
            if (courseName && courseId) {
                $state.go('courseDetails', { name: courseName.replace(/ /g, "-"), id: courseId });
            }
        }
    }
})();
