const router = require('express').Router();
const session = require('express-session');
let User = require('../models/user.model');
// const mongoose = require("mongoose");
// const passport = require("passport");
const bodyParser = require("body-parser");
// const LocalStrategy = require("passport-local").Strategy;
// const passportLocalMongoose =  require("passport-local-mongoose");
// Used to Encrypt Password
const bcrypt = require('bcrypt');

const express = require("express");
var app = express(); 

app.use(bodyParser.urlencoded({ extended: true })); 

// setting up the session
app.use(
  session({
      name: 'AuthCookie',
      secret: 'uniqueSessionID',
      resave: false,
      saveUninitialized: true
  })
);

//Sending POST data to the DB to check user data
router.post('/login', 
  function(req, res){
    const {body} = req

    const {
      password,
    } = body; 

    let {
      email
    } = body;

    // TODO: perform checks for email length and characters and all
    if(!email || email.length === ""){
      console.log('Error: Email cannot be blank.');
      var redir = { redirect: '/login'};
      return res.json(redir);
    }

    if(!password || password.length === ""){
      console.log('Error: Password cannot be blank.');
      redir = { redirect: '/login'};
      return res.json(redir);
    }

    email = email.toLowerCase();

    User.findOne({email: email,
    }, (err, user) => {
      if(err){
        var redir = { redirect: '/login'};
        return res.json(redir);
      }else if (!user){
        redir = { redirect: '/login'};
        return res.json(redir);
      } else {
        console.log("User Found!");
        
        
        if(!bcrypt.compareSync(password, user.password)){
          console.log("Wrong Password!")
          redir = { redirect: '/user'};
          return res.json(redir);
        } else if(bcrypt.compareSync(password, user.password)){
          req.session.loggedIn = true;
          req.session.cookie.path = "/profile";
          req.session.email = req.body.email;
          req.session.user = user;
          // console.log(user);
          console.log("Signed in Successfully!");
          // console.log(req.session.user);
          // trying to get the session data to the profile page 
          redir = { redirect: "/", status: true, userDetails: user};
          return res.json(redir);
        }
      }
    })
});

// Update Profile data
router.route('/update_profile').post((req, res) => {
  const {body} = req

  console.log(req.body)
  const {
    profilePicture,
    firstName,
    lastName,
    city,
    state,
    age,
    password,
    email
  } = body
 
  // Updating the user Profile 
  User.updateOne(
    {email: email}, 
    {$set: req.body }, 
    function(err, doc) {
      if(err){
        console.log(`Can't update document due too: ${err}`)
        return
      }
      console.log("Updated Successfully, view documents below")
      console.log(doc)
      if (doc){
        req.session.loggedIn = true;
        req.session.cookie.path = "/profile";
        const redir = { redirect: '/profile', status: "true", userDetails: req.body};
        return res.json(redir);
      }
    });
})

//Sending POST data to the DB
router.route('/signup').post((req, res) => {
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
    
    // Encryption level, the longer the better to crack
    const saltRounds = 10;

    // Encryption algorithm to hash password
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if(err){
        console.log(`The password could not be hashed because of ${err}`)
        return
      }
      const newUser = new User();
      newUser.email = email;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.password = hash;

      // Saving the user to the DB
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
    });
  })
})
  
module.exports = router;