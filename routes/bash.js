var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
console.log(__dirname);
var walkSync = [];
walkSync = walk.walkSync('videos/bash');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('view', { 
    videoTitle: 'Bash Videos',
    videoFiles: walkSync,
    videoDir: 'Bash'

  });
});



module.exports = router;
