'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Sessions', {
      sid: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER
      },
      expires: {
        type: Sequelize.DATE
      },
      data: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Sessions');
  }
};