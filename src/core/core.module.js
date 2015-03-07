(function() {
    'use strict';

    angular.module('app.core', [
        // Angular modules
        'ngSanitize',

        // Our reusable framework
        'fw.exception', 'fw.logger', 'fw.router',

        // 3rd Party modules
        'ui.router'
    ]);
})();
