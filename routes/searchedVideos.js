var express = require('express');
const Joi = require('joi');
var router = express.Router();
const walk = require('../walk.js');
var searchSync = [];

//const Logger = require('../public/javascripts/misc');
//var text = new getTexter();




//const misc = require('../public/javascripts/misc.js');

searchSync = walk.searchSync('videos');
//var searchText = misc.getText();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('searchView', { 
    videoTitle: 'Searched Videos',
    videoFiles: searchSync,
    videoDir: 'All Videos'

  });
});

router.post('/',(req,res) =>{
  // We are using the Joi Library to validate the user input 
  // Firstly we checked if the user input is a string and the char must be more than 0

  var foundVideos =[];

  const schema = {
  input_text: Joi.string().min(1).required()
};
  const text = req.body.input_text;

  Joi.validate({input_text:text},schema ,function(error, value){

    if(error){
      res.writeHead('Content-type:application/json');
      res.status(404).send(result.error);
      return;
    }else{

      searchSync.forEach(element =>{
        
        if(element.includes(value.input_text)){
          foundVideos.push(encodeURI(element));
        }
    
      });

      if(foundVideos.length === 0){
          // res.send(404, "<h3 style = 'color:black;font-size:12xp;font-style:Verdana;margin:10px 10px 20px 10px'>  No Video Found that matches the name "
          //  +value.input_text + "</h3>" +"<button class='btn btn-outline-success my-2 my-sm-0' action='http://localhost:3000/randomVideos> Go back </button>"  );
        

          res.render('notFoundView', { 
            title: 'All Videos containing '+ value.input_text ,
            videoFiles: searchSync,
            videoDir: 'Video Search'
        
          });

      }else{
      res.render('searchView', { 
        videoTitle: 'All Videos containing '+value.input_text ,
        videoFiles: foundVideos,
        videoDir: 'Video Search'
    
      });
    }
        
    }
   
  });

  

});

module.exports = router;
