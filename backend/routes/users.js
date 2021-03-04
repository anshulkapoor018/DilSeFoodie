const router = require('express').Router();
const session = require('express-session');
let User = require('../models/user.model');
// const mongoose = require("mongoose");
// const passport = require("passport");
const bodyParser = require("body-parser");
// const LocalStrategy = require("passport-local").Strategy;
// const passportLocalMongoose =  require("passport-local-mongoose");

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
router.route('/').get((req, res) => {
  if(req.session.loggedIn) res.redirect('/profile')
});

// Block Profile if not authenticated
router.route('/profile').get((req, res) => {
  if(!req.session.loggedIn) res.redirect('/user')
});
// Logout
router.get('/logout', function(req, res){
  let {user} = req
  console.log(user)

  console.log("its getting to logout API")
  req.session.destroy()
  res.redirect('/user')
  // if(req.session.loggedIn){
  //   console.log(req.session.email)
  //   res.write('Welcome '+req.session.email+' to your dashboard')
  //   res.end()
  // }
  // else{
  //   res.redirect('/login')
  // }

});

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
        if(user.password !== password){
          console.log("Wrong Password!")
          redir = { redirect: '/user'};
          return res.json(redir);
        } else{
          req.session.loggedIn = true;
          req.session.cookie.path = "/profile";
          req.session.email = req.body.email;
          req.session.user = user;
          // console.log(user);
          console.log("Signed in Successfully!");
          console.log(req.session.user);
          // trying to get the session data to the profile page 
          redir = { redirect: "/", status: true, userDetails: user};
          return res.json(redir);
        }
      }
    })
});

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