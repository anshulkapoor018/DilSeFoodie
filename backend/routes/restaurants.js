const router = require('express').Router();
let Restaurant = require('../models/restaurant.model');
// const mongoose = require("mongoose");
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
      var restaurantMap = [];
  
      restaurants.forEach(function(restaurant) {
        restaurantMap.push(restaurant);
      });
  
      // console.log(restaurantMap);  
      return res.json(restaurantMap);
    });
});

router.get('/:id',
  function(req, res){
    Restaurant.findById(req.params.id, function (err, restaurant) { 
      if (err){
        console.log(err); 
      } else{
        return res.json(restaurant)
      } 
  }); 
});

module.exports = router;