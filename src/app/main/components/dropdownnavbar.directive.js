/*(function() {
    'use strict';

    angular
        .module('flavido')
        .controller('MainNavbarController', MainNavbarController)
        .directive('dropDownNavbar', dropDownNavbar)
        .directive('mainNavbar', mainNavbar);


    
    function mainNavbar() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/main/components/navbar.html',
            scope: {
                userName: '=',
                userEmail: '=',
                userImage: '='
            },
            controller: MainNavbarController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    
    function dropDownNavbar() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/main/components/dropdownnavbar.html',
            scope: {
                userName: '=',
                userEmail: '=',
                userImage: '='
            },
            controller: MainNavbarController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    
    function MainNavbarController(CommonInfo, SweetAlert, $state) {
        var vm = this;

        vm.studentInfo = {};
        vm.isCollapsed = true;
        vm.profileMenu = false;

        vm.logout = logout;
        vm.menuToggle = menuToggle;

        vm.studentInfo = CommonInfo.getInfo('studentInfo');
        if (vm.studentInfo && vm.studentInfo.userId)
            vm.isStudentLogedIn = true;
        else
            vm.isStudentLogedIn = false;

        function logout() {
            SweetAlert.swal({
                    title: "Are you sure, You want to logout?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55"
                },
                function(isConfirm) {
                    if (isConfirm) {
                        CommonInfo.setInfo('studentInfo', '');
                        $state.go('main', {}, { reload: true });
                    }
                });
        }

        function menuToggle() {
            vm.isCollapsed = !vm.isCollapsed;
            angular.element(document.querySelector('.site-wrap')).toggleClass('active');
        }
    }

})();
*/