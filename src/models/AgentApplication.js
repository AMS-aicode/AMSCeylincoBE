const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class AgentApplication extends Model {}

AgentApplication.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  applicationNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
  userId: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM('Draft', 'Pending', 'Submitted', 'Approved', 'Rejected'), allowNull: false, defaultValue: 'Draft' },
  createdDate: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  lastModified: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
}, {
  sequelize,
  modelName: 'AgentApplication',
  tableName: 'agent_applications',
  timestamps: false,
});

module.exports = AgentApplication;
