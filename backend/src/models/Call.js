const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    'Call',
    {
      phone_number: { type: DataTypes.STRING, allowNull: false },
      call_duration: DataTypes.INTEGER,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
      status: { type: DataTypes.STRING, defaultValue: 'active' },
      category: DataTypes.STRING,
      external_id: DataTypes.STRING,
    },
    { tableName: 'calls', underscored: true }
  );
