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
                return Q.reject(err);
            }

            deferred.resolve(response);
        });



        return deferred.promise;
    };

    var getConnectionState = function() {
        var deferred = Q.defer();

        var state = WiFiControl.getIfaceState();
        deferred.resolve(state);

        return deferred.promise;
    };

    /**
     * @constructor
     */
    (function() {
        WiFiControl.init({
            debug: config.debug
        });
    }());

    return {
        getNetworks: getNetworks,
        getConnectionState: getConnectionState
    }
}