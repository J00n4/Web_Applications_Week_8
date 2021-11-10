/*var express = require('express');
const path = require('path');
var router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const {body, validationResult} = require("express-validator");*/
const User = require("../models/user");
/*const jwt = require("jsonwebtoken");
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
    document.getElementById("register-form").addEventListener("submit", onSubmit);
}

function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);
    /*const data = {
        email: 'example@email.com',
        password: 'Example1!'
    };*/
    console.log("test1");
    fetch("/register.html", {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: formData,/*JSON.stringify(data)*/
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("test2");
            /*if(data.token) {
                storeToken(data.token);
                window.location.href = "/login.html"
            } else {
                if(data.message) {
                    return res.send(data.message);
                } else {
                    return res.send("Error occurred!");
                }
            }*/
            //return res.redirect("/login.html");
            User.findOne({email: data.email}, (err, user) => {
            if(err) throw err;
            if(user) {
                return JSON.stringify({email: "Email is already in use."});
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(data.password, salt, (err, hash) => {
                    if(err) throw err;
                    console.log("test3");
                    User.create(
                    {
                        email: data.email,
                        password: hash
                    },
                    (err, ok) => {
                        if(err) throw err;
                        console.log("test4");
                        return res.redirect("/login.html");
                    }
                    )
                })
                })
            }
            });
            /*if(data.token) {
                storeToken(data.token);
                window.location.href = "/login.html";
            } else {
                if(data.message) {
                    document.getElementById("error").innerHTML = data.message;
                } else {
                    document.getElementById("error").innerHTML = "An error occurred.";
                }
            }*/
        })
}

function storeToken(token) {
    localStorage.setItem("auth_token", token);
}