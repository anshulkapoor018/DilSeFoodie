const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const path = require('path');
const session = require('express-session');
const chalk = require('chalk');
require('dotenv').config();


// const multerHelper = require('utils/multer');
// const cloudinaryHelper = require('utils/cloudinary');
// const fs = require('fs')


app.use(cors());
app.use(express.json());

app.use(
  session({
      name: 'AuthCookie',
      secret: 'uniqueSessionID',
      resave: false,
      saveUninitialized: true
  })
);

const uri = 'mongodb+srv://admin:2zFG0DD5vX8gHBPp@restaurant.gftqs.mongodb.net/capstone';

mongoose.connect(process.env.MONGODB_URI || uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log(`${chalk.green('✓')} ${chalk.blue('MongoDB Connected!')}`)
})

const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');
const restaurentsRouter = require('./routes/restaurants');
const reviewsRouter = require('./routes/reviews');
const foodItemsRouter = require('./routes/foodItems');

app.use('/user', usersRouter);
app.use('/order', ordersRouter);
app.use('/restaurant', restaurentsRouter);
app.use('/review', reviewsRouter);
app.use('/menu', foodItemsRouter);

app.use(express.static('client/build/'));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, function () {
  console.log(`${chalk.green(`Server is running on port: `)} ${chalk.blue((PORT))}`);
  if (process && process.send) {
    process.send({done: true});
  }
});