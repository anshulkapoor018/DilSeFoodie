require('dotenv').config();

const mongoose = require('mongoose');
const chalk = require('chalk');
const Restaurant = require('../models/restaurant.model');
const FoodItem = require('../models/foodItem.model');
const restaurants = require('./localMenuData');

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dilsefoodie';

function menuItemFor(restaurantId, item) {
  const [name, price, imageUrl, description] = item;

  return {
    restaurantId,
    name,
    price,
    imageUrl,
    description
  };
}

async function seedLocalMenus() {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });

  console.log(`${chalk.green('✓')} ${chalk.blue('MongoDB Connected!')}`);

  let menuCount = 0;

  for (const restaurantSeed of restaurants) {
    const { menu, ...restaurantDetails } = restaurantSeed;
    const restaurant = await Restaurant.findOneAndUpdate(
      { name: restaurantDetails.name },
      { $set: restaurantDetails },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    await FoodItem.deleteMany({ restaurantId: restaurant._id.toString() });
    await FoodItem.insertMany(menu.map((item) => menuItemFor(restaurant._id.toString(), item)));
    menuCount += menu.length;

    console.log(`${chalk.green('✓')} ${restaurant.name}: ${menu.length} menu items`);
  }

  console.log(`${chalk.green('DONE')} Seeded ${restaurants.length} restaurants and ${menuCount} menu items.`);
}

seedLocalMenus()
  .catch((error) => {
    console.error(`${chalk.red('Seed failed:')} ${error.message}`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
