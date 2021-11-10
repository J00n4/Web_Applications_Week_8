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
const upload = multer({storage});
const style = require("../stylesheets/style.css");*/



if(document.readyState !== "loading") {
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        initializeCode();
    });
}

function initializeCode() {
    onSubmit();
    //document.getElementById("index-form").addEventListener("submit", onSubmit);
    
    /* Jos käyttäjä on kirjautunut, näytetään logout-nappi ja sähköposti
    Jos ei ole kirjautunut, näytetään login ja register linkit */
    token = getToken();
    var links = document.getElementById("links");
    var logoutButton = document.getElementById("logout");
    var email_info = document.getElementById("email_text");
    if(!token) {
        //document.getElementById("links").remove();
        links.style.visibility = "visible";

        //var input_field = document.getElementById("login_area");
        //var btn = document.createElement("button");
        //btn.setAttribute("id", "logout");
        //btn.innerHTML = "Logout";
        //input_field.appendChild(btn);
        logoutButton.style.visibility = "hidden";
        
        email_info.style.visibility = "hidden";
        //var email_info = document.createElement("p");
        //email_info.innerHTML = token;
        //input_field.appendChild(email_info);
        //document.getElementById("email_text").setAttribute("display", "block");
        //document.getElementById("logout").setAttribute("display", "block");
        //document.getElementById("links").setAttribute("display", "none");
    } else {
        links.style.visibility = "hidden";
        logoutButton.style.visibility = "visible";
        email_info.style.visibility = "visible";
    }

    document.getElementById("logout").addEventListener("click", logout);
    console.log("This is the wrong place");
}

function onSubmit(event) {
    //event.preventDefault();
    //const formData = new FormData(event.target);

    console.log("This is the right place");
    const authToken = localStorage.getItem("auth_token");
    if(!authToken) return;

    fetch("/api/list", {
        method: "GET",
        headers: {
            "authorization": "Bearer " + authToken
        }
    })
        .then((response) => response.text())
        .then((data) => {
            console.log(data);
        })
        .catch((e) => {
            console.log("error" + e);
        })
        



    /*register.style.visibility = "hidden";
    login.style.visibility = "hidden";
    logoutButton.style.visibility = "visible";
    emailArea.style.visibility = "visible";
    
    var base64Url = authToken.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace...
    var jsonPayload = decodeURIComponent(atob(base...
        return '%' + ('00' + c.charCodeAt(0).toString...
    }).join(''));
    
    emailArea.innerText = jsonPayload;
    eventListener;
} else {
    register.style.visibility = "visible";
    login.style.visibility = "visible";
    logoutButton.style.visibility = "hidden";
    emailArea.style.visibility = "hidden";
}*/


    /*fetch("/login.html", {
        method: "GET",
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

            
        })*/
}


function getToken() {
    var token = localStorage.getItem("auth_token");
    return token;
}

function logout() {
    localStorage.removeItem("auth_token");
    window.location.href = "/";
}