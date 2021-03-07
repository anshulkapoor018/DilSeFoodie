const router = require('express').Router();
let Order = require('../models/order.model');
// const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const express = require("express");
var app = express(); 



router.get('/restaurant/:id',
  function(req, res){
    Order.find({'restaurantId': req.params.id}, function(err, orders) {
      var ordersMap = [];
  
      orders.forEach(function(order) {
        ordersMap.push(order);
      });
      // res.send(restaurantMap);  
      return res.json(ordersMap);
    });
});

router.get('/user/:id',
  function(req, res){
    Order.find({'userId': req.params.id}, function(err, orders) {
      var ordersMap = [];
  
      orders.forEach(function(order) {
        ordersMap.push(order);
      });
      // res.send(restaurantMap);  
      return res.json(ordersMap);
    });
});

router.get('/:id',
  function(req, res){
    Order.findById(req.params.id, function (err, docs) { 
      if (err){
        console.log(err); 
      } else{
        console.log("Result : ", docs);
        res.send(docs)
      } 
  }); 
});

router.post('/', 
  async (req, res)=>{

    let userInfo = req.body;
    console.log(userInfo);
 
    // let {
    //   email
    // } = body;


    // User.findOne({email: email,
    // }, (err, user) => {

    //  })
    res.send(req.body)
});

module.exports = router;