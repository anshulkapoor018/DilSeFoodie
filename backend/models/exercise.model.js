// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');
// const userSchema = new Schema({
//   firstName: {
//     type: String,
//     required: true,
//     unique: false,
//     trim: true,
//     minlength: 2
//   },
//   lastName: {
//     type: String,
//     required: true,
//     unique: false,
//     trim: true,
//     minlength: 2
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     minlength: 3
//   },
//   //TODO::
//   //Using cloudinary to storage the images and using the url from cloudinary to populate the DB
//   profilePicture: {
//     type: String,
//     required: false,
//     unique: false,
//     trim: true,
//     minlength: 3
//   },
//   city: {
//     type: String,
//     required: false,
//     unique: false,
//     trim: true,
//     minlength: 3
//   },
//   state: {
//     type: String,
//     required: false,
//     unique: false,
//     trim: true,
//     minlength: 3
//   },
//   //TODO::
//   //We need to figure a way to store the age (either by birth year and datetime calculation or manually)
//   age: {
//     type: String,
//     required: false,
//     unique: false,
//     trim: true,
//     minlength: 0
//   },

//   //TODO:: This password needs to be hashed and stored in the DB
//   password: {
//     type: String,
//     required: true,
//     unique: false,
//     trim: true,
//     minlength: 6
//   },

//   //TODO: This would be an array of strings
//   reviewIds: {
//     type: Array,
//     required: false,
//     unique: false,
//     trim: false,
//     minlength: 0
//   },
//   //TODO: This would be an array of strings
//   commentIds: {
//     type: Array,
//     required: false,
//     unique: false,
//     trim: false,
//     minlength: 0
//   },
//   //TODO: This would be an array of strings
//   orderIds: {
//     type: Array,
//     required: false,
//     unique: false,
//     trim: false,
//     minlength: 0
//   },
// }, {
//   timestamps: true,
// });
// userSchema.plugin(passportLocalMongoose);
// const User = mongoose.model('User', userSchema);

// module.exports = User;