const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    port:3305,
    user: 'root',
    password: "archrhymes"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS Toramadb", (error,result)=>{
        if(error) throw error;
        console.log(result);
    });

  });

  module.exports = con;