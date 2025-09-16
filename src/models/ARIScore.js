const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class ARIScore extends Model {}

ARIScore.init({
  civilStatusScore: { type: DataTypes.INTEGER },
  ageScore: { type: DataTypes.INTEGER },
  educationScore: { type: DataTypes.INTEGER },
  olMathsScore: { type: DataTypes.INTEGER },
  olEnglishScore: { type: DataTypes.INTEGER },
  workExperienceScore: { type: DataTypes.INTEGER },
  childrenScore: { type: DataTypes.INTEGER },
  introducerAgeScore: { type: DataTypes.INTEGER },
  extracurricularScore: { type: DataTypes.INTEGER },
  secondLanguageScore: { type: DataTypes.INTEGER },
  totalScore: { type: DataTypes.INTEGER },
  pepStatus: { type: DataTypes.BOOLEAN },
  applicationId: { type: DataTypes.INTEGER, allowNull: false }
}, {
  sequelize,
  modelName: 'ARIScore',
  tableName: 'ari_scores',
  timestamps: false,
});

module.exports = ARIScore;
