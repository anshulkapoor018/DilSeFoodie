const multer = require("multer");
const path = require("path"); 
// Multer config
module.exports = multer({
  storage: multer.diskStorage({
    destination: function(req,file, cb){
      cb(null, './temp-images/')
    }
  }),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});