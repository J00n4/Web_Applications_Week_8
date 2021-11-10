/*var express = require('express');
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
const upload = multer({storage});*/



if(document.readyState !== "loading") {
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        initializeCode();
    });
}

function initializeCode() {
    document.getElementById("login-form").addEventListener("submit", onSubmit);
}

function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    fetch("/user/login", {
        method: "POST",
        /*headers: {
            'Content-type': 'application/json'
            //'Accept': 'application/json'
        },*/
        body: formData
    })
        .then((response) => response.json())
        .then((data) => {
            if(data.token) {
                storeToken(data.token);
                window.location.href = "/";
            } /*else {
                if(data.message) {
                    return JSON.stringify(data.message);
                } else {
                    return JSON.stringify("Error!");
                }
            }*/
            /*User.findOne({email: data.email}, (err, user) => {
                if(err) throw err;
                if(!user) {
                  return JSON.stringify({message: "Login failed!"});
                } else {
                  bcrypt.compare(data.password, user.password, (err, isMatch) => {
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
                          JSON.stringify({success: true, token});
                          if(data.token) {
                            storeToken(data.token);
                            window.location.href = "/";
                        } else {
                            if(data.message) {
                                document.getElementById("error").innerHTML = data.message;
                            } else {
                                document.getElementById("error").innerHTML = "An error occurred.";
                            }
                        }
                        }
                      );
                    }
                  })
                }
              })*/

            
        })
}

function storeToken(token) {
    localStorage.setItem("auth_token", token);
}