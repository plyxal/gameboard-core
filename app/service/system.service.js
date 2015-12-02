/**
 * Created by Paul on 8/10/2015.
 */
module = module.exports = init;

function init(config) {
    'use strict';

    var Q = require('q');

    /**
     * @public
     * @param {String} name
     * @returns {*|promise}
     */
    var getName = function(name) {
        var deferred = Q.defer();

        deferred.resolve(name);

        return deferred.promise;
    };

    return {
        getName: getName
    }
}