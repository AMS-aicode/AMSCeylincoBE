"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('DropdownConfigs', 'addressLine2', { type: Sequelize.STRING });
    await queryInterface.addColumn('DropdownConfigs', 'cityTown', { type: Sequelize.STRING });
    await queryInterface.addColumn('DropdownConfigs', 'province', { type: Sequelize.STRING });
    await queryInterface.addColumn('DropdownConfigs', 'district', { type: Sequelize.STRING });
    await queryInterface.addColumn('DropdownConfigs', 'electorate', { type: Sequelize.STRING });
    await queryInterface.addColumn('DropdownConfigs', 'gramaNiladari', { type: Sequelize.STRING });
    await queryInterface.addColumn('DropdownConfigs', 'dSecretariat', { type: Sequelize.STRING });
    await queryInterface.addColumn('DropdownConfigs', 'postalCode', { type: Sequelize.STRING });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('DropdownConfigs', 'addressLine2');
    await queryInterface.removeColumn('DropdownConfigs', 'cityTown');
    await queryInterface.removeColumn('DropdownConfigs', 'province');
    await queryInterface.removeColumn('DropdownConfigs', 'district');
    await queryInterface.removeColumn('DropdownConfigs', 'electorate');
    await queryInterface.removeColumn('DropdownConfigs', 'gramaNiladari');
    await queryInterface.removeColumn('DropdownConfigs', 'dSecretariat');
    await queryInterface.removeColumn('DropdownConfigs', 'postalCode');
  }
};