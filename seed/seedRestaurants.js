const Restaurant = require("../models/restaurant.model");
const mongoose = require("mongoose");
const uri = 'mongodb+srv://admin:2zFG0DD5vX8gHBPp@restaurant.gftqs.mongodb.net/capstone';
const chalk = require('chalk');

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

//connect mongoose
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log(`${chalk.green('✓')} ${chalk.blue('MongoDB Connected!')}`);
    
    //save your data. this is an async operation
    //after you make sure you seeded all the restaurant, disconnect automatically
    restaurant.map(async (p, index) => {
        console.log(p);
        // p.save();
        await p.save((err, result) => {
            if (index === restaurant.length - 1) {
                console.log("DONE!");
                mongoose.disconnect();
            }
        });
    });
});