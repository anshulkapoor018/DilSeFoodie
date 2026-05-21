const mongoose = require('mongoose');

let connectionPromise = null;

function connectDb() {
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve(mongoose.connection);
  }

  if (!connectionPromise) {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is required');
    }

    connectionPromise = mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  }

  return connectionPromise;
}

module.exports = connectDb;
