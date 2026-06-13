const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    'Transcript',
    {
      call_id: { type: DataTypes.INTEGER, allowNull: false },
      speaker: { type: DataTypes.ENUM('patient', 'ai'), allowNull: false },
      text: { type: DataTypes.TEXT, allowNull: false },
      timestamp: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    },
    { tableName: 'transcripts', underscored: true }
  );
