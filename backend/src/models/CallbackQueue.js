const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    'CallbackQueue',
    {
      patient_name: DataTypes.STRING,
      reason: DataTypes.TEXT,
      priority: { type: DataTypes.STRING, defaultValue: 'normal' },
      status: { type: DataTypes.STRING, defaultValue: 'pending' },
    },
    { tableName: 'callback_queue', underscored: true }
  );
