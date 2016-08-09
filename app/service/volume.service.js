/**
 * Created by psmit on 2/23/2016.
 */
module = module.exports = init;

function init(config) {
    'use strict';

    var Q = require('q');
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

        return deferred.promise;
    };

    return {
        getVolume: getVolume,
        putVolume: putVolume
    }
}