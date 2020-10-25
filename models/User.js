const { Sequelize, DataTypes, getDataValue } = require('sequelize');
const sequelize = require('../db/sequelizer');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER ,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  }
}, {
    tableName: 'users',
    timestamps: false
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

module.exports = User;