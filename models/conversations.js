const { Sequelize, DataTypes, getDataValue } = require('sequelize');
const sequelize = require('../db/sequelizer');

const conversations = sequelize.define('conversations', {
  id: {
    type: DataTypes.INTEGER ,
    allowNull: false,
    primaryKey: true
  },
  login: {
    type: DataTypes.STRING
  },
  content: {
    type: DataTypes.STRING
  },
  reg_date: {
    type: DataTypes.DATE
  }
}, {
    tableName: 'conversations',
    timestamps: false
});

// `sequelize.define` also returns the model
console.log(conversations === sequelize.models.conversations); // true

module.exports = conversations;