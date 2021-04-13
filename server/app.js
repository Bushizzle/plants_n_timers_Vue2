require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const applyConfig = require('./config');
const applyRoutes = require('./routes');
const { initial } = require('./helpers');

const { MONGO_AUTH, PORT = 8080 } = process.env;

if(!MONGO_AUTH) return console.log('Error! No mongo auth url provided, check your .env file');

const app = express();
applyConfig(app);
applyRoutes(app);

mongoose
  .connect(MONGO_AUTH,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }).then(() => {
    console.log('Successfully connected to MongoDB');
    initial();
  }).then(() => {
    app.listen(PORT);
  }).catch(err => console.log(err));

mongoose.connection.on('error', function(err) {
  console.log('Error: Could not connect to MongoDB.');
});
