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
    //onSubmit();
    
    //document.getElementById("index-form").addEventListener("submit", onSubmit);
    
    /* Jos käyttäjä on kirjautunut, näytetään logout-nappi ja sähköposti
    Jos ei ole kirjautunut, näytetään login ja register linkit */
    token = getToken();
    console.log(token);
    //var links = document.getElementById("links");
    //var logoutButton = document.getElementById("logout");
    //var email_info = document.getElementById("email_text");
   

    
    if(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        var info = JSON.parse(jsonPayload);
        console.log(info);

        var logoutButton = document.createElement("button");
        logoutButton.setAttribute("id", "logout");
        logoutButton.innerHTML = "Logout";
        var email_text = document.createElement("p");
        email_text.setAttribute("id", "email_text");
        email_text.innerText = info.email;
        var input_field = document.getElementById("login_area");
        console.log(input_field);
        input_field.appendChild(logoutButton);
        input_field.appendChild(email_text);
        //email_info.innerHTML = info.email;
        //links.style.visibility = "hidden";
        //logoutButton.style.visibility = "visible";
        //email_info.style.visibility = "visible";
        document.getElementById("logout").addEventListener("click", logout);

        
    } else {
        var link_login = document.createElement("a");
        var loglink = document.createTextNode("Login");
        link_login.appendChild(loglink);
        link_login.title = "Login";
        link_login.href = "/login.html";
        var link_register = document.createElement("a");
        var reglink = document.createTextNode("Register");
        link_register.appendChild(reglink);
        link_register.title = "Register";
        link_register.href = "/register.html";
        //link_login.setAttribute("href", "/login.html");
        //link_register.setAttribute("href", "/register.html");
        var links = document.getElementById("links");
        links.appendChild(link_login);
        links.append(' ');
        links.appendChild(link_register);
        //document.getElementById("links").remove();
        //links.style.visibility = "visible";

        //var input_field = document.getElementById("login_area");
        //var btn = document.createElement("button");
        //btn.setAttribute("id", "logout");
        //btn.innerHTML = "Logout";
        //input_field.appendChild(btn);
        //logoutButton.style.visibility = "hidden";
        
        //email_info.style.visibility = "hidden";
        //var email_info = document.createElement("p");
        //email_info.innerHTML = token;
        //input_field.appendChild(email_info);
        //document.getElementById("email_text").setAttribute("display", "block");
        //document.getElementById("logout").setAttribute("display", "block");
        //document.getElementById("links").setAttribute("display", "none");
    }

    //document.getElementById("logout").addEventListener("click", logout);
    console.log("This is the wrong place");
}

/*function onSubmit(event) {
    //event.preventDefault();
    //const formData = new FormData(event.target);

    console.log("This is the right place");
    const authToken = localStorage.getItem("auth_token");
    if(!authToken) return;
    
    console.log(authToken);

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
        



    
    
    /*emailArea.innerText = jsonPayload;
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

            
        })
}*/


function getToken() {
    var token = localStorage.getItem("auth_token");
    return token;
}

function logout() {
    localStorage.removeItem("auth_token");
    window.location.href = "/";
}