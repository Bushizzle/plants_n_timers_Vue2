const {
  signUp,
  signIn,
} = require('./auth');

const {
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
} = require('./users');

const {
  addFriend,
  removeFriend,
} = require('./account');

const {
  addPlant,
  removePlant,
  updatePlant,
  getPlants,
} = require('./plants');

module.exports = {
  signUp,
  signIn,
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
  addPlant,
  removePlant,
  updatePlant,
  getPlants,
  addFriend,
  removeFriend,
};
