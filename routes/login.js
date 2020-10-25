var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const Sequelize = require("sequelize");
const User = require('../models/User');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login/login', { title: 'Logowanie' });
  });



  module.exports = router;