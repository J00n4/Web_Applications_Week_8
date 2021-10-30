var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const {body, validationResult} = require("express-validator");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const validateToken = require("../auth/validateToken.js");

var passport = require('passport');
/*var JwtStrategy = require('passport-jwt').Strategy,
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
}));*/

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Update

router.get('/private', validateToken, function(req, res, next) {
  User.find({}, (err, user) => {
    if(err) return next(err);
    res.render("private", {email});
  })
});

router.post('/private', passport.authenticate('jwt', { session: false}),
  function(req, res) {
    res.send(req.user.email);
  });


router.get('/user/login', function(req, res, next) {
  res.render('login');
});

router.post('/user/login', 
  body("username").trim().escape(),
  body("email").escape(),
  body("password").escape(),
  function(req, res, next) {
    User.findOne({username: req.body.username}, (err, user) => {
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
                res.json({success: true, token});
              }
            );
          }
        })
      }
    })
});


router.get('/user/register', function(req, res, next) {
  res.render('register');
});

router.post('/user/register', 
  body("username").isLength({min: 3}).trim().escape(),
  body("email").isEmail().isLength({min: 5}).escape(),
  body("password").isStrongPassword().escape(),
  function(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    User.findOne({username: req.body.username}, (err, user) => {
      if(err) throw err;
      if(user) {
        return res.status(403).json({username: "Username already in use."});
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err) throw err;
            User.create(
              {
                username: req.body.username,
                email: req.body.email,
                password: hash
              },
              (err, ok) => {
                if(err) throw err;
                return res.redirect("/api/user/login");
              }
            )
          })
        })
      }
    });
});

module.exports = router;
