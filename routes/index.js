var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const config = require('../db/dbConfig')
const Sequelize = require("sequelize");
const User = require('../models/User');
const passport = require('passport');
const passportAuth = require('../services/passportAuth');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect('/login');
  }
  //passportAuth(req, res, next);
  res.render('index', { title: 'Express' });
});

router.get('/user', async function(req, res, next) {
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect('/login');
  }
  
 let user = await User.findByPk(1);
 console.log(user.username);
  res.render('index', { title: 'Express', user: user.username });
});

/*
router.get('/seq', async function(req, res, next) {
  const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
  });

  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  res.render('index', { title: 'Express' });
});


router.get('/db-connect', function(req, res, next) {

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'PHP',
    password : 'mysql',
    database : 'komunikator'
  });

  connection.connect();

  connection.query('select 1+1 as brand', function (error, results, fields) {
    if (error) throw error;
    console.log('The firs brand: ', results[0].brand);
  });
   
  connection.end();

  res.render('index', { title: 'Express' });
});
*/
module.exports = router;
