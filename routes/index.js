var express = require('express');
var router = express.Router();
//const walk = require('../walk.js');

//var walkSync = walk.walkSync('videos');
const allVideos = require('../randomFilePicker');
var videosSync = [];

videosSync = allVideos.findVideos('videos');

console.log(__dirname);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('recommended', {
    videoTitle: 'Torama Video Portal (index)',
    lessonNumber: 'Lesson 1',
    videoDir: 'Root (videos)',
    videoFiles: videosSync,
    recommended: videosSync[3]
  });
});

module.exports = router;

