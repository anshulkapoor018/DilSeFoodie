const router = require('express').Router();
let Restaurant = require('../models/restaurant.model');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const express = require("express");
var app = express(); 

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(require("express-session")({ 
  secret: "DogeCoin", 
  resave: false, 
  saveUninitialized: false
}));


router.get('/all',
  function(req, res){
    Restaurant.find({}, function(err, restaurants) {
      var restaurantMap = {};
  
      restaurants.forEach(function(restaurant) {
        restaurantMap[restaurant._id] = restaurant;
      });
  
      res.send(restaurantMap);  
    });
});

router.get('/:id',
  function(req, res){
    Restaurant.findById(req.params.id, function (err, docs) { 
      if (err){
        console.log(err); 
      } else{
        console.log("Result : ", docs);
        res.send(docs)
      } 
  }); 
});

module.exports = router;