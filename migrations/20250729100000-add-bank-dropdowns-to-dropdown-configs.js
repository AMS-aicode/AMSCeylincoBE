'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('DropdownConfigs', 'bank', { type: Sequelize.STRING });
    await queryInterface.addColumn('DropdownConfigs', 'bankBranch', { type: Sequelize.STRING });
    await queryInterface.addColumn('DropdownConfigs', 'accountType', { type: Sequelize.STRING });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('DropdownConfigs', 'bank');
    await queryInterface.removeColumn('DropdownConfigs', 'bankBranch');
    await queryInterface.removeColumn('DropdownConfigs', 'accountType');
  }
};