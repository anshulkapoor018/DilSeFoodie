const router = require('express').Router();
let Restaurant = require('../models/restaurant.model');
// const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const express = require("express");
var app = express(); 



router.get('/all',
  function(req, res){
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