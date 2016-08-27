'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Requests', 'ExpertId', Sequelize.INTEGER)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Requests', 'ExpertId')
  }
};
