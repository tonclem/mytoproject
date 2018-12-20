const express = require('express');
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;

// Encryption 
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');



router.get('/', (req,res,next)=>{
    res.render('login',{});
});



router.post('/', (req,res,next)=>{
    var email = req.body.email;
    var password = req.body.password;

   // console.log(email + ", " + password);

    var url = "mongodb://localhost:27017/Toramadb";

    mongoClient.connect(url, function(err, db){

        var dbo = db.db('Toramadb');
        var collections = dbo.collection('torama_users');
        var encryptedUserpassword = cryptr.encrypt(password);

        console.log("Encrypted " + encryptedUserpassword);

        /*
        Since our password changes with every encryption we command.
        We have to loop through all the emails pertaining to that user,
        and match it with the decripted password of that email.
        */
        collections.find({email:email}).toArray((error,result)=>{

            if(error) throw error;

            else if(result.length){

                result.forEach(element=>{
                    var foundEmail = element.email;
                    var foundPassword = element.password;

                    var decryptedPword = cryptr.decrypt(foundPassword);
                    if(decryptedPword === password){

                        res.render('loggedin_view',{
                            userData :element,
                            result :result
                        })

                        console.log('Decrypted ' + decryptedPword + " and user provided " + password);
                    }
                    else{

                        // Email is found but password does not match users input
                        console.log('Password not correct');
                    }

                })
        
             
            }else{

                res.render('loggedin_view',{
                    error : 'User with the provided email, not found',
                    result :result
                })
                console.log('No Value found that matches');
            }


        });
    });


});





module.exports = router;