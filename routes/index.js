var express = require('express');
const path = require('path');
var router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const {body, validationResult} = require("express-validator");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const validateToken = require("../auth/validateToken.js");
const Todo = require("../models/Todo");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage});

var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  User.findOne({id: jwt_payload.sub}, function(err, user) {
    if(err) return done(err, false);
    if(user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/*router.get('/register.html', function(req, res, next) {
  res.sendFile(path.join(__dirname + "/public/html/register.html"));
});

router.post('/register.html', 
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

router.get('/login.html', function(req, res, next) {
  res.sendFile(path.join(__dirname + "/public/html/login.html"));
});

router.post('/login.html', 
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

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/public/html/index.html'));
});*/


module.exports = router;
