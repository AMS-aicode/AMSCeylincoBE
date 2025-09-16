'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ari_scores', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      civilStatusScore: { type: Sequelize.INTEGER },
      ageScore: { type: Sequelize.INTEGER },
      educationScore: { type: Sequelize.INTEGER },
      olMathsScore: { type: Sequelize.INTEGER },
      olEnglishScore: { type: Sequelize.INTEGER },
      workExperienceScore: { type: Sequelize.INTEGER },
      childrenScore: { type: Sequelize.INTEGER },
      introducerAgeScore: { type: Sequelize.INTEGER },
      extracurricularScore: { type: Sequelize.INTEGER },
      secondLanguageScore: { type: Sequelize.INTEGER },
      totalScore: { type: Sequelize.INTEGER },
      pepStatus: { type: Sequelize.BOOLEAN },
      applicationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'agent_applications',
          key: 'id',
        },
        onDelete: 'CASCADE',
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ari_scores');
  }
};