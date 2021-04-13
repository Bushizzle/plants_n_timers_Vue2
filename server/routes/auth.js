const {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
} = require('../middlewares');

const {
  signUp,
  signIn,
} = require('../controllers');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.post(
    '/api/auth/signup',
    [
      checkDuplicateUsernameOrEmail,
      checkRolesExisted,
    ],
    signUp,
  );

  app.post(
    '/api/auth/signin',
    signIn,
  );
};
