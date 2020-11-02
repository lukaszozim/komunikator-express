require('dotenv').config({path:'.env'});
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var session = require('express-session');
const User = require('./models/User');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registrationRouter = require('./routes/registration');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'komunikator-app',
  resave: false,
  saveUninitialized: true,
  cookie:{}
}));


//konfiguracja passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', loginRouter);
app.use('/registration', registrationRouter);

//obsługa błędu 404
app.use('/', function(err, req, res, next) {
  console.log('posrednia 404');
  if(err.status=='404'){
    res.send('Wystąpił błąd');
  }
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},
  async (username, password, done)=>{
    let user = await User.findOne({ where: {username: username }});
    if(user){
      if(user.username === username){
        if (user.password === password) {
          console.log('jest OK');
          return done(null, user);
        }else{
          return done(null, false);
        }
      }else{
        return done(null, false);
      }
    }else{
      return done(null, false);
    }

    }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async(id, done) =>{
  let user = await User.findByPk(id);
  if(user.id===id){
    done(null, user);
  }else{
    done(null, null);
  }
});



module.exports = app;
