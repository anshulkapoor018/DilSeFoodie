const router = require('express').Router();
let Restaurant = require('../models/restaurant.model');
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
        restaurantMap.push(restaurant)
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

router.post('/', (req, res)=>{
// Add a new Restaurant

  const newRes = new Restaurant();

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

router.post('/search', (req, res)=>{
  const {body} = req
  const {
    SearchString,
  } = body;

  console.log(SearchString);
  
  Restaurant.find({
    "$or": [
      { "name" : { $regex: SearchString, $options: 'i' }},
      { "category" : { $regex: SearchString, $options: 'i' }}
    ]
  }, function (err, rest) {
    if (err) console.log(err);
    
    const redir = { redirect: "/", restDetails: rest};
    return res.json(redir);
  });
});

module.exports = router;