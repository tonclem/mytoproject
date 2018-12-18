const express = require('express');
var fileUpload = require('express-fileupload');
const router = express.Router();
const fs = require('fs');
const mongo = require('mongodb');







//router.use(fileUpload());

router.get('/', function (req, response, next) {

    var MongoClient = mongo.MongoClient;

    //After the Port number, is the name of the Database that our required table is located.
    var url = "mongodb://localhost:27017/Toramadb";

    MongoClient.connect(url, (error,db)=>{
        if(error) throw error;
        console.log('Connection Established to Mongo');

        var dbo = db.db("Toramadb");

        var collections = dbo.collection('students');
        collections.find({}).toArray((err,result)=>{
            if(err) throw err;

            else if(result.length){
                response.render('mongo_table_views', {
                    students: result
                })
            }
        });
        db.close();
    });
    
   
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