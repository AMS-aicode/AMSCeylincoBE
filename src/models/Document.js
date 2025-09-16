// Document.js - Sequelize model for Document entity
// ...existing code...
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Document = sequelize.define('Document', {
    documentId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4
    },
    applicationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'agent_applications',
        key: 'id'
      }
    },
    documentType: {
      type: DataTypes.ENUM(
        'NIC',
        'Driving License',
        'Passport',
        'Photograph',
        'Bank Passbook',
        'GS Report',
        'HOB/MBD Report',
        'Initial Interview Guide',
        'Group Annuity Form',
        'Medical Report',
        'Agent Agreement'
      ),
      allowNull: false
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fileType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fileStoragePath: {
      type: DataTypes.STRING,
      allowNull: false
    },
    uploadedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'Documents',
    timestamps: false
  });

  Document.associate = function(models) {
    Document.belongsTo(models.AgentApplication, {
      foreignKey: 'applicationId',
      targetKey: 'applicationNumber'
    });
  };

  return Document;
};
// ...existing code...
