const Restaurant = require("../models/restaurant.model");
const User = require("../models/user.model");
const Review = require("../models/review.model");
const Order = require("../models/order.model");

const mongoose = require("mongoose");
const uri = 'mongodb+srv://admin:2zFG0DD5vX8gHBPp@restaurant.gftqs.mongodb.net/capstone-demo-test';
const chalk = require('chalk');

const rest_id = []
const user_id = []
const ord_id = []



async function seedPhase1(){
  const restaurant = [   
    new Restaurant({
      name: "Papa Johns",
      website: "papajohns.com",
      category: "Pizza",
      address: "125 18th Street",
      city: "Jersey City",
      state: "NJ",
      zip: "07307",
      latitude: 40.732628,
      longitude: -74.037628
    }),
    new Restaurant({
      name: "Vibez Juice & Vegan Cafe",
      website: "https://www.vibezjuicecafe.com/",
      category: "Juice",
      address: "83 Hutton St",
      city: "Jersey City",
      state: "NJ",
      zip: "07307",
      latitude: 40.7445109,
      longitude: -74.0514578
    }),
    new Restaurant({
      name: "El Gordo",
      website: "elgordoeats.com",
      category: "Peruvian",
      address: "291 Central Ave",
      city: "Jersey City",
      state: "NJ",
      zip: "07310",
      latitude: 40.7450379,
      longitude: -74.0524309
    }),
    new Restaurant({
      name: "The Franklin",
      website: "thefranklinjc.com",
      category: "Italian",
      address: "159 New York Ave",
      city: "Jersey City",
      state: "NJ",
      zip: "07310",
      latitude: 40.7417174,
      longitude: -74.0491971
    }),
    new Restaurant({
      name: "Dino & Harry's Steakhouse",
      website: "dinoandharrys.com",
      category: "Steak",
      address: "163 14th St",
      city: "Hoboken",
      state: "NJ",
      zip: "07310",
      latitude: 40.7228179,
      longitude: -74.1316417
    }),
    new Restaurant({
      name: "La Isla",
      website: "laislarestaurant.com",
      category: "Cuban",
      address: "104 Washington St",
      city: "Hoboken",
      state: "NJ",
      zip: "07310",
      latitude: 40.7228179,
      longitude: -74.1316417
    }),
    new Restaurant({
      name: "Ali Baba Restaurant",
      website: "hobokenalibaba.com",
      category: "Middle Eastern",
      address: "912 Washington St Ste 1",
      city: "Hoboken",
      state: "NJ",
      zip: "07310",
      latitude: 40.7477496,
      longitude: -74.0302254
    }),
    new Restaurant({
      name: "South Street Fish & Ramen Co.",
      website: "southstreet.co",
      category: "Japanese",
      address: "219 Washington St",
      city: "Hoboken",
      state: "NJ",
      zip: "07310",
      latitude: 40.7393196,
      longitude: -74.032313
    }),
    new Restaurant({
      name: "GreekTown",
      website: "greektown-hoboken.com",
      category: "Pizza",
      address: "86 Garden St",
      city: "Hoboken",
      state: "NJ",
      zip: "07310",
      latitude: 40.7369868,
      longitude: -74.3132926
    }),
    new Restaurant({
      name: "Chef Of India",
      website: "chefofindia.com",
      category: "Indian",
      address: "324 Central Ave",
      city: "Jersey City",
      state: "NJ",
      zip: "07307",
      latitude: 40.7459498,
      longitude: -74.0512955
    }),
    new Restaurant({
      name: "Karma Kafe",
      website: "http://www.karmakafe.com/",
      category: "Indian",
      address: "505 Washington St",
      city: "Hoboken",
      state: "NJ",
      zip: "07030",
      latitude: 40.742402,
      longitude: -74.0313777
    })
  ]
  

  const user = [   
    new User({
      email: "sample@gmail.com",
      firstName: "sample",
      lastName: "john",
      password: "",
      age: "29",
      city: "LA",
      state: "CA",
    }),
    new User({
      email: "joe@rogan.com",
      firstName: "Joe",
      lastName: "Rogan",
      password: "",
      age: '45',
      city: "Texas",
    }),
    new User({
      email: "popoy@thesailer.man",
      firstName: "popoy",
      lastName: "spinach",
      password: "",
      age: "129",
      city: "hollywood",
    })
  ]

//connect mongoose
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log(`${chalk.green('✓')} ${chalk.blue('MongoDB Connected!')}`);
    
    //save your data. this is an async operation
    //after you make sure you seeded all the restaurant, disconnect automatically
    restaurant.map(async (p, index) => {
        // console.log(p.id);
        // p.save();
        await p.save((err, result) => {
          console.log("Restaurant Entered")
          console.log(p.id)
          rest_id[index] =p.id
            if (index === restaurant.length - 1) {
                // console.log(p.id);
                mongoose.disconnect();
            }
        });
    });
  });
  connection.once('open', () => {
    console.log(`${chalk.green('✓')} ${chalk.blue('MongoDB Connected!')}`);
      
      user.map(async (p, index) => {
        await p.save((err, result) => {
          console.log("Users Entered")
          console.log(p.id)
          user_id[index] = p.id
          if (index === user.length - 1) {
            // console.log(p.id);
            mongoose.disconnect();
        }
        });
      });
    console.log("DONE!");
  // mongoose.disconnect();
  });

}


const order = [   
  new Order({
    restaurantId: rest_id[1],
    userId: user_id[1],
    payment: "$29",
    typeOfOrder: "LA",
    timeOfOrder: "12/14/2021",
    orderStatus: "FullFilled"
  }),
  new Order({
    restaurantId: rest_id[2],
    userId: user_id[2],
    payment: "29",
    typeOfOrder: "LA",
    timeOfOrder: "12/14/2021",
    orderStatus: "atRestaurant"
  }),  
  new Order({
    restaurantId: rest_id[3],
    userId: user_id[3],
    payment: "29",
    typeOfOrder: "LA",
    timeOfOrder: "12/14/2021",
    orderStatus: "FullFilled"
  })
]


const review = [   
  new Review({
    restaurantId: rest_id,
    userId: user_id,
    reviewText: "Good Pizza",
    rating: "5",
  }),
  new Review({
    restaurantId: rest_id,
    userId: user_id,
    reviewText: "Good burger",
    rating: "4",
  }),
  new Review({
    restaurantId: rest_id,
    userId: user_id,
    reviewText: "Really Wonderful Biriyani",
    rating: "5",
  })
]


async function seedPhase2(){

connection.once('open', () => {
  console.log(`${chalk.green('✓')} ${chalk.blue('MongoDB Connected!')}`);
  
  //save your data. this is an async operation
  //after you make sure you seeded all the restaurant, disconnect automatically
  order.map(async (p, index) => {
      await p.save((err, result) => {
        console.log("Orders Entered")

        console.log(p.id)
        ord_id[index] =p.id
          if (index === order.length - 1) {
              // console.log(p.id);
              mongoose.disconnect();
          }
      });
  });
});

connection.once('open', () => {
  console.log(`${chalk.green('✓')} ${chalk.blue('MongoDB Connected!')}`);
  review.map(async (p, index) => {
    await p.save((err, result) => {
      console.log("Review Entered")

      console.log(p.id)
      user_id[index] = p.id
      if (index === review.length - 1) {
        // console.log(p.id);
        mongoose.disconnect();
    }
    });
  });
  console.log("DONE!!!!!");
  // mongoose.disconnect();

});
}


await seedPhase1();
await seedPhase2();
