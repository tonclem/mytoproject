var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
console.log(__dirname);

var walkSync = [];
walkSync = walk.walkSync('videos');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('videos', { videoTitle: 'Video Files',
    videoFiles: walkSync,
    videoDir: 'videos'

  });
});



module.exports = router;