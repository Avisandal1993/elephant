(function() {
    'use strict';

    angular
        .module('flavido')
        .factory('CommonInfo', CommonInfo)
        .directive('whenScrollEnds', whenScrollEnds)
        .filter('htmlToPlaintext', htmlToPlaintext)
        .filter('charCodeToChar', charCodeToChar)
        .filter('truncate', truncate);

    /** @ngInject */
    function htmlToPlaintext() {
        return function(text) {
            return text ? String(text).replace(/<[^>]+>/gm, '') : '';
        }
    }

    /** @ngInject */
    function charCodeToChar() {
        return function(code) {
            return String.fromCharCode(code);
        }
    }

    /** @ngInject */
    function truncate() {
        return function(text, char) {
            return text.length > char ? text.substr(0, char) + '...' : text;
        }
    }

    /** @ngInject */
    function whenScrollEnds($window) {
        return {
            restrict: "A",
            link: function(scope, element, attrs) {
                var visibleHeight = $window.innerHeight;
                var threshold = 100;

                element.scroll(function() {
                    var scrollableHeight = element.prop('scrollHeight');
                    var hiddenContentHeight = scrollableHeight - visibleHeight;

                    if (hiddenContentHeight - element.scrollTop() <= threshold) {
                        // Scroll is almost at the bottom. Loading more rows
                        scope.$apply(attrs.whenScrollEnds);
                    }
                });
            }
        };
    }

    /** @ngInject */
    function CommonInfo($localStorage, $state, $mdToast) {
        var studentInfo = {};
        return {
            getInfoObj: function() {
                return angular.copy($localStorage.fInfoObj);
            },
            getInfo: function(item) {
                // if (!$localStorage.fInfoObj || !$localStorage.fInfoObj.user)
                //     $state.go('main');
                // else
                if ($localStorage && $localStorage.fInfoObj)
                    return angular.copy($localStorage.fInfoObj[item]);
                else
                    return {};
            },
            setInfo: function(item, value) {
                var obj = $localStorage.fInfoObj || {};
                obj[item] = angular.copy(value);
                $localStorage.fInfoObj = obj;
            },
            reset: function() {
                $localStorage.$reset();
            },
            getAppUrl: function() {
                return 'http://api.fundsplanner.com/v0';
            },
            getTestSeriesAppUrl: function() {
                return 'http://139.59.44.117/testSeries';
            },
            showAlert: function(text) {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent(text)
                    .hideDelay(3000)
                    .position('top right')
                );
            }
        };
    }
})();
