const router = require('express').Router();

// We want to import the DB modals
let Review = require('../models/review.model');
let User = require('../models/user.model');
let Order = require('../models/order.model');
let Restaurant = require('../models/restaurant.model');



// Getting the stats data from DB 
router.route('/all').post((req, res) => {  
 
    var total_ords = 0;
    var total_res = 0;
    res.send({orders: "Working"})
   
    // Order.find({}, function(err, orders){
    //     if(err){
    //         console.log(err)
    //     }
    //     orders.forEach(function(order){
    //         total_ords+=1
    //     });
    // })

    // Restaurant.find({}, function(err, Allrestr){
    //     if(err){
    //       console.log(err)
    //     }
    //     Allrestr.forEach(function(k){
    //         total_res += 1
    //     })
    // })

    // console.log(total_ords, total_res)
    // res.send({orders: total_ords, Allrestr: total_res})
  })


module.exports = router;