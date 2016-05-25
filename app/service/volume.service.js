/**
 * Created by psmit on 2/23/2016.
 */
module = module.exports = init;

function init(config) {
    'use strict';

    var Q = require('q');

    //stub loudness so it can be disabled
    var loudness = {
       getVolume: function() {},
       setVolume: function() {}
    };

    //if enabled, load loudness module
    if(config.enabled)
        var loudness = require('vendor/loudness/index');

    /**
     *
     * @param value
     */
    var getVolume = function() {
        var deferred = Q.defer();

        loudness.getVolume(function (err, vol) {
            deferred.resolve(vol);
        });

        //if not enabled, mock result
        if(!config.enabled)
            deferred.resolve({value: 50});


        return deferred.promise;
    };

    /**
     *
     * @param value
     */
    var putVolume = function(value) {
        var deferred = Q.defer();

        loudness.setVolume(value, function (err) {
            deferred.resolve(value)
        });

        //if not enabled, mock result
        if(!config.enabled)
            deferred.resolve({value: value});

        return deferred.promise;
    };

    return {
        getVolume: getVolume,
        putVolume: putVolume
    }
}