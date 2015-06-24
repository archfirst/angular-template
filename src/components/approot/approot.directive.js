(function () {

    'use strict';

    angular.module('app.approot')
        .directive('tmplApproot', directiveFunction);


    // ----- directiveFunction -----
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/approot/approot.html',
            scope: {
            }
        };

        return directive;
    }

})();
