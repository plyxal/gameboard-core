/**
 * Created by Paul on 8/18/2015.
 */
module = module.exports = init;

function init(config) {
    'use strict';

    var Sequelize = require('sequelize');
    var sequelize = inject('sequelize');

    var model;

    (function() {
        model = sequelize.define('Game', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
                allowNull: false,
                primaryKey: true
            },
            route: {
                type: Sequelize.STRING,
                allowNull: false
            },
            templateUrl: {
                type: Sequelize.STRING,
                allowNull: false
            },
            controller: {
                type: Sequelize.STRING,
                allowNull: false
            },
            controllerUrl: {
                type: Sequelize.STRING,
                allowNull: false
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            logoUrl: {
                type: Sequelize.STRING,
                allowNull: false
            },
            launchCommand: {
                type: Sequelize.STRING,
                allowNull: false
            },
            css: {
                type: Sequelize.STRING,
                allowNull: false
            }
        }, {
            tableName: config.table
        })
    }());

    return model;
}