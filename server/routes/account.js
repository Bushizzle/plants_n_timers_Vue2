const {
  verifyToken,
} = require('../middlewares');
const {
  addFriend,
  removeFriend,
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
      '/api/account/friend/add',
      [
        verifyToken,
      ],
      addFriend,
  );

  app.post(
      '/api/account/friend/remove',
      [
        verifyToken,
      ],
      removeFriend,
  );
};
