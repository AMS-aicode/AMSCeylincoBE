'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('educational_qualifications', {
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
      gceOLStatus: { type: Sequelize.ENUM('Pass', 'Fail'), allowNull: false },
      gceALStatus: { type: Sequelize.ENUM('Pass', 'Fail'), allowNull: false },
      diplomaStatus: { type: Sequelize.ENUM('Pass', 'Fail'), allowNull: false },
      degreeStatus: { type: Sequelize.ENUM('Pass', 'Fail'), allowNull: false },
      olEnglishGrade: { type: Sequelize.ENUM('A', 'B', 'C', 'S', 'W') },
      olMathsGrade: { type: Sequelize.ENUM('A', 'B', 'C', 'S', 'W') },
      degreeCategories: { type: Sequelize.JSON },
      extracurricularActivities: { type: Sequelize.BOOLEAN },
      secondLanguage: { type: Sequelize.BOOLEAN }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('educational_qualifications');
  }
};