var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('registration/registration', { title: 'Komunikator Ozima' });
  });

  module.exports = router;