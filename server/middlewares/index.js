const {
  verifyToken,
  isAdmin,
  isModerator,
} = require('./auth');
const {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
} = require('./signup');

module.exports = {
  verifyToken,
  isAdmin,
  isModerator,
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};
