const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class WorkStationDetails extends Model {}

WorkStationDetails.init({
  applicationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: { model: 'agent_applications', key: 'id' }
  },
  groupDepartment: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subDepCluster: {
    type: DataTypes.STRING,
    allowNull: false
  },
  branch: {
    type: DataTypes.STRING,
    allowNull: false
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  supervisorName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  introducedBySO: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  introducedBySOCode: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'WorkStationDetails',
  tableName: 'work_station_details',
  timestamps: false
});

module.exports = WorkStationDetails;
