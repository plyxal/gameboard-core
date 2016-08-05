/**
 * Created by psmit on 5/26/2016.
 */
exports = module.exports = init;

function init(config) {
    'use strict';

    var Q = require('q');

    var networkManager = require('vendor/node-networkmanager-master/index');

    networkManager.connect(function (error, networkmanager) {
        console.log('networkmanager.NetworkManager: ', networkmanager.NetworkManager);
        
        networkmanager.NetworkManager.GetVersion(function (error, Version) {
            console.log("NetworkManager Version: " + Version);
        });
    });

    /**
     * 
     * @returns {*|promise}
     */
    var getNetworks = function () {
        var deferred = Q.defer();

        // networkManager.connect(function (error, networkmanager) {
        //     networkmanager.NetworkManager.GetVersion(function (error, Version) {
        //         console.log("NetworkManager Version: " + Version);
        //     });
        // });

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