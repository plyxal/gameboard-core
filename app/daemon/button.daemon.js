/**
 * Created by psmit on 12/9/2015.
 */
exports = module.exports = init;

function init(config) {
    if(!config.enabled)
        return;

    var Gpio = require('onoff').Gpio;
    var systemService = inject('systemService');
    var wmctrl = require('wmctrl');

    var buttonPress = function (err, value) {
        console.log('home.button.daemon::buttonPress::err ', err);
        console.log('home.button.daemon::buttonPress::value ', value);

        if (err) {
            throw err;
        }

        var wnd;
        wmctrl.list(function(err, list) {
            var len = list.length;
            for(var i in list) {
                console.log('i: ', i);
                if(list[i].title.indexOf('gameboard-ui') > -1) {
                    wnd = list[i];
                    console.log('found window: ', wnd);
                    break
                }
            }

            wmctrl.activate(wnd.id, function(err) {
                console.log('wmctrl callback: ', err)
            })
        });
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