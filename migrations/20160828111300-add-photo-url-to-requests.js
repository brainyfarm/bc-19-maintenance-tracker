'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Requests', 'photoUrl', Sequelize.STRING)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Requests', 'photoUrl')
  }
};
