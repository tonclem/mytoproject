const express = require('express');
var fileUpload = require('express-fileupload');
const router = express.Router();
const fs = require('fs');
const mongo = require('mongodb');


// Encryption 
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');



router.use(fileUpload());

router.get('/', function (req, response, next) {

    var MongoClient2 = mongo.MongoClient;

    var url2 = "mongodb://localhost:27017/Toramadb";

    MongoClient2.connect(url2, (err, db) => {
        if (err) throw err;
        
        var dbo = db.db('Toramadb');
        var collections = dbo.collection('torama_users');

        collections.find({name:"Tipapa Vala"}).toArray((reserr, res) => {
            if (reserr) throw reserr;
            else if (res.length) {
                var password = cryptr.decrypt(res[0].password);
                console.log(res);
            }
            else {
                console.log("null");
                //console.log(res);
            }
        });

        db.close();
    });

    response.render('user_registration_mongo', {
        regText: 'Register Now'
    });
});



/*
Listening for post request 
*/
router.post('/', (req, res, next) => {
    var username = req.body.username;
    var phone = req.body.phone;
    var email = req.body.email;
    var password = req.body.password;
    console.log('mongo post');

    if (req.files) {

        var profilepic = req.files.file, filename = profilepic.name;
        console.log(username + ", " + password);
        var userImage = "user_images/" + filename;

        var MongoClient = mongo.MongoClient;

        //After the Port number, is the name of the Database that our required table is located.
        var url = "mongodb://localhost:27017/Toramadb";

        MongoClient.connect(url, (error, db) => {
            if (error) throw error;
            console.log('Connection Established to Mongo');

            var dbo = db.db("Toramadb");

            //First check if the collection already exists before creating it
            dbo.listCollections({ name: 'torama_users' }).next((error, collInfo) => {

                if (error) throw error;

                else if (collInfo) {
                    console.log('Collection exists');

                    const encryptedPword = cryptr.encrypt(password);
                    var obj = { name: username, email: email, password: encryptedPword, phone: phone, image: userImage };
                    dbo.collection('torama_users').insertOne(obj, (inserterr, result) => {
                        if (inserterr) throw inserterr;
                        console.log('user inserted ' + result);

                        res.render('signedup_view', {
                            username: username,
                            password: password,
                        })
                    });
                } else {

                   dbo.createCollection('torama_users', (err, result)=>{
                   })
                       
                }
                db.close();
            });

            // var obj = { student: username, street: email, city: password, state: phone, sex: userImage,gpa:"4.6" };
            // dbo.collection('students').insertOne(obj, (inserterr, result) => {
            //     if (inserterr) throw inserterr;
            //     console.log('user inserted ' + result);

            //     res.render('signedup_view', {
            //         username: username,
            //         password: password,
            //     })
            // });

           
        });
    }else{
        console.log('not file');
    }

});



module.exports = router;