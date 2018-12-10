 function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
  
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

// SIDEBAR FUNCTION

function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "200px";

  //Push the body away when menu button is clicked
  //document.getElementById("rec-video").style.marginRight = "50%";
  //document.getElementById("rec-body").style.marginRight = "50%";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
  
  //alert('cool');
}

var clickedText = new Object();
clickedText['name'] = 'Otonye Clement';


function getTexter(message){

  message = "Hello";
  return message;
}




const EventEmitter = require('events');

class Logger extends EventEmitter{
  
  log(message){

    this.emit('textReceived',{data:1,name:'King'});
    
  }
}

function searchVideos() {

  var text = this.document.getElementById("input_text").value;
  if(text !== null){
    //alert(text);

    document.write('Searched Videos'.link('http://localhost:3000/'));
    
  }
  else{
    alert('Type please');
  }
  
}

module.exports = Logger;


// SEARCH MENU

