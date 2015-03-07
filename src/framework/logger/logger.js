(function() {
    'use strict';

    angular
        .module('fw.logger')
        .factory('logger', logger);

    logger.$inject = ['$log'];

    /* @ngInject */
    function logger($log) {
        var service = {
            log     : log,
            info    : info,
            warn    : warn,
            error   : error,
            debug   : debug
        };

        return service;
        /////////////////////

        function log(message, data /*, title*/) {
            $log.log('log: ' + message, data);
        }

        function info(message, data /*, title*/) {
            $log.info('info: ' + message, data);
        }

        function warn(message, data /*, title*/) {
            $log.warn('warn: ' + message, data);
        }

        function error(message, data /*, title*/) {
            $log.error('error: ' + message, data);
        }

        function debug(message, data /*, title*/) {
            $log.debug('debug: ' + message, data);
        }
    }
}());
