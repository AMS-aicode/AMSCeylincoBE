"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("WorkExperiences", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      applicationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, // Ensure only one WorkExperience per application
        references: {
          model: "agent_applications",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      hasPreviousWorkExperience: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      workExperienceDuration: {
        type: Sequelize.ENUM(
          "Less than 2 yrs",
          "More than 2 yrs",
          "More than 3 yrs",
          "More than 5 yrs"
        ),
        allowNull: true,
      },
      hasInsuranceExperience: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      employerName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      positionHeld: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      workPeriodFrom: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      workPeriodTo: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      employerContactNo: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("WorkExperiences");
  },
};
