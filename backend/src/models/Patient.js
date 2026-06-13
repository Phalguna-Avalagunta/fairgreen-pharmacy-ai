const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    'Patient',
    {
      phone_number: { type: DataTypes.STRING, unique: true },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      history: DataTypes.JSONB,
    },
    { tableName: 'patients', underscored: true }
  );
