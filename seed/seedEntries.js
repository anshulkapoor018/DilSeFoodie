const Restaurant = require("../models/restaurant.model");
const User = require("../models/user.model");
const Review = require("../models/review.model");
const Order = require("../models/order.model");


const mongoose = require("mongoose");
const chalk = require('chalk');

const uri = 'mongodb+srv://admin:2zFG0DD5vX8gHBPp@restaurant.gftqs.mongodb.net/capstone';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log(`${chalk.green('✓')} ${chalk.blue('MongoDB Connected!')}`)
})

let rest_id = []

// Data 
let restaurant = {
  1: {
    name: "Papa Johns",
    website: "papajohns.com",
    category: "Pizza",
    address: "125 18th Street",
    city: "Jersey City",
    state: "NJ",
    zip: "07307",
    latitude: 40.732628,
    longitude: -74.037628, 
    thumbnail: "https://res.cloudinary.com/helpinghands101/image/upload/v1617476426/Papa_johns_i92i1b.webp"
  },
  2: {
    name: "Vibez Juice & Vegan Cafe",
    website: "https://www.vibezjuicecafe.com/",
    category: "Juice",
    address: "83 Hutton St",
    city: "Jersey City",
    state: "NJ",
    zip: "07307",
    latitude: 40.7445109,
    longitude: -74.0514578,
    thumbnail: "https://res.cloudinary.com/helpinghands101/image/upload/v1617476426/Vibez_oqkocy.jpg"
  },
  3: {
    name: "El Gordo",
    website: "elgordoeats.com",
    category: "Peruvian",
    address: "291 Central Ave",
    city: "Jersey City",
    state: "NJ",
    zip: "07310",
    latitude: 40.7450379,
    longitude: -74.0524309,
    thumbnail: "https://res.cloudinary.com/helpinghands101/image/upload/v1617476426/Elgordo_afz6p2.png"
  },
  4: {
    name: "The Franklin",
    website: "thefranklinjc.com",
    category: "Italian",
    address: "159 New York Ave",
    city: "Jersey City",
    state: "NJ",
    zip: "07310",
    latitude: 40.7417174,
    longitude: -74.0491971,
    thumbnail: "https://res.cloudinary.com/helpinghands101/image/upload/v1617476426/the_franklin_vxsd0w.png"
  },
  5: {
    name: "Dino & Harry's Steakhouse",
    website: "dinoandharrys.com",
    category: "Steak",
    address: "163 14th St",
    city: "Hoboken",
    state: "NJ",
    zip: "07310",
    latitude: 40.7228179,
    longitude: -74.1316417,
    thumbnail: "https://res.cloudinary.com/helpinghands101/image/upload/v1617476426/Dino_umt9i6.jpg"
  },
  6: {
    name: "La Isla",
    website: "laislarestaurant.com",
    category: "Cuban",
    address: "104 Washington St",
    city: "Hoboken",
    state: "NJ",
    zip: "07310",
    latitude: 40.7228179,
    longitude: -74.1316417,
    thumbnail: "https://res.cloudinary.com/helpinghands101/image/upload/v1617476426/la_isla_ex2s7b.jpg"
  },
  7: {
    name: "Ali Baba Restaurant",
    website: "hobokenalibaba.com",
    category: "Middle Eastern",
    address: "912 Washington St Ste 1",
    city: "Hoboken",
    state: "NJ",
    zip: "07310",
    latitude: 40.7477496,
    longitude: -74.0302254,
    thumbnail: "https://res.cloudinary.com/helpinghands101/image/upload/v1617476427/Ali_baba_yymx03.png"
  },
  8: {
    name: "South Street Fish & Ramen Co.",
    website: "southstreet.co",
    category: "Japanese",
    address: "219 Washington St",
    city: "Hoboken",
    state: "NJ",
    zip: "07310",
    latitude: 40.7393196,
    longitude: -74.032313,
    thumbnail: "https://res.cloudinary.com/helpinghands101/image/upload/v1617476426/South_street_bnby9d.jpg"
  },
  9: {
    name: "GreekTown",
    website: "greektown-hoboken.com",
    category: "Pizza",
    address: "86 Garden St",
    city: "Hoboken",
    state: "NJ",
    zip: "07310",
    latitude: 40.7369868,
    longitude: -74.3132926,
    thumbnail: "https://res.cloudinary.com/helpinghands101/image/upload/v1617477180/greek_lizbsc.jpg"
  },
  10: {
    name: "Chef Of India",
    website: "chefofindia.com",
    category: "Indian",
    address: "324 Central Ave",
    city: "Jersey City",
    state: "NJ",
    zip: "07307",
    latitude: 40.7459498,
    longitude: -74.0512955,
    thumbnail: "https://res.cloudinary.com/helpinghands101/image/upload/v1617476426/chef_jhbmob.jpg"
  },
  11: {
    name: "Karma Kafe",
    website: "http://www.karmakafe.com/",
    category: "Indian",
    address: "505 Washington St",
    city: "Hoboken",
    state: "NJ",
    zip: "07030",
    latitude: 40.7423915,
    longitude: -74.0313059,
    thumbnail: "https://res.cloudinary.com/helpinghands101/image/upload/v1617476426/Karma_ejgadz.jpg"
  }
}  

