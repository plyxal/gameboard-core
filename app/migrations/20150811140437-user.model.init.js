'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('users', {
          id: {
              type: Sequelize.UUID,
              defaultValue: Sequelize.UUIDV1,
              allowNull: false,
              primaryKey: true
          },
          username: {
              type: Sequelize.STRING,
              allowNull: false
          },
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE
      });
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('users');
  }
};
