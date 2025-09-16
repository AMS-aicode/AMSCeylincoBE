const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const WorkExperience = sequelize.define('WorkExperience', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    applicationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // Ensure only one WorkExperience per application
      references: {
        model: 'agent_applications',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    hasPreviousWorkExperience: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    workExperienceDuration: {
      type: DataTypes.ENUM('Less than 2 yrs', 'More than 2 yrs', 'More than 3 yrs', 'More than 5 yrs'),
      allowNull: true,
    },
    hasInsuranceExperience: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    employerName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    positionHeld: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    workPeriodFrom: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    workPeriodTo: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    employerContactNo: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  }, {
    tableName: 'WorkExperiences',
    timestamps: true,
  });

  return WorkExperience;
};
