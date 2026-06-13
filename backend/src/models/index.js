const sequelize = require('../config/database');

let models = {};

if (sequelize) {
  models = {
    Call: require('./Call')(sequelize),
    Transcript: require('./Transcript')(sequelize),
    Prescription: require('./Prescription')(sequelize),
    Patient: require('./Patient')(sequelize),
    CallbackQueue: require('./CallbackQueue')(sequelize),
  };
}

module.exports = { sequelize, models };
