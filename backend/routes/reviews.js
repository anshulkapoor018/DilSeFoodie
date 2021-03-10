const router = require('express').Router();
let Review = require('../models/review.model');

router.get('/:id',
  function(req, res){
    // Fething a review with review ID

    Review.findById(req.params.id, function (err, docs) { 
      if (err){
        console.log(err); 
      } else{
        console.log("Result : ", docs);
        res.send(docs)
      } 
  }); 
});

router.get('/restaurant/:id',
  function(req, res){
    // Fething a review with restaurant ID
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
    // Fething a review with user ID
    Review.find({'userId': req.params.id}, function(err, reviews) {
      var reviewsMap = [];
  
      reviews.forEach(function(review) {
        reviewsMap.push(review);
      });
      // res.send(restaurantMap);  
      return res.json(reviewsMap);
    });
});


router.post('/', (req, res)=>{
  // Adding a review to a given restaurant.
  const newReview = new Review();

  newReview.restaurantId = req.body.restaurantId
  newReview.userId = req.body.userId
  newReview.reviewText = req.body.reviewText
  newReview.rating = req.body.rating

  newReview.save((err, newReview)=> {
    if(err){
      console.log(err)
      return res.send({
        success: false,
        message: "Failed to add Review"
      })
    }
    else{
      return res.send({
        success: true,
        resId: newReview.id,
        message: "Successfully Added Review"
      })
    }
  })
});


module.exports = router;