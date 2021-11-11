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

/* GET users listing. */
router.get('/list', function(req, res, next) {
  User.find({}, (err, users) => {
    if(err) return next(err);
    res.render("users", {users});
  })
});


/*
router.get('/register.html', function(req, res, next) {
  res.sendFile(path.join(__dirname + "/register.html"));
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
  res.sendFile(path.join(__dirname + "/login.html"));
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
*/

/*
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/index.html'));
});*/




// ??????????????
/*router.get('/register.html', function(req, res, next) {
  res.sendFile("C:/Users/joona/Desktop/LUT/Web Applications/Viikko 7/public/html/register.html");
});*/


/*router.get('/private', validateToken, function(req, res, next) {
  console.log(req);
  User.find({}, (err, user) => {
    if(err) return next(err);
    res.send({email: req.user.email});
    //res.render("private", {email: req.user.email});
  })
});*/

/*router.post('/private', passport.authenticate('jwt', { session: false}),
  function(req, res) {
    res.send(req.user.email);
  });*/


/*router.get('/todos', function(req, res, next) {
  Todo.find({}, (err, user) => {
    if(err) return next(err);
    res.render('todo', {user});
  })
});*/

router.post('/todos', validateToken,
  //body("todos"),
  function(req, res, next) {
    console.log(req.user);
    Todo.findOne({user: req.user.id}, (err, user) => {
      if(err) throw err;
      if(!user) {
        //let itemlist = body;
        Todo.create(
          {
            user: req.user.id,
            items: req.body.items
          },
          (err, ok) => {
            if(err) throw err;
            //return user.items;
          }
        )
        console.log("List created");
        return res.redirect("/");
        //return res.status(404).json({message: "No items found!"});
      } else {
        //let itemlist = body;
        
        for(i=0; i<req.body.items.length; i++) {
          user.items.push(req.body.items[i]);
        }
        user.save();
        //console.log("Täällä");
        console.log(user.items);

        /*Todo.updateOne(
          {items: req.body.items}
        )*/

        /*Todo.findOne({user: req.body.id}, (err, user) => {
          if(err) throw err;
          if(user) {
            Todo.updateOne(
              {user: req.body.id},
              {items: req.body.items}
            )
          }
        })*/

        /*var list = Todo.findOne({user: req.body.id});
        list.items.push({items: req.body.items});*/
        
        /*Todo.findOneAndUpdate(
          {user: req.body.id},
          {$push: {items: req.body.items} },
          {upsert: true}
        );*/
        //console.log(user.items);
        //return user.items;
        return res.redirect("/");
      }
    })
  }
);


router.get('/user/login', function(req, res, next) {
  res.render('login');
});

router.post('/user/login', 
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
                res.json({success: true, token});
                //window.location.href = "/";
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
                res.json({success: true});
                //return res.redirect("/user/login");
              }
            )
          })
        })
      }
    });
});

module.exports = router;
