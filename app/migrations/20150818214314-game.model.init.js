'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('games', {
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

            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE
        });
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('games');
    }
};
