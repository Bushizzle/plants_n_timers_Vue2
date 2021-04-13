const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const User = require('./user');
const Role = require('./role');
const Plant = require('./plant');

module.exports = {
  User,
  Role,
  Plant,
};
