const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class BankDetails extends Model {
    static associate(models) {
      BankDetails.belongsTo(models.AgentApplication, {
        foreignKey: 'applicationId',
        targetKey: 'applicationNumber',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  BankDetails.init(
    {
      applicationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'agent_applications',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      bankName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bankBranch: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accountType: {
        type: DataTypes.ENUM('Savings', 'Current'),
        allowNull: false,
      },
      accountNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      passbookFileId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'BankDetails',
      tableName: 'bank_details',
      timestamps: true,
    }
  );
  return BankDetails;
};
