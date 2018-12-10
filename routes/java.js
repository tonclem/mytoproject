var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
console.log(__dirname);
var walkSync = [];
walkSync = walk.walkSync('videos/java');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('view', { 
    videoTitle: 'Java Videos',
    videoFiles: walkSync,
    videoDir: 'Java'

  });
});



module.exports = router;
