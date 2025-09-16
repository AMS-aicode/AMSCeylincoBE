'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('work_station_details', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      applicationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: 'agent_applications', key: 'id' }
      },
      groupDepartment: {
        type: Sequelize.STRING,
        allowNull: false
      },
      subDepCluster: {
        type: Sequelize.STRING,
        allowNull: false
      },
      branch: {
        type: Sequelize.STRING,
        allowNull: false
      },
      unit: {
        type: Sequelize.STRING,
        allowNull: false
      },
      supervisorName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      introducedBySO: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      introducedBySOCode: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('work_station_details');
  }
};
