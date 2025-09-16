'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('personal_details', {
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
      designation: { type: Sequelize.STRING, allowNull: false },
      title: { type: Sequelize.STRING, allowNull: false },
      initials: { type: Sequelize.STRING(10), allowNull: false },
      firstName: { type: Sequelize.STRING(50), allowNull: false },
      lastName: { type: Sequelize.STRING(50), allowNull: false },
      nameByInitials: { type: Sequelize.STRING(50), allowNull: false },
      civilStatus: { type: Sequelize.STRING, allowNull: false },
      hasChildren: { type: Sequelize.BOOLEAN, allowNull: false },
      nationality: { type: Sequelize.STRING, allowNull: false },
      dateOfBirth: { type: Sequelize.DATEONLY, allowNull: false },
      passportNo: { type: Sequelize.STRING(9) },
      rejoin: { type: Sequelize.STRING },
      preferredLanguage: { type: Sequelize.STRING },
      nicNo: { type: Sequelize.STRING, allowNull: false, unique: true },
      takafulAgent: { type: Sequelize.BOOLEAN }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('personal_details');
  }
};