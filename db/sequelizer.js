const config = require('../db/dbConfig')
const Sequelize = require("sequelize");

module.exports =  new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
  });

