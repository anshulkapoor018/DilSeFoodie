const router = require('express').Router();
let FoodItem = require('../models/foodItem.model');

router.get('/restaurant/:id',
// Fetching Menu Items with the ID of restaurant
  function(req, res){
    FoodItem.find({'restaurantId': req.params.id}, function(err, menuItems) {
      var menuItemsMap = [];
      menuItems.forEach(function(item) {
        menuItemsMap.push(item);
      });
      return res.json(menuItemsMap);
    });
});

module.exports = router;