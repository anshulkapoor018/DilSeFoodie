const router = require('express').Router();
const session = require('express-session');
const cors = require("cors");
let User = require('../models/user.model');
// const mongoose = require("mongoose");
// const passport = require("passport");
const bodyParser = require("body-parser");
// const LocalStrategy = require("passport-local").Strategy;
// const passportLocalMongoose =  require("passport-local-mongoose");
// Used to Encrypt Password
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const upload = require("../../utils/multer")
const cloudinary = require("../../utils/cloudinary")
const path = require("path")

const express = require("express");
var app = express(); 
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); 

// Email server and sender setup 
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dogefooddelivery@gmail.com',
    pass: 'doge2021'
  }
});
 
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

    // // TODO: perform checks for email length and characters and all
    // if(!email || email.length === ""){
    //   console.log('Error: Email cannot be blank.');
    //   var redir = {err: 'Email cannot be blank'};
    //   return res.json(redir);
    // }

    // if(!password || password.length === ""){
    //   console.log('Error: Password cannot be blank.');
    //   redir = {err: 'Password cannot be blank', redirect: "/login"};
    //   return res.json(redir);
    // }

    email = email.toLowerCase();

    User.findOne({email: email,
    }, (err, user) => {
      if(err){
        // var redir = { redirect: '/login', err: "Email does not exist"};
        
        // return res.json(redir);
        // console.log(err)
        res.send({err: err})
      }else if (!user){
        // redir = { redirect: '/login', err: 'Invalid Email'};
        // return res.json(redir);
        return res.send({ message: "Wrong Email or password combination!" })
      } 
      else {
        // console.log("User Found!");
        // Come back to this later
        
        if(!bcrypt.compareSync(password, user.password)){
          return res.send({message: "Wrong Email or password combination!", status: true})
          // console.log("Wrong Password!")
          // redir = { err: "Wrong Password", redirect: '/'};
          // return res.json(redir);
        } 
        else if(bcrypt.compareSync(password, user.password)){
          req.session.loggedIn = true;
          req.session.cookie.path = "/profile";
          req.session.email = req.body.email;
          req.session.user = user;
          // console.log(user);
          console.log("Signed in Successfully!");
          // console.log(req.session.user);
          // trying to get the session data to the profile page 
          // return res.send({user:user, redirect:'/profile'}) 
          redir = { redirect: "/", status: true, userDetails: user};
          return res.json(redir);
        }
      }
    })
});

// Update Profile data
router.route('/update_profile').post(upload, async (req, res) => {

  console.log("Request ---", req.body);
  console.log("Request file ---", req.file);
  
  const {body} = req

  console.log(req.body)
  const {
    profilePicture,
    firstName,
    lastName,
    city,
    state,
    image,
    age,
    password,
    email
  } = body
  try{
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result.secure_url)

  } catch(e){
    console.log(e)
  }

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
  if(!email || email == " " || email.length <= 4){
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
        email_use: true,
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
        var mailOptions = {
          from: 'dogefooddelivery@gmail.com',
          to: email,
          subject: 'This is a test email from the Food delivery App',
          html: `<h1>Welcome ${firstName},</h1><p>Thank you so much for signing up. We will notify you of every service we provide with real time updates.</p><br> <img src="https://images.squarespace-cdn.com/content/v1/56a2785c69a91af45e06a188/1590678823777-3UO1FH17YY3AQOY9XUXR/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UbeDbaZv1s3QfpIA4TYnL5Qao8BosUKjCVjCf8TKewJIH3bqxw7fF48mhrq5Ulr0Hg/Restaurant-Safe-Food-Delivery.png?format=2500w">`
        };
        try{

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        }
        catch(err){
          res.send({
            email: false
          })
        }
        
        console.log("Works")
        return res.send({
          success: true,
        });
      });
    });
  })
})
  
module.exports = router;