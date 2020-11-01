const passport = require('passport');

function authCheck(req, res, next){
  if(req.url === '/login' || req.url === '/registration'){
    next();
  }else{
    if(req.isAuthenticated()){
        next();
      }else{
        res.redirect('/login');
      }
    }
}

module.exports = authCheck;