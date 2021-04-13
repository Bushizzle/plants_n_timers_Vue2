const {
  verifyToken,
} = require('../middlewares');
const {
  addPlant,
  removePlant,
  updatePlant,
  getPlants,
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
      '/api/plant/new',
      [
        verifyToken,
      ],
      addPlant,
  );

  app.post(
      '/api/plant/remove',
      [
        verifyToken,
      ],
      removePlant,
  );

  app.post(
      '/api/plant/update',
      [
        verifyToken,
      ],
      updatePlant,
  );

  app.post(
      '/api/plant/list',
      [
        verifyToken,
      ],
      getPlants,
  );
};
