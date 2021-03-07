const router = require('express').Router();
let Review = require('../models/review.model');
// const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const express = require("express");
var app = express(); 



router.get('/restaurant/:id',
  function(req, res){
    Review.find({'restaurantId': req.params.id}, function(err, reviews) {
      var reviewsMap = [];
  
      reviews.forEach(function(review) {
        reviewsMap.push(review);
      });
      // res.send(restaurantMap);  
      return res.json(reviewsMap);
    });
});

router.get('/user/:id',
  function(req, res){
    Review.find({'userId': req.params.id}, function(err, reviews) {
      var reviewsMap = [];
  
      reviews.forEach(function(review) {
        reviewsMap.push(review);
      });
      // res.send(restaurantMap);  
      return res.json(reviewsMap);
    });
});

router.get('/:id',
  function(req, res){
    Review.findById(req.params.id, function (err, docs) { 
      if (err){
        console.log(err); 
      } else{
        console.log("Result : ", docs);
        res.send(docs)
      } 
  }); 
});

module.exports = router;