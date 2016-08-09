/**
 * Created by psmit on 12/9/2015.
 */
exports = module.exports = init;

function init(config) {
    var Gpio = require('vendor/onoff/onoff').Gpio;
    var systemService = inject('systemService');

    var buttonPress = function (err, value) {
        if (err) {
            throw err;
        }

        systemService.swapApplication();
    };

    /**
     * @private
     */
    var start = function() {
        var button = new Gpio(config.gpioId, 'in', 'both');
        button.watch(buttonPress);
    };

    /**
     * @constructor
     */
    (function() {
        start();
    }())
}