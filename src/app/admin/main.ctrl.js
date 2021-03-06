(function() {
    'use strict';

    angular
        .module('flavido')
        .controller('AdminController', AdminController);

    /** @ngInject */
    function AdminController(CommonInfo, $state, SweetAlert, $http, growl, $log) {
        var vm = this;

        vm.isCollapsed = true;
        vm.userInfo = {};

        vm.logout = logout;
        vm.createUser = createUser;

        activate();

        function activate() {
            vm.userInfo = CommonInfo.getInfo('userInfo');
            getUserType();
        }

        function logout() {
            SweetAlert.swal({
                    title: "Are you sure, You want to logout?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55"
                },
                function(isConfirm) {
                    //SweetAlert.swal("Booyah!");
                    if (isConfirm) {
                        CommonInfo.setInfo('userInfo', '');
                        $state.go('adminLogin');
                    }
                });
        }

        function createUser(file) {
            if (!file || angular.isString(file)) {
                addUpdateUser();
            } else {
                Upload.base64DataUrl(file).then(function(url) {
                    vm.user.image = url;
                    addUpdateUser();
                });
            }
        }

        function getUserType() {
            $http.get(CommonInfo.getAppUrl() + "/getadmintypes").then(
                function(response) {
                    if (response && response.data) {
                        if (response.data.status == 1) {
                            vm.userTypes = response.data.data;
                        } else if (response.data.status == 2) {
                            $log.log(response.data.message);
                        }
                    } else {
                        $log.log('There is some issue, please try after some time');
                    }
                },
                function(response) {
                    $log.log('There is some issue, please try after some time');
                }
            );
        }

        function addUpdateUser() {
            $http.post(CommonInfo.getAppUrl() + '/user_register', vm.user).then(
                function(response) {
                    if (response && response.data) {
                        if (response.data.status == 1) {
                            growl.success('User added successfuly');
                        } else if (response.data.status == 2) {
                            growl.info(response.data.message);
                        }
                    } else {
                        growl.info('There is some issue, please try after some time');
                    }
                },
                function(response) {
                    growl.warning('There is some issue, please try after some time');
                }
            );
        }
    }
})();
