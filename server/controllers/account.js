const {
  User,
  Plant,
} = require('../models');

const addFriend = ({ userId, body: { friendId } }, res) => {
  User.find({
    _id: [
      userId,
      friendId,
    ],
  }).exec((err, results) => {
    if (err) return res.status(500).send({ message: err });
    if (results.length < 2) return res.status(404).send({ message: 'User Not found.' });

    const user = results.find(({ _id }) => _id.equals(userId)),
        friend = results.find(({ _id }) => _id.equals(friendId));

    if (user && friend) {
      user.updateOne({
        friends: [ ...user.friends, friendId ],
      });
    }
  });
};

const removeFriend = ({ userId, body: { friendId } }, res) => {
  User.find({
    _id: [
      userId,
      friendId,
    ],
  }).exec((err, results) => {
    if (err) return res.status(500).send({ message: err });
    if (results.length < 2) return res.status(404).send({ message: 'User Not found.' });

    const user = results.find(({ _id }) => _id.equals(userId)),
        friend = results.find(({ _id }) => _id.equals(friendId));

    if (user && friend) {
      user.updateOne({
        friends: user.friends.filter((_id) => !_id.equals(userId)),
      });
    }
  });
};

module.exports = {
  addFriend,
  removeFriend,
};
