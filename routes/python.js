var express = require('express');
var router = express.Router();
const walk = require('../walk.js');

var walkSync = [];

walkSync = walk.walkSync('videos/python');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('view', { 
    videoTitle: 'Python Videos',
    videoFiles: walkSync,
    videoDir: 'Python'
  });
});

router.get('/api/courses', function(req, res, next) {
  res.send('Hello world');
});





module.exports = router;
