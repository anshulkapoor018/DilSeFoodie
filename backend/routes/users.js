const router = require('express').Router();
let User = require('../models/user.model');
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local").Strategy;
const passportLocalMongoose =  require("passport-local-mongoose");

const express = require("express");
var app = express(); 

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(require("express-session")({ 
  secret: "DogeCoin", 
  resave: false, 
  saveUninitialized: false
}));
// router.route('/profile').get((req, res) => {
//   return res.send("Welcome to dashboard!");
// });

//Sending POST data to the DB to check user data
router.post('/profile', 
  function(req, res){

    const {body} = req
    console.log(req.body)
    const {
      password,
    } = body; 

    let {
      email
    } = body;

    email = email.toLowerCase();



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

    email = email.toLowerCase();



    User.findOne({email: email,
    }, (err, user) => {
      if(err){
        console.log(err)
        return res.send({
          success: false,
          message: 'Error: Server Error.'
        });
      }else if (!user){
        console.log("wrong email or password")
        return
                         
      }

      // const users = user[0];
      // console.log(user)
      if(!user.validPassword(password)){
        console.log("Wrong combination")
        return res.send({
          success: false,
          message: "Error: wrong password"
        })
      }
      console.log("signed in")
      return res.send({
        success: false,
        message: "Error: wrong password"
      })


      // console.log("Signed In")
      // return res.redirect('/user/profile');

    })
});

// //Handling user login 
// app.post("/profile", passport.authenticate("local", { 
//   successRedirect: "/profile", 
//   failureRedirect: "/"
// }), function (req, res) { 
//   console.log(req.body)
// }); 

// //Handling user logout  
// app.get("/logout", function (req, res) { 
//   req.logout(); 
//   res.redirect("/"); 
// }); 

// function isLoggedIn(req, res, next) { 
//   if (req.isAuthenticated()) return next(); 
//   res.redirect("/"); 
// } 

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