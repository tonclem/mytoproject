const express = require('express');
var busboy = require('connect-busboy');
var bodyParser = require('body-parser');
var cors = require('cors');
var fileUpload = require('express-fileupload');

var multer = require('multer');

var formidable = require('formidable');

//var fsExtra = require('fs-extra');

const router = express.Router();
const fs = require('fs');

router.use(fileUpload());

router.get('/',function(req,response,next){

    response.render('uploadView',{
        uploadText: 'Upload a file'
    })
});

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./videos/java/')
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now())
    }
});

var upload = multer({storage:storage});

/*
Listening for post request on http://localhost:3000/uploadFile
*/
router.post('/',function(req,res,next){

    let videoFile = req.files.filetoupload;
    
    videoFile.mv(`./videos/java/${req.files.fileUpload.name}`,function(error){
        if(error) {
            return res.send(500,error);
        }
        else{
            res.json({file:`./videos/java/${req.files.fileUpload.name}`});
        }
    } );
    
    
//     fs.appendFile(`./videos/java/${req.file}`,req.file, function(error){
//     if(error) throw error;
//         response.send(200,'<h1 style="color:green"> File Uploaded </>');
//         console.log(req.file);
// });

// var form = new formidable.IncomingForm();
// form.parse(req, function (err, fields, file) {

//     var oldpath = file.filetoupload.path;
//       var newpath = './videos/java/' + file.filetoupload.name;
//       fs.rename(oldpath, newpath, function (err) {
//         if (err) throw err;
//         res.write('File uploaded and moved!');
//         res.end();
//       });

// });


});

module.exports = router;