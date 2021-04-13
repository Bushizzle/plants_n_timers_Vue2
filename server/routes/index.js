const routes = [
  require('./auth'),
  require('./plants'),
  require('./plants'),
  require('./account'),
  require('./test'),
  require('./static'),
];

module.exports = (app) => routes.forEach((addRoutes) => addRoutes(app));
