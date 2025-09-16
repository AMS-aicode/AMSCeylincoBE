'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DropdownConfigs', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      designation: { type: Sequelize.STRING },
      title: { type: Sequelize.STRING },
      nationality: { type: Sequelize.STRING },
      language: { type: Sequelize.STRING },
      civilStatus: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('DropdownConfigs');
  }
};
