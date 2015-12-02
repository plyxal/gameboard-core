/**
 * Created by Paul on 8/10/2015.
 */
module = module.exports = init;

function init(config) {
    'use strict';

    var Sequelize = require('sequelize');

    /**
     * @private
     */
    var sequelize;

    /**
     * @constructor
     */
    (function(){
        sequelize = new Sequelize(config.database, config.username, config.password, {
            host: config.host,
            dialect: config.dialect
        });
    }());

    return sequelize;
}