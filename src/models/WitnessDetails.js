const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class WitnessDetails extends Model {}

WitnessDetails.init({
  witness1Name: { type: DataTypes.STRING, allowNull: false },
  witness1NIC: { type: DataTypes.STRING, allowNull: false },
  witness1Address: { type: DataTypes.STRING, allowNull: false },
  witness2Name: { type: DataTypes.STRING, allowNull: false },
  witness2NIC: { type: DataTypes.STRING, allowNull: false },
  witness2Address: { type: DataTypes.STRING, allowNull: false },
  signatureFile: { type: DataTypes.STRING }, // store file path or URL
  policyAcceptances: { type: DataTypes.JSON, allowNull: false },
  applicationId: { type: DataTypes.INTEGER, allowNull: false },
}, {
  sequelize,
  modelName: 'WitnessDetails',
  tableName: 'witness_details',
  timestamps: false,
});

// Add debug logging to help diagnose 404 issues
WitnessDetails.findByApplicationId = async function(applicationId) {
  console.log('DEBUG: Querying witness_details for applicationId:', applicationId);
  const result = await this.findOne({ where: { applicationId } });
  console.log('DEBUG: Query result:', result);
  return result;
};

module.exports = WitnessDetails;
