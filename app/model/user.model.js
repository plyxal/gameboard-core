/**
 * Created by Paul on 8/11/2015.
 */
module = module.exports = init;

function init(config) {
    'use strict';

    var Sequelize = require('sequelize');
    var sequelize = inject('sequelize');

    var model;

    (function() {
        model = sequelize.define('Users', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
                allowNull: false,
                primaryKey: true
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false
            }
        }, {
            tableName: config.table
        })
    }());

    return model;
}