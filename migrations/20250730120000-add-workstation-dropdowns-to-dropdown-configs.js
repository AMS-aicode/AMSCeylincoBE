'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('DropdownConfigs', 'groupDepartment', { type: Sequelize.STRING });
    await queryInterface.addColumn('DropdownConfigs', 'subDepartmentCluster', { type: Sequelize.STRING });
    await queryInterface.addColumn('DropdownConfigs', 'branch', { type: Sequelize.STRING });
    await queryInterface.addColumn('DropdownConfigs', 'unit', { type: Sequelize.STRING });
    await queryInterface.addColumn('DropdownConfigs', 'supervisorName', { type: Sequelize.STRING });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('DropdownConfigs', 'groupDepartment');
    await queryInterface.removeColumn('DropdownConfigs', 'subDepartmentCluster');
    await queryInterface.removeColumn('DropdownConfigs', 'branch');
    await queryInterface.removeColumn('DropdownConfigs', 'unit');
    await queryInterface.removeColumn('DropdownConfigs', 'supervisorName');
  }
};