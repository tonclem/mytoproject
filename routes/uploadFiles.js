const express = require('express');
var fileUpload = require('express-fileupload');

//var multer = require('multer');
//var fsExtra = require('fs-extra');

const router = express.Router();
const fs = require('fs');

router.use(fileUpload());

router.get('/',function(req,response,next){

    response.render('uploadview',{
        uploadText: 'Upload a file'
    })
});



/*
Listening for post request on http://localhost:3000/uploadFile
*/
router.post('/',function(req,res){
    
    if (req.files) {

    console.log(req.files);
      var file = req.files.filename,
       filename = file.name;
      file.mv('videos/upload/' + filename,(error)=>{
          if(error){
              res.render('error',{
                  error:error,
                  message:'No directory s such.'
              })
          }
          else{
            
            res.render('uploadview',{
                file:filename,
                status:200
            })
          }
      })
    
    }
    else{
        console.log('Not a file');
    }




});

module.exports = router;