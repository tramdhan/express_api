// Load dependencies
let express = require('express');
let app = express();
let config = require('../config');
let _ = require('lodash');
const Sequelize = require('sequelize');

// Get list of databases from config
let databases = config.databases;

// Prep database instances to export
let DATABASE_INSTANCES = {};

// Check if our global is set
if (!app.locals.db || !_.isEqual(app.locals.previous_db_config, databases)) {
  // Iterate through the config and setup Sequelize instances
  // Indicate error if something went wrong when connecting
  for (let name in databases) {
    let db = databases[name];
    let { database, username, password } = db;

    // Delete cause Sequelize relies on the order of these
    // incase the config differs in order then deleting and accepting
    // the rest of the object as options for Sequelize constructor
    delete db.database
    delete db.username
    delete db.password

    DATABASE_INSTANCES[name] = new Sequelize(
      database,
      username,
      password,
      db
    )

    DATABASE_INSTANCES[name]
      .authenticate()
      .then(() => {
        console.log(`${name} Connection has been established successfully.`);
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
  }

  app.locals.db = DATABASE_INSTANCES
  app.locals.previous_db_config = databases
} else {
  DATABASE_INSTANCES = app.locals.db
}

module.exports = DATABASE_INSTANCES;
