const Sequelize = require("sequelize");

//połączenie do bazy
config = {
    database: "komunikator",
    username: "PHP",
    password: "mysql",
    host: "127.0.0.1",
    dialect:'mysql'
  };

  module.exports = config;