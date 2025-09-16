const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class DropdownConfigs extends Model {}
  DropdownConfigs.init({
    designation: DataTypes.STRING,
    title: DataTypes.STRING,
    nationality: DataTypes.STRING,
    language: DataTypes.STRING,
    civilStatus: DataTypes.STRING,
    addressLine2: DataTypes.STRING,
    cityTown: DataTypes.STRING,
    province: DataTypes.STRING,
    district: DataTypes.STRING,
    electorate: DataTypes.STRING,
    gramaNiladari: DataTypes.STRING,
    dSecretariat: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    bank: DataTypes.STRING,
    bankBranch: DataTypes.STRING,
    accountType: DataTypes.STRING,
    groupDepartment: DataTypes.STRING,
    subDepartmentCluster: DataTypes.STRING,
    branch: DataTypes.STRING,
    unit: DataTypes.STRING,
    supervisorName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DropdownConfigs',
    tableName: 'DropdownConfigs',
    timestamps: false,
  });
  return DropdownConfigs;
};
