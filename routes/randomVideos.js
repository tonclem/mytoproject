const express = require('express');
const router = express.Router();

const allVideos = require('../randomFilePicker');
var videosSync = [];

videosSync = allVideos.findVideos('videos');


router.get('/',(req,res,next)=>{
var url = videosSync[1];
    res.render('recommended',{
        videoTitle: 'All Videos',
        videoFiles: videosSync,
        videoDir: 'All Videos',
        recommended: url
    });

});

router.post('/',(req,response,next)=>{

    res.send('You just posted now !!');
});

module.exports = router;