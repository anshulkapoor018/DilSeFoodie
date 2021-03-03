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
        
    });






router.get('/:id',
    function(req, res){
        
    });


module.exports = router;