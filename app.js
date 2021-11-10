require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const {body, validationResult} = require("express-validator");
//const User = require("../Viikko 7/models/user.js");
const jwt = require("jsonwebtoken");
//const validateToken = require("../Viikko 7/auth/validateToken.js");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage});

//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


const mongoDB = "mongodb://localhost:27017/testdb";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'models')));
//app.use(express.static(path.join(__dirname, 'api')));

//app.use('/', indexRouter);
app.use('/api', usersRouter);


/*app.get('/register.html', function(req, res, next) {
  res.sendFile(path.join(__dirname + "/public/html/register.html"));
});

app.post('/register.html', 
  //body("username").isLength({min: 3}).trim().escape(),

  //body("email").isEmail().isLength({min: 5}).escape(),
  //body("password").isStrongPassword(),
  upload.none(),
  function(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    User.findOne({email: req.body.email}, (err, user) => {
      if(err) throw err;
      if(user) {
        return res.status(403).json({email: "Email is already in use."});
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err) throw err;
            User.create(
              {
                email: req.body.email,
                password: hash
              },
              (err, ok) => {
                if(err) throw err;
                return res.redirect("/login.html");
              }
            )
          })
        })
      }
    });
});

app.get('/login.html', function(req, res, next) {
  res.sendFile(path.join(__dirname + "/public/html/login.html"));
});

app.post('/login.html', 
  //body("username").isLength({min: 3}).trim().escape(),
  //body("email").isEmail().isLength({min: 5}).escape(),
  //body("password").isStrongPassword(),
  upload.none(),
  function(req, res, next) {
    User.findOne({email: req.body.email}, (err, user) => {
      if(err) throw err;
      if(!user) {
        return res.status(403).json({message: "Login failed!"});
      } else {
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
          if(err) throw err;
          if(isMatch) {
            const jwtPayload = {
              id: user._id,
              email: user.email
            }
            jwt.sign(
              jwtPayload,
              process.env.SECRET,
              {
                expiresIn: 300
              },
              (err, token) => {
                //res.json({success: true, token});
                //window.location.href = "/";
                return res.redirect("/");
              }
            );
          }
        })
      }
    })
});

app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/public/html/index.html'));
});*/



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
