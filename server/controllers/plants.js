const {
  Plant,
  User,
} = require('../models');

const {
  actAsUser,
} = require('../helpers');

const addPlant = (req, res) => {
  const plant = new Plant({
    ...req.body,
    owner: req.userId,
  });

  plant.save((err, response) => {
    if (err) return res.status(500).send({ message: err });

    actAsUser(req, res, ( user ) => {
      User.updateOne({
        _id: user._id,
      }, {
        plants: [ ...user.plants, response._id ],
      }, (err) => {
        if (err) return res.status(500).send({ message: err });
        res.send({
          message: 'Plant was created successfully!',
          _id: response._id,
        });
      });
    });
  });
};

const removePlant = (req, res) => {
  Plant.findOne({
    _id: req.body.plantId,
  }, (err, plant) => {
    if (err) return res.status(500).send({ message: err });
    if (!plant) return res.status(404).send({ message: 'Plant Not Found' });
    if (!plant.owner.equals(req.userId)) return res.status(500).send({ message: 'No Permission' });

    actAsUser(req, res, ( user ) => {
      User.updateOne({
        _id: user._id,
      }, {
        plants: user.plants.filter((_id) => !plant._id.equals(_id)),
      }, () => {
        Plant.deleteOne({
          _id: plant._id,
        }, (err) => {
          if (err) return res.status(500).send({ message: err });
          res.send({ message: 'Plant was deleted successfully!' });
        });
      });
    });
  });
};

const updatePlant = (req, res) => {
  Plant.findOne({
    _id: req.body.plantId,
  }, (err, plant) => {
    if (err) return res.status(500).send({ message: err });
    if (!plant) return res.status(404).send({ message: 'Plant Not Found' });
    if (!plant.owner.equals(req.userId)) return res.status(500).send({ message: 'No Permission' });

    Plant.updateOne({
      _id: plant._id,
    }, {
      ...req.body.plantData,
    }, (err) => {
      if (err) return res.status(500).send({ message: err });
      res.send({ message: 'Plant was updated successfully!' });
    });
  });
};

const getPlants = (req, res) => {
  actAsUser(req, res, ( user ) => {
    Plant.find({
      _id: user.plants,
    }, (err, plants) => {
      if (err) return res.status(500).send({ message: err });
      if (!plants) return res.status(404).send({ message: 'Plants Not Found' });

      res.send({
        message: 'Plant was updated successfully!',
        plants,
      });
    });
  });
};

module.exports = {
  addPlant,
  removePlant,
  updatePlant,
  getPlants,
};
