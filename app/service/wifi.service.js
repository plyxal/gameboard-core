/**
 * Created by psmit on 5/26/2016.
 */
exports = module.exports = init;

function init(config) {
    'use strict';

    // var Wireless = require('wireless');
    var Q = require('q');

    /**
     * 
     * @returns {*|promise}
     */
    var getNetworks = function () {
        var deferred = Q.defer();

        // var wireless = new Wireless({
        //     iface: 'wlx00c316a0c9bb',
        //     updateFrequency: 10, // Optional, seconds to scan for networks
        //     connectionSpyFrequency: 2, // Optional, seconds to scan if connected
        //     vanishThreshold: 2 // Optional, how many scans before network considered gone
        // });
        //
        // wireless.enable(function(err) {
        //     console.log('enable: ', err);
        //     wireless.start();
        // });
        //
        // wireless.on('vanish', function(network) {
        //     console.log("[  VANISH] " + network.ssid + " [" + network.address + "] ");
        // });
        //
        // // A wireless network changed something about itself
        // wireless.on('change', function(network) {
        //     console.log("[  CHANGE] " + network.ssid);
        // });
        //
        // wireless.on('signal', function(network) {
        //     console.log("[  SIGNAL] " + network.ssid);
        // });

        // console.log('wireless.list(): ', wireless.list());
        // deferred.resolve(wireless.list());

        deferred.resolve({});

        return deferred.promise;
    };

    /**
     * @constructor
     */
    (function() {

    }());

    return {
        getNetworks: getNetworks
    }
}