/**
 * Created by psmit on 5/25/2016.
 */
module = module.exports = init;

function init(config) {
    'use strict';

    var Q = require('q');
    var exec = require('child_process').exec;

    /**
     *
     * @param value
     */
    var getBrightness = function() {
        var deferred = Q.defer();

        // deferred.resolve({value: 50});

        exec('xrandr --verbose', function (err, stdout) {
            var startIndex = stdout.indexOf('Brightness: ') + 12;
            var endIndex = startIndex + 3;
            var brightness = stdout.substring(startIndex, endIndex);

            deferred.resolve(brightness);
        });

        return deferred.promise;
    };

    /**
     *
     * @param value
     */
    var putBrightness = function(value) {
        var deferred = Q.defer();

        exec('xrandr --output HDMI1 --brightness ' + value, function (err, stdout) {
            deferred.resolve(value);
        });

        
        return deferred.promise;
    };

    return {
        getBrightness: getBrightness,
        putBrightness: putBrightness
    }
}