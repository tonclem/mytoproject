// walk through given path to return list of files per folder

var fs = require('fs');
var path = require('path');



 
// List all files in a directory in Node.js recursively in a synchronous fashion
var walkSync = function(dir, filelist) {
  var fs = fs || require('fs'),
      files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir +'/' +file).isDirectory()) {
      // filelist = walkSync(dir + '/'+ file + '/', filelist);
      // do nothin
      ;
    }
    else {
      // filelist.push(dir+'/'+file);
      filelist.push(encodeURI(file));
      //console.log(file);
    }
  });
  return filelist;
};


var recom = function(dir,filelist) {
    var fs = fs || require('fs'),
         files = fs.readdirSync(dir);
    if (files) return files;
    else {return []}
       
}


var searchSync  = function(dir, searchedList) {
  
  const fs = require('fs');
  searchedList = searchedList || [];
  fs.readdir(dir,function(error,files)
  {

    files.forEach(elements => {
      
      fs.readdir(dir +'/' + elements,function(error2,videoList){
          if(error2)console.log(error2);
          
          videoList.forEach(function(element){
            
            searchedList.push(encodeURI(elements+"/"+element));
            //console.log(elements+"/"+element);

            
            
          });
          
          
      });

    });

  });

  return searchedList;
};




// export object containing list of directories
module.exports = {walkSync,recom,searchSync};
// test it out on home directory
// dirwalk(process.env.HOME, function(err, results) {
 // if (err) throw err;
 // console.log(results);
//});
