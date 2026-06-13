const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    'Prescription',
    {
      patient_name: DataTypes.STRING,
      patient_phone: DataTypes.STRING,
      medication: DataTypes.STRING,
      gp_surgery: DataTypes.STRING,
      status: { type: DataTypes.STRING, defaultValue: 'pending' },
    },
    { tableName: 'prescriptions', underscored: true }
  );
