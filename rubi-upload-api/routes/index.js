var express = require('express');
var router = express.Router();
var multer =  require('multer');
var multerS3 = require('multer-s3');
var AWS = require('aws-sdk');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


var s3 = new AWS.S3({
    accessKeyId:'',
    secretAccessKey: ''
});
console.log(s3);
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'adhit-test-hacktive',
    metadata: function (req, file, cb) {
      console.log('filedname');
      console.log(file.buffer);
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

router.post("/upload", upload.single('theFile'), (req, res) => {
  console.log(req.file.buffer);
  res.status(200).send( true );
  res.end();
});

module.exports = router;
