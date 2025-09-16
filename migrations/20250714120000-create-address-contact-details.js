'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('address_contact_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      applicationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'agent_applications',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      permanentAddressLine1: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      permanentAddressLine2: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      permanentCityTown: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      permanentProvince: {
        type: Sequelize.STRING,
        allowNull: false
      },
      permanentDistrict: {
        type: Sequelize.STRING,
        allowNull: false
      },
      permanentDSecretariat: {
        type: Sequelize.STRING,
        allowNull: false
      },
      permanentElectorate: {
        type: Sequelize.STRING,
        allowNull: false
      },
      permanentGramaNiladari: {
        type: Sequelize.STRING,
        allowNull: false
      },
      permanentPostalCode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isCorrespondenceSameAsPermanent: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      correspondenceAddressLine1: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      correspondenceAddressLine2: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      correspondenceCityTown: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      correspondenceProvince: {
        type: Sequelize.STRING,
        allowNull: true
      },
      correspondenceDistrict: {
        type: Sequelize.STRING,
        allowNull: true
      },
      correspondenceDSecretariat: {
        type: Sequelize.STRING,
        allowNull: true
      },
      correspondenceElectorate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      correspondenceGramaNiladari: {
        type: Sequelize.STRING,
        allowNull: true
      },
      correspondencePostalCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      contactHome: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      contactMobile: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      contactWhatsApp: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      contactEmergency: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('address_contact_details');
  }
};
