const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class PersonalDetails extends Model {}

PersonalDetails.init({
  designation: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  initials: { type: DataTypes.STRING(10), allowNull: false },
  firstName: { type: DataTypes.STRING(50), allowNull: false },
  lastName: { type: DataTypes.STRING(50), allowNull: false },
  nameByInitials: { type: DataTypes.STRING(50), allowNull: false },
  civilStatus: { type: DataTypes.STRING, allowNull: false },
  hasChildren: { type: DataTypes.BOOLEAN, allowNull: false },
  nationality: { type: DataTypes.STRING, allowNull: false },
  dateOfBirth: { type: DataTypes.DATEONLY, allowNull: false },
  passportNo: { type: DataTypes.STRING(9) },
  rejoin: { type: DataTypes.STRING },
  preferredLanguage: { type: DataTypes.STRING },
  nicNo: { type: DataTypes.STRING, allowNull: false, unique: true },
  takafulAgent: { type: DataTypes.BOOLEAN },
  applicationId: { type: DataTypes.INTEGER, allowNull: false }
}, {
  sequelize,
  modelName: 'PersonalDetails',
  tableName: 'personal_details',
  timestamps: false,
});

module.exports = PersonalDetails;
