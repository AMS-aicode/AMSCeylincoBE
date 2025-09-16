'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Documents', {
      documentId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      applicationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'agent_applications',
          key: 'id'
        }
      },
      documentType: {
        type: Sequelize.ENUM(
          'NIC',
          'Driving License',
          'Passport',
          'Photograph',
          'Bank Passbook',
          'GS Report',
          'HOB/MBD Report',
          'Initial Interview Guide',
          'Group Annuity Form',
          'Medical Report',
          'Agent Agreement'
        ),
        allowNull: false
      },
      fileName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fileType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fileSize: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fileStoragePath: {
        type: Sequelize.STRING,
        allowNull: false
      },
      uploadedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Documents');
  }
};
