var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
console.log(__dirname);
var walkSync = [];
walkSync = walk.walkSync('videos/html');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('view', { 
    videoTitle: 'HTML Videos',
    videoFiles: walkSync,
    videoDir: 'HTML'

  });
});



module.exports = router;
