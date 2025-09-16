"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("exam_details", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      applicationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "agent_applications",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      ibslExams: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      selfPacedSection: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      preContractExamData: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      olExamIndexes: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("exam_details");
  },
};
