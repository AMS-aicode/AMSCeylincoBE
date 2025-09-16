'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('agent_applications', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      applicationNumber: { type: Sequelize.STRING, allowNull: false, unique: true },
      userId: { type: Sequelize.STRING, allowNull: false },
      status: { type: Sequelize.ENUM('Draft', 'Pending', 'Submitted', 'Approved', 'Rejected'), allowNull: false },
      createdDate: { type: Sequelize.DATE, allowNull: false },
      lastModified: { type: Sequelize.DATE, allowNull: false }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('agent_applications');
  }
};