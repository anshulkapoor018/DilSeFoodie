const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const chalk = require('chalk');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://admin:2zFG0DD5vX8gHBPp@restaurant.gftqs.mongodb.net/capstone';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log(`${chalk.green('✓')} ${chalk.blue('MongoDB Connected!')}`)
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
// const ordersRouter = require('./routes/orders');
// const restaurentsRouter = require('./routes/restaurants');
// const reviewsRouter = require('./routes/reviews');

// app.use('/exercises', exercisesRouter);
app.use('/user', usersRouter);
// app.use('/order', ordersRouter);
// app.use('/restaurent', restaurentsRouter);
// app.use('/review', reviewsRouter);


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../../client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
  });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
