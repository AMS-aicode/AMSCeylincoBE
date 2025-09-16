const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class AddressContactDetails extends Model {}
  AddressContactDetails.init({
    applicationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: { model: 'agent_applications', key: 'id' }
    },
    permanentAddressLine1: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    permanentAddressLine2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    permanentCityTown: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    permanentProvince: {
      type: DataTypes.STRING,
      allowNull: false
    },
    permanentDistrict: {
      type: DataTypes.STRING,
      allowNull: false
    },
    permanentDSecretariat: {
      type: DataTypes.STRING,
      allowNull: false
    },
    permanentElectorate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    permanentGramaNiladari: {
      type: DataTypes.STRING,
      allowNull: false
    },
    permanentPostalCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isCorrespondenceSameAsPermanent: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    correspondenceAddressLine1: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    correspondenceAddressLine2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    correspondenceCityTown: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    correspondenceProvince: {
      type: DataTypes.STRING,
      allowNull: true
    },
    correspondenceDistrict: {
      type: DataTypes.STRING,
      allowNull: true
    },
    correspondenceDSecretariat: {
      type: DataTypes.STRING,
      allowNull: true
    },
    correspondenceElectorate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    correspondenceGramaNiladari: {
      type: DataTypes.STRING,
      allowNull: true
    },
    correspondencePostalCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    contactHome: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    contactMobile: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    contactWhatsApp: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    contactEmergency: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'AddressContactDetails',
    tableName: 'address_contact_details',
    timestamps: true
  });

  AddressContactDetails.associate = function(models) {
    AddressContactDetails.belongsTo(models.AgentApplication, { foreignKey: 'applicationId' });
  };

  return AddressContactDetails;
};
