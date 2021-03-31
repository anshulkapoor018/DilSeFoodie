const router = require('express').Router();
let Review = require('../models/review.model');
let User = require('../models/user.model');

router.get('/:id',
  function(req, res){
    // Fething a review with review ID

    Review.findById(req.params.id, function (err, docs) { 
      if (err){
        console.log(err); 
      } else{
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
      return res.json(reviewsMap);
    });
});


router.post('/add', (req, res)=>{
  // Adding a review to a given restaurant.
  const newReview = new Review();

  newReview.restaurantId = req.body.restaurantId
  newReview.userId = req.body.userId
  newReview.reviewText = req.body.reviewText
  newReview.rating = req.body.rating
  User.findById(req.body.userId, function (err, user) { 
    if (err){
      return res.send({
        success: false,
        message: "Failed to add UserDetails to Review"
      })
    } else{
      var newOBJ = {
        name: user.firstName + " " + user.lastName,
        profile: user.profilePicture
      }
      // console.log(newOBJ);
      newReview.userDetails = newOBJ;
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
    } 
  });
});


module.exports = router;