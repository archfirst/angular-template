(function () {

    'use strict';

    angular.module('app.core')
        .directive('app', appDirective);


    // ----- appDirective -----
    function appDirective() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/app/app.html'
        };

        return directive;
    }

})();
