/**
 * Created by psmit on 5/25/2016.
 */
module = module.exports = init;

function init(config) {
    'use strict';

    var Q = require('q');
    var exec = require('child_process').exec;
    var storage = require('node-persist');

    /**
     *
     * @param value
     */
    var getBrightness = function() {
        var deferred = Q.defer();

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
            storage.setItemSync('brightness', value);
            deferred.resolve(value);
        });

        
        return deferred.promise;
    };

    (function() {
        console.log('init brightness');

        storage.initSync({
            dir: '/home/gameboard/persist',
            stringify: JSON.stringify,
            parse: JSON.parse,
            encoding: 'utf8',
            logging: false,  // can also be custom logging function
            continuous: true,
            interval: false, // milliseconds
            ttl: false // ttl* [NEW], can be true for 24h default or a number in MILLISECONDS
        });

        var brightness = storage.getItemSync('brightness');
        console.log('brightness: ', brightness);

        putBrightness(brightness ? brightness : 1);
    })();

    return {
        getBrightness: getBrightness,
        putBrightness: putBrightness
    }
}