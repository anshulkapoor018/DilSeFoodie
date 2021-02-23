const examples = require('../controllers/examples.server.controller.js'),
express = require('express'), 
router = express.Router()

const User = require('../models/User')

module.exports =(app) => {
  //Signup


  app.post('/api/account/signup', (req, res, next) => {
    const {body} = req;
    const {
      firstName,
      lastName,
      email,
      password,
    } = body; 

    if(!firstName){
      res.end({
        success: false,
        message: 'Error: First name cannot be blank.'
      });
    }

    if(!lastName){
      res.end({
        success: false,
        message: 'Error: Last name cannot be blank.'
      });
    }
      
    // TODO: perform checks for email length and characters and all
    if(!email){
      res.end({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }

    if(!password){
      res.end({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }

    //Making sure that we save our email with smaller letters
    email = email.toLowerCase();
 
    // Finding an exisiting user with same email
    User.find({
      email: email,
    }, (err, previousUsers) => {  
      if(err){
        res.end({
          success: false,
          message: 'Error: Server error.'
        });
      }else if (previousUsers.length > 0){
        res.end({
          success: false,
          message: 'Error: Account alreadu exist.'
        });
      }


      //Save the new user
      const newUser = new User();
      newUser.email = email;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if(err){
          res.end({
            success: false,
            message: 'Error: Server error.'
          });
        }
        res.end({
          success: true,
          message: 'Signed up.'
        });
      });
    })
  })
};

// router.route('/')
//   .get(examples.hello);
  
// module.exports = router;