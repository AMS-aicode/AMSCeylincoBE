const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ExamDetails = sequelize.define('exam_details', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    applicationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'agent_applications',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    ibslExams: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    selfPacedSection: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    preContractExamData: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    olExamIndexes: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  }, {
    tableName: 'exam_details',
    timestamps: true,
  });
  return ExamDetails;
};
