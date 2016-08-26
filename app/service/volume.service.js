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
            console.log('getVolume::err: ', err);
            console.log('getVolume::vol: ', vol);

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
            console.log('putVoluem::value: ', value);
            console.log('putVoluem::err: ', err);

            deferred.resolve(value)
        });

        return deferred.promise;
    };

    return {
        getVolume: getVolume,
        putVolume: putVolume
    }
}