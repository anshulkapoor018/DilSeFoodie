const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: 'helpinghands101',
  api_key: '993289817571893',
  api_secret: 'in1phXIiVK3RhQXy8qpsgROfJDI',
}); 
module.exports = cloudinary;