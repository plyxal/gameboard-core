'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.addColumn('games', 'css', Sequelize.STRING)
    },

    down: function (queryInterface, Sequelize) {
        queryInterface.removeColumn('games', 'css');
    }
};
