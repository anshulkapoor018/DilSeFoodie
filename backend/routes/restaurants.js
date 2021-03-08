const router = require('express').Router();
let Restaurant = require('../models/restaurant.model');
// const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const express = require("express");
var app = express(); 


router.get('/all',
  function(req, res){
    // Fetch list of all restaurants
    Restaurant.find({}, function(err, restaurants) {
      var restaurantMap = [];
  
      restaurants.forEach(function(restaurant) {
        restaurantMap.push(restaurant);
      });
  
      // res.send(restaurantMap);  
      return res.json(restaurantMap);
    });
});

router.get('/:id',
  function(req, res){
    // Fetch a specific restaurant with its ID
    Restaurant.findById(req.params.id, function (err, docs) { 
      if (err){
        console.log(err); 
      } else{
        console.log("Result : ", docs);
        res.send(docs)
      } 
  }); 
});

router.post('/', (req, res)=>{
// Add a new Restaurant

  newRes = new Restaurant();

  newRes.name = req.body.name
  newRes.website = req.body.website
  newRes.category = req.body.category
  newRes.address = req.body.address
  newRes.city = req.body.city
  newRes.state = req.body.state
  newRes.zip = req.body.zip
  newRes.latitude = req.body.latitude
  newRes.longitude = req.body.longitude
  newRes.rating = req.body.rating

  newRes.save((err, newRes)=> {
    if(err){
      console.log(err)
      return res.send({
        success: false,
        message: "Failed to create the Restaurant"
      })
    }
    else{
      return res.send({
        success: true,
        resId: newRes.id,
        message: "Successfully created restaurant"
      })
    }
  })
});


module.exports = router;