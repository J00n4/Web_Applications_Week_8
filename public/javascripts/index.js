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
const style = require("../stylesheets/style.css");



if(document.readyState !== "loading") {
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        initializeCode();
    });
}

function initializeCode() {
    document.getElementById("index-form").addEventListener("submit", onSubmit);
    document.getElementById("logout").addEventListener("click", logout);
}

function onSubmit(event) {
    event.preventDefault();
    const formData = new formData(event.target);

    /* Jos käyttäjä on kirjautunut, näytetään logout-nappi ja sähköposti
    Jos ei ole kirjautunut, näytetään login ja register linkit*/
    fetch("/login.html", {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: formData
    })
        .then((response) => response.json())
        .then((data) => {
            User.findOne({email: data.email}, (err, user) => {
                if(err) throw err;
                if(!user) {
                  return JSON.stringify({message: "No user found!"});
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
                              document.getElementById("email_text").setAttribute("display", "block");
                              document.getElementById("logout").setAttribute("display", "block");
                              document.getElementById("links").setAttribute("display", "none");
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
              })

            
        })
}

function logout() {
    localStorage.removeItem("auth_token");
    window.location.href = "/";
}