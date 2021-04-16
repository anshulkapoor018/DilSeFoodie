const router = require('express').Router();
const nodemailer = require("nodemailer");
let Order = require('../models/order.model');
let User = require('../models/user.model');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dogefooddelivery@gmail.com',
    pass: 'doge2021'
  }
});

router.get('/:id',
  function(req, res){
    // Fetching orders with the ID of Order

    Order.findById(req.params.id, function (err, docs) { 
      if (err){
        console.log(err); 
      } else{
        console.log("Result : ", docs);
        res.send(docs)
      } 
  }); 
});

router.get('/restaurant/:id',
// Fetching orders with the ID of restaurant
  function(req, res){
    Order.find({'restaurantId': req.params.id}, function(err, orders) {
      var ordersMap = [];
  
      orders.forEach(function(order) {
        ordersMap.push(order);
      });
      return res.json(ordersMap);
    });
});

router.get('/user/:id',
  function(req, res){
    // Fetching orders with the ID of User
    Order.find({'userId': req.params.id}, function(err, orders) {
      var ordersMap = [];
  
      orders.forEach(function(order) {
        ordersMap.push(order);
      });
      // res.send(restaurantMap);  
      return res.json(ordersMap);
    });
});


router.post('/placeOrder', (req, res)=>{
  // Adding an order to the DB

  const newOrder = new Order();

  newOrder.restaurantId = req.body.restaurantId
  newOrder.userId = req.body.userId
  newOrder.payment = req.body.payment
  newOrder.typeOfOrder = req.body.typeOfOrder
  newOrder.timeOfOrder = req.body.timeOfOrder
  newOrder.orderStatus = req.body.orderStatus
  newOrder.orderItems = req.body.orderItems


  newOrder.save((err, newOrder)=> {
    if(err){
      console.log(err)
      return res.send({
        success: false,
        message: "Failed to create the Order"
      })
    }
      User.findById(req.body.userId, function (err, user) { 
        if (err){
          return res.send({
            success: false,
            message: "Failed to Find User"
          })
        } else{
          var mailOptions = {
            from: 'dogefooddelivery@gmail.com',
            to: user.email,
            subject: 'Food Order Placed Successfully',
            html: `<h1>Hello,</h1><p>Thank you so much for Placing an Order. We will notify you of the Status of your Order -> ${newOrder._id}.</p><br> <img src="https://res.cloudinary.com/helpinghands101/image/upload/v1618546944/orderPLaced_cgpfps.jpg" width="300" height="300">`
          };
          try{
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
          }
          catch(err){
            res.send({
              email: false
            })
          }
          return res.send({
            success: true,
            resId: newOrder.id,
            message: "Successfully placed Order"
          })
        } 
      });
  })
});


module.exports = router;