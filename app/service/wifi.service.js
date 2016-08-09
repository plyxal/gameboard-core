/**
 * Created by psmit on 5/26/2016.
 */
exports = module.exports = init;

function init(config) {
    'use strict';

    var Q = require('q');

    var WiFiControl = require('wifi-control');

    /**
     * 
     * @returns {*|promise}
     */
    var getNetworks = function () {
        var deferred = Q.defer();

        WiFiControl.scanForWiFi( function(err, response) {
            if (err) {
                console.log('reject: ', err);
                return Q.reject(err);
            }

            console.log('resolve: ', response);
            deferred.resolve(response);
        });



        return deferred.promise;
    };

    /**
     * @constructor
     */
    (function() {
        WiFiControl.init({
            debug: config.debug,
            iface: config.iface
        });
    }());

    return {
        getNetworks: getNetworks
    }
}