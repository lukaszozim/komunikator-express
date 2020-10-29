var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const Sequelize = require("sequelize");
const User = require('../models/User');
const passport = require('passport');


/* GET home page. */
router.get('/login', function(req, res, next) {
    res.render('login/login', { title: 'Komunikator' });
  });


router.post('/login', (req, res, next)=> {
  passport.authenticate('local', (err, user)=>{
    if(err){
      return next(err);
    }
    if(!user){
      return res.redirect('/login');
    }
    req.login(user, ()=>{
      res.redirect('/');

    });
  })(req, res, next);
});


router.get('/logout', (req, res, next)=> {
  req.logout();
  res.redirect('/login');
});

  module.exports = router;