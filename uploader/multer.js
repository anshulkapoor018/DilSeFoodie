const multer = require("multer");

//specify the storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "./temp-images")
    },
    filename:function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
})

//file validation
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }
    else{
        //prevent upload
        cb({message: 'Unsupported File Format'}, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024},
    file: fileFilter
})

module.exports = upload;  