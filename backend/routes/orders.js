const router = require('express').Router();
let Order = require('../models/order.model');

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


router.post('/', (req, res)=>{
  // Adding an order to the DB

  const newOrder = new Order();

  newOrder.restaurantId = req.body.restaurantId
  newOrder.userId = req.body.userId
  newOrder.payment = req.body.payment
  newOrder.typeOfOrder = req.body.typeOfOrder
  newOrder.timeOfOrder = req.body.timeOfOrder
  newOrder.orderStatus = req.body.orderStatus


  newOrder.save((err, newOrder)=> {
    if(err){
      console.log(err)
      return res.send({
        success: false,
        message: "Failed to create the Order"
      })
    }
    else{
      return res.send({
        success: true,
        resId: newOrder.id,
        message: "Successfully placed Order"
      })
    }
  })
});


module.exports = router;