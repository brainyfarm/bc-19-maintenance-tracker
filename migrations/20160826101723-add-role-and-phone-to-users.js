'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'role', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'user'
      })
      .then(() => {
        return queryInterface.addColumn('Users', 'phone', Sequelize.STRING)
      });
      
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users', 'role').then(() => {
        return queryInterface.removeColumn('Users', 'phone');
      });
  }
};
