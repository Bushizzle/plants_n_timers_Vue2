const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = (app) => {
  app.use(cors({ origin: 'http://localhost:8081' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use('/public', express.static(path.join(__dirname, 'public')));
}
