(function () {

    'use strict';

    angular.module('app.approot')
        .directive('tmplApproot', approotDirective);


    // ----- approotDirective -----
    function approotDirective() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/approot/approot.html'
        };

        return directive;
    }

})();
