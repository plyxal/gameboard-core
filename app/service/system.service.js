/**
 * Created by Paul on 8/10/2015.
 */
module = module.exports = init;

function init(config) {
    'use strict';

    var Q = require('q');
    var exec = require('child_process').exec;

    /**
     * @public
     * @param {String} name
     * @returns {*|promise}
     */
    var launch = function(command) {
        var deferred = Q.defer();
        //console.log('system.service::launch:command: ', command);

        exec(command, function(error, stdout, stderr) {
            deferred.resolve({error: error, stdout: stdout, stderr: stderr});
        });

        return deferred.promise;
    };

    return {
        launch: launch
    }
}