// let users = {
//   1: {
//       email: "sample@gmail.com",
//       firstName: "sample",
//       lastName: "john",
//       password: "ABCDEFG",
//       age: "29",
//       city: "los angeles",
//       state: "cali",
//      },
//   2: {
//       email: "joe@rogan.com",
//       firstName: "Joe",
//       lastName: "Rogan",
//       password: "abcdefghijk",
//       age: '45',
//       city: "Texas",
//       state: "texas",
//      },
//   3: {
//       email: "popoy@thesailer.man",
//       firstName: "popoy",
//       lastName: "spinach",
//       password: "abcdefghijk",
//       age: "129",
//       city: "hollywood",
//       state: "New York"
//      },
//   4: {
//       email: "ibezim@gmail.com",
//       firstName: "Dennis",
//       lastName: "Ibezimlll",
//       password: "$2b$10$dsg1ZhZpaWpmvYxh8ELFS.9FDPGMeSx7boTYL3SCJJjAZnKp9ROEa",
//       age: "89",
//       city: "jj",
//       state: "New York"
//      },
//   5: {
//       email: "hello@gmail.com",
//       firstName: "Django",
//       lastName: "Kapoor",
//       password: "000000",
//       age: "22",
//       city: "hollywood",
//       state: "New York"
//      },
//   6: {
//       email: "popoy@thesailer.man",
//       firstName: "popoy",
//       lastName: "spinach",
//       password: "abcdefghijk",
//       age: "129",
//       city: "hollywood",
//       state: "New York"
//      },
//   7: {
//       email: "popoy@thesailer.man",
//       firstName: "popoy",
//       lastName: "spinach",
//       password: "abcdefghijk",
//       age: "129",
//       city: "hollywood",
//       state: "New York"
//      },
//   8: {
//       email: "popoy@thesailer.man",
//       firstName: "popoy",
//       lastName: "spinach",
//       password: "abcdefghijk",
//       age: "129",
//       city: "hollywood",
//       state: "New York"
//      },
//   9: {
//       email: "popoy@thesailer.man",
//       firstName: "popoy",
//       lastName: "spinach",
//       password: "abcdefghijk",
//       age: "129",
//       city: "hollywood",
//       state: "New York"
//      },
//   10: {
//       email: "popoy@thesailer.man",
//       firstName: "popoy",
//       lastName: "spinach",
//       password: "abcdefghijk",
//       age: "129",
//       city: "hollywood",
//       state: "New York"
//      }
// }

// const connection = mongoose.connection;
// DB function with async function
async function loadDB (where, params){

  let newRes = {}
  if (where === 'rest'){
      newRes = new Restaurant({
      name: params['name'],
      website: params['website'],
      category: params['category'],
      address: params['address'],
      city: params['city'],
      state: params['state'],
      zip: params['zip'],
      latitude: params['latitude'],
      longitude: params['longitude'],
      thumbnail: params['thumbnail']
    })
  }
  if (where === 'user'){
    newRes = new User({
      email: params['email'],
      firstName: params['firstName'],
      lastName: params['lastName'],
      password: params['password'],
      age: params['age'],
      city: params['city'],
      state: params['state']
    })
  }
  if (where === 'orders'){
    newRes = new Order({
      restaurantId: params["restaurantId"],
      userId: params["userId"],
      payment: params["payment"],
      typeOfOrder: params["typeOfOrder"],
      timeOfOrder: params["timeOfOrder"],
      orderStatus: params["orderStatus"]  
    }) 
  }
  if (where === 'reviews'){
    newRes = new Review({
      restaurantId: params["restaurantId"],
      userId: params["userId"],
      reviewText: params["reviewText"],
      rating: params["rating"], 
      userDetails: params["userDetails"]
    }) 
  }
  await newRes.save((err, newRes) =>{
    if(err){
      console.log(err)
    }
    else if(newRes){
      console.log("Restaurant added -> " + newRes.name)
    }
  })
  return newRes.id
}

