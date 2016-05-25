/**
 * Created by psmit on 5/25/2016.
 */
module = module.exports = init;

function init(config) {
    'use strict';

    var Q = require('q');

    /**
     *
     * @param value
     */
    var getBrightness = function() {
        var deferred = Q.defer();

        deferred.resolve({value: 50});

        return deferred.promise;
    };

    /**
     *
     * @param value
     */
    var putBrightness = function(value) {
        var deferred = Q.defer();

        deferred.resolve({value: 50});
        
        return deferred.promise;
    };

    return {
        getBrightness: getBrightness,
        putBrightness: putBrightness
    }
}