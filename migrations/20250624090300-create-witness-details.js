'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('witness_details', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      applicationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'agent_applications',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      witness1Name: { type: Sequelize.STRING, allowNull: false },
      witness1NIC: { type: Sequelize.STRING, allowNull: false },
      witness1Address: { type: Sequelize.STRING, allowNull: false },
      witness2Name: { type: Sequelize.STRING, allowNull: false },
      witness2NIC: { type: Sequelize.STRING, allowNull: false },
      witness2Address: { type: Sequelize.STRING, allowNull: false },
      signatureFile: { type: Sequelize.STRING },
      policyAcceptances: { type: Sequelize.JSON }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('witness_details');
  }
};