async function allthepushs (){
  for ( let key in restaurant){

  const userMap = [];
  const userIDMap = [];
    await User.find({}, function(err, users) {
      users.forEach(function(user) {
        var newOBJ = {
          name: user.firstName + " " + user.lastName,
          profile: user.profilePicture
        }
        userIDMap.push(user._id);
        userMap.push(newOBJ);
      });
    });

    rest_id = await loadDB('rest',restaurant[key]) 
    let users_id = await userMap[key]
    let users_id_order = await userIDMap[key]
    console.log(users_id)
    // users_id = await loadDB('user',users[key]) 

  if (rest_id && users_id && users_id_order){
    // do something 
    // console.log(result)
    orders[key].restaurantId = rest_id
    orders[key].userId = users_id_order

    await loadDB('orders',orders[key])
    
    reviews[key].restaurantId = rest_id
    reviews[key].userId = users_id_order
    reviews[key].userDetails = users_id
    
    await loadDB('reviews',reviews[key])
  }
}
}

allthepushs()

let orders = {
  1: { 
      payment: "$29",
      typeOfOrder: "Pickup",
      timeOfOrder: "12/14/2020",
      orderStatus: "FullFilled"
  },
  2: {
      payment: "$59",
      typeOfOrder: "Pickup",
      timeOfOrder: "01/04/2020",
      orderStatus: "atRestaurant"
  },  
  3: {
      payment: "$21",
      typeOfOrder: "Delivery",
      timeOfOrder: "12/01/2020",
      orderStatus: "FullFilled"
  },
  4: { 
      payment: "$12",
      typeOfOrder: "Delivery",
      timeOfOrder: "22/02/2021",
      orderStatus: "FullFilled"
  },
  5: {
      payment: "$420",
      typeOfOrder: "Delivery",
      timeOfOrder: "30/12/2020",
      orderStatus: "atRestaurant"
  },  
  6: {
      payment: "$69",
      typeOfOrder: "Pickup",
      timeOfOrder: "11/03/2021",
      orderStatus: "FullFilled"
  }, 
  7: { 
      payment: "$9",
      typeOfOrder: "Delivery",
      timeOfOrder: "09/03/2021",
      orderStatus: "FullFilled"
  },
  8: {
      payment: "$3",
      typeOfOrder: "Delivery",
      timeOfOrder: "25/02/2021",
      orderStatus: "atRestaurant"
  },  
  9: {
      payment: "$242",
      typeOfOrder: "Pickup",
      timeOfOrder: "16/06/2020",
      orderStatus: "FullFilled"
  },
  10: {
      payment: "$33",
      typeOfOrder: "Delivery",
      timeOfOrder: "25/06/2020",
      orderStatus: "FullFilled"
  }
}

let reviews= { 
  1: {
    reviewText: "Good Pizza",
    rating: "5",
  },
  2: {
    reviewText: "Good burger",
    rating: "4",
  },
  3: {
    reviewText: "Really Wonderful Biriyani",
    rating: "5",
  },
  4: {
    reviewText: "Good Pizza",
    rating: "5",
  },
  5: {
    reviewText: "Good burger",
    rating: "4",
  },
  6: {
    reviewText: "Really Wonderful Biriyani",
    rating: "5",
  },  
  7: {
    reviewText: "Good Pizza",
    rating: "5",
  },
  8: {
    reviewText: "Good burger",
    rating: "4",
  },
  9: {
    reviewText: "Really Wonderful Biriyani",
    rating: "5",
  },
  10: {
    reviewText: "Really Wonderful Biriyani",
    rating: "5",
  }
}
