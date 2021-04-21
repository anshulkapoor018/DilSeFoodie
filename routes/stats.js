const router = require('express').Router();

// We want to import the DB modals
let Review = require('../models/review.model');
let User = require('../models/user.model');
let Order = require('../models/order.model');
let Restaurant = require('../models/restaurant.model');



// Getting the stats data from DB 
router.route('/all').post((req, res) => {  
  let Allrestr;
  let orders;
  let user1;
  let rev;
   
  Order.count({}, function(err, orders){
      if(err){
          console.log(err)
      }
      Restaurant.count({}, function(err, Allrestr){
        if(err){
          console.log(err)
        }

        User.count({}, function(err, user1){
          if(err){
            console.log(err)
          }

          Review.count({}, function(err, rev){
            if(err){
              console.log(err)
            }
            res.send({orders: orders, Allrestr: Allrestr, user1: user1, rev: rev})
          })
        })
      })
  })
})


module.exports = router;