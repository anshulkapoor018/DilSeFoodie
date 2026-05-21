const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const connectDb = require('../config/db');
const usersRouter = require('../routes/users');
const ordersRouter = require('../routes/orders');
const statsRouter = require('../routes/stats');
const restaurantsRouter = require('../routes/restaurants');
const reviewsRouter = require('../routes/reviews');
const foodItemsRouter = require('../routes/foodItems');

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  session({
    name: 'AuthCookie',
    secret: process.env.SESSION_SECRET || 'uniqueSessionID',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(async (req, res, next) => {
  try {
    await connectDb();
    next();
  } catch (error) {
    next(error);
  }
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/api/user', usersRouter);
app.use('/api/order', ordersRouter);
app.use('/api/stats', statsRouter);
app.use('/api/restaurant', restaurantsRouter);
app.use('/api/review', reviewsRouter);
app.use('/api/menu', foodItemsRouter);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;
