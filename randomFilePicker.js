

const fs = require('fs');
const path = require('path');


var findVideos = function(dir,fileList){

fileList = fileList || [];
fs.readdir(dir,function(error, files){

    if(error) throw error;
    files.forEach(function(fileElements){
       //var innerPath = path.join(dir,'/',fileElements); 

       fs.readdir(dir+'/'+fileElements, function(error2,videoFiles){

        if(error) throw error2;

        videoFiles.forEach(video =>{
        //if (!fs.statSync(fileElements+'/'+video).isDirectory()) {
           //File list is not a directory, so we push to our list
            fileList.push(encodeURI(fileElements +'/' + video));
        //  }

        });

       });


    });

});


return fileList;

};

module.exports = {findVideos};
