/**
 * Created by psmit on 12/10/2015.
 */
exports = module.exports = init;

function init(config) {
    if(!config.enabled)
        return;

    var nomo = require('node-monkey').start();
}