const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class EducationalQualification extends Model {}

EducationalQualification.init({
  gceOLStatus: { type: DataTypes.ENUM('Pass', 'Fail'), allowNull: false },
  gceALStatus: { type: DataTypes.ENUM('Pass', 'Fail'), allowNull: false },
  diplomaStatus: { type: DataTypes.ENUM('Pass', 'Fail'), allowNull: false },
  degreeStatus: { type: DataTypes.ENUM('Pass', 'Fail'), allowNull: false },
  olEnglishGrade: { type: DataTypes.ENUM('A', 'B', 'C', 'S', 'W') },
  olMathsGrade: { type: DataTypes.ENUM('A', 'B', 'C', 'S', 'W') },
  degreeCategories: { type: DataTypes.JSON },
  extracurricularActivities: { type: DataTypes.BOOLEAN },
  secondLanguage: { type: DataTypes.BOOLEAN },
  applicationId: { type: DataTypes.INTEGER, allowNull: false },
}, {
  sequelize,
  modelName: 'EducationalQualification',
  tableName: 'educational_qualifications',
  timestamps: false,
});

module.exports = EducationalQualification;
