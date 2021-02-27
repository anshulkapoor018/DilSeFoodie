const router = require('express').Router();
let User = require('../models/user.model');
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
const passportLocalMongoose =  require("passport-local-mongoose");

const express = require("express");
var app = express(); 

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(require("express-session")({ 
  secret: "DogeCoin", 
  resave: false, 
  saveUninitialized: false
}));

app.use(passport.initialize()); 
app.use(passport.session()); 

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate())); 
// passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 

// Showing Profile page 
app.get("/profile", isLoggedIn, function (req, res) { 
  res.render("secret"); 
}); 

// //Fetching
// router.route('/').get((req, res) => {
//   User.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

//Sending POST data to the DB to check user data
router.post('/profile', function(req, res){
  console.log(req.body)
  const {body} = req

  // console.log(req.body)
  const {
    password,
  } = body; 

  let {
    email
  } = body;

  // TODO: perform checks for email length and characters and all
  if(!email){
    return res.send({
      success: false,
      message: 'Error: Email cannot be blank.'
    });
  }

  if(!password){
    return res.send({
      success: false,
      message: 'Error: Password cannot be blank.'
    });
  }






});

// //Handling user login 
// app.post("/profile", passport.authenticate("local", { 
//   successRedirect: "/profile", 
//   failureRedirect: "/"
// }), function (req, res) { 
//   console.log(req.body)
// }); 

//Handling user logout  
app.get("/logout", function (req, res) { 
  req.logout(); 
  res.redirect("/"); 
}); 

function isLoggedIn(req, res, next) { 
  if (req.isAuthenticated()) return next(); 
  res.redirect("/"); 
} 

//Sending POST data to the DB
router.route('/').post((req, res) => {
  const {body} = req

  // console.log(req.body)
  const {
    firstName,
    lastName,
    password,
  } = body; 

  let {
    email
  } = body;
  
  if(!firstName){
    return res.send({
      success: false,
      message: 'Error: First name cannot be blank.'
    });
  }

  if(!lastName){
    return res.send({
      success: false,
      message: 'Error: Last name cannot be blank.'
    });
  }
    
  // TODO: perform checks for email length and characters and all
  if(!email){
    return res.send({
      success: false,
      message: 'Error: Email cannot be blank.'
    });
  }

  if(!password){
    return res.send({
      success: false,
      message: 'Error: Password cannot be blank.'
    });
  }

  //Making sure that we save our email with smaller letters
  email = email.toLowerCase();

  // Finding an exisiting user with same email
  User.find({
    email: email,
  }, (err, previousUsers) => {  
    if(err){
      console.log(err)
      return res.send({
        success: false,
        message: 'Error: Server error Find.'
      });
    }else if (previousUsers.length > 0){
      return res.send({
        success: false,
        message: 'Error: Account already exist.'
      });
    }
    
    //Save the new user
    const newUser = new User();
    newUser.email = email;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.password = password;
    
    newUser.save((err, newUser) => {
      console.log(err)
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error here.'
        });
      }
      console.log("Works")
      return res.send({
        success: true,
        message: 'Signed up.'
      });
    });
  })
})
  
module.exports = router;