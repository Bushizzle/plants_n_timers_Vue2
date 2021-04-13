const {
  Role,
  User,
} = require('../models');

const {
  ROLES,
} = require('../constants');

const initial = () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      ROLES.forEach((role) => {
        new Role({
          name: role,
        }).save(err => {
          if (err) console.log('error', err);
          console.log(`added '${role}' to roles collection`);
        });
      });
    }
  });
}

const actAsUser = (req, res, callback) => {
  User.findOne({
    _id: req.userId,
  }).exec((err, user) => {
    if (err) return res.status(500).send({ message: err });
    if (!user) return res.status(404).send({ message: 'User Not found.' });
    callback(user);
  });
};

module.exports = {
  initial,
  actAsUser,
}
