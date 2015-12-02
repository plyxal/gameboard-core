/**
 * Created by Paul on 8/10/2015.
 */
module = module.exports = init;

function init(config) {
    'use strict';

    var Q = require('q');
    var userModel = inject('userModel');

    /**
     * @public
     * @param user
     * @returns {*|promise}
     */
    var createUser = function(user) {
        var deferred = Q.defer();

        userModel.create(user)
            .then(deferred.resolve, deferred.reject);

        return deferred.promise;
    };

    return {
        createUser: createUser
    }
}