var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const config = require('../db/dbConfig')
const Sequelize = require("sequelize");
const User = require('../models/User');
const passport = require('passport');
const passportAuth = require('../services/passportAuth');
const chatService = require('../services/chatService');
const conversations = require('../models/conversations');

/* GET home page. */
router.get('/', async function(req, res, next) {
  await auth(req, res, next);

  console.log(req.user);
  //let user = await User.findByPk(1);
  //let conversation = await conversations.findAll();
  let conversation = await chatService.getConversations();
  
  res.render('index', { title: 'Express', conversations : conversation, user: req.user.username});

});

router.get('/user', async function(req, res, next) {

 let user = await User.findByPk(1);
 console.log(user.username);
 auth(req, res, next);
  res.render('index', { title: 'Express', user: user.username });
});

function auth(req, res, next){
      if(!req.isAuthenticated()){
        res.redirect('/login');
    }
}

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
