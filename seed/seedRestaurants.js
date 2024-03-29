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
    longitude: -74.037628, 
    thumbnail: "https://res.cloudinary.com/helpinghands101/image/upload/v1617476426/Papa_johns_i92i1b.webp"
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
    longitude: -74.0514578,
    thumbnail: "https://res.cloudinary.com/helpinghands101/image/upload/v1617476426/Vibez_oqkocy.jpg"
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
    longitude: -74.0524309,
    thumbnail: "https://res.cloudinary.com/helpinghands101/image/upload/v1617476426/Elgordo_afz6p2.png"
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
    longitude: -74.0491971,
    thumbnail: "https://res.cloudinary.com/helpinghands101/image/upload/v1617476426/the_franklin_vxsd0w.png"
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
    longitude: -74.1316417,
    thumbnail: "https://res.cloudinary.com/helpinghands101/image/upload/v1617476426/Dino_umt9i6.jpg"
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
    longitude: -74.1316417,
    thumbnail: "https://res.cloudinary.com/helpinghands101/image/upload/v1617476426/la_isla_ex2s7b.jpg"
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
    longitude: -74.0302254,
    thumbnail: "https://res.cloudinary.com/helpinghands101/image/upload/v1617476427/Ali_baba_yymx03.png"
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
    longitude: -74.032313,
    thumbnail: "https://res.cloudinary.com/helpinghands101/image/upload/v1617476426/South_street_bnby9d.jpg"
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
    longitude: -74.3132926,
    thumbnail: "https://res.cloudinary.com/helpinghands101/image/upload/v1617477180/greek_lizbsc.jpg"
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
    longitude: -74.0512955,
    thumbnail: "https://res.cloudinary.com/helpinghands101/image/upload/v1617476426/chef_jhbmob.jpg"
  }),
  new Restaurant({
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