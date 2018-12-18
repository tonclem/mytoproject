const express = require('express');
var fileUpload = require('express-fileupload');
const router = express.Router();
const fs = require('fs');
const mysql = require('mysql');

//var multer = require('multer');
//var fsExtra = require('fs-extra');

var con = mysql.createConnection({
    host: "localhost",
    port: 3305,
    user: "root",
    password: "archrhymes",
    database: "Toramadb"
});



router.use(fileUpload());

router.get('/', function (req, response, next) {

    response.render('user_registration', {
        regText: 'Register Now'
    })
});

/*
Listening for post request 
*/
router.post('/', (req, res, next) => {
    var username = req.body.username;
    var phone = req.body.phone;
    var password = req.body.password;


    if (req.files) {

        var profilepic = req.files.image, filename = profilepic.name;
        console.log(username + ", " + password);
        var userImage = "user_images/" + filename;

        // CREATE A TABLE AND START INSERTING OUR USERS

        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");

            // Create the table only if it does not exists on the database
            var sql = "CREATE TABLE IF NOT EXISTS Torama_Users (id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id),name TEXT NOT NULL, phone TEXT NOT NULL, password TEXT NOT NULL,image TEXT NOT NULL)";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Table created");
            });

            // Insert user info to our table
            var sql2 = "INSERT INTO Torama_Users SET ?";
            var post = { name: username, phone: phone, password: password, image: userImage };
            con.query(sql2, post, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");

                // Insert users profile pics to user_images folder
                profilepic.mv(userImage, (error)=>{
                        if(error) throw error;
                });

                // Render user pasword to user, for login purpose
                res.render('signedup_view', {
                    username: username,
                    password: password,
                })
            });
        });
    }

});




module.exports = router;