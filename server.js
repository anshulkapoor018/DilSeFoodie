const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const path = require('path');
const session = require('express-session');
const chalk = require('chalk');
const connectDb = require('./config/db');
require('dotenv').config();

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

connectDb().then(() => {
  console.log(`${chalk.green('✓')} ${chalk.blue('MongoDB Connected!')}`)
}).catch((error) => {
  console.error(error);
});

const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');
const statsRouter = require('./routes/stats');
const restaurentsRouter = require('./routes/restaurants');
const reviewsRouter = require('./routes/reviews');
const foodItemsRouter = require('./routes/foodItems');

app.use('/user', usersRouter);
app.use('/order', ordersRouter);
app.use('/stats', statsRouter);
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
