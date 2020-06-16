var express = require('express');
var router = express.Router();
var bodyParser=require("body-parser");
var UserModel=require('../schema/user');
var BookingModel=require('../schema/book');
var FaqModel=require('../schema/faq');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/club7');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
console.log("connection succeeded");
});

router.use(bodyParser.json());
router.use(express.static('public'));
router.use(bodyParser.urlencoded({
extended: true
}));

router.post('/signup', function(req,res){ 
    var name = req.body.name; 
    var email =req.body.email;
    var phone=req.body.phone; 
    var pass = req.body.password; 
    var repass=req.body.re_password;

    var data = { 
        "name": name, 
        "email":email,
        "phone":phone, 
        "password":pass, 
        "repassword":repass
    
    } 
    db.collection('signup').insertOne(data,function(err, collection){
if (err) throw err;
console.log("Record inserted Successfully");

});

return res.redirect('/login.html');
})

//insert faq
router.post('/faq', function(req,res){ 
    var name = req.body.name; 
    var phone=req.body.phno; 
    var question = req.body.question; 
    

    var data = { 
        "name": name, 
        "phone":phone, 
        "question":question
    
    } 
    var data=FaqModel(data);
    data.save(function(err){
        if(err) throw err;
       console.log("We recieved your question...");
    });

return res.redirect('/index.html');
});

//insert feedback data
router.post('/insert_feedback', function(req,res){ 
    var name = req.body.name; 
    var feedback = req.body.feedback;  
    var data = { 
        "name": name, 
        "feedback":feedback
    } 

    var data=UserModel(data);
    data.save(function(err){
        if(err) throw err;
       console.log("Your feedback inserted Successfully");
    });

return res.redirect('/index.html');
});
//end of the insert feedback
router.get('/login',function(req,res,next){
    return res.render('login.html');

});


//show feed back for admin
router.get('/get_feedbackdata',function(req,res,next){
      UserModel.find(function(err,feedback){
        if(err){
            console.log(err);
        }else
        {
            res.render('feedbackdetails',{feedback:feedback});
            console.log(feedback);
        }
    });


});

//insert booking deatils
router.post('/insert_booking', function(req,res){ 
    var name = req.body.name; 
    var phone = req.body.phone;  
    var date = req.body.date;
    var  email= req.body.email;
    var number = req.body.number;
    var  time= req.body.time;
    

    var data = { 
        "name": name, 
        "phone":phone,
        "date":date,
        "email":email,
        "number":number,
        "time":time
    } 

    var data=BookingModel(data);
    data.save(function(err){
        if(err) throw err;
       console.log("Your booking data inserted Successfully");
    });

return res.redirect('/index.html');
});
    //end of the insert booking
router.get('/login',function(req,res,next){
   return res.render('login.html');

});
    //show reservations for admin
router.get('/get_booking',function(req,res,next){
   BookingModel.find(function(err,booking){
    if(err){
         console.log(err);
      }else
      {
          res.render('booking',{booking:booking});
         console.log(booking);
      }
  });

})
router.post('/login', function(req,res,next){
    db.collection('signup').findOne({email:req.body.email},
        function(err,data){
            if(data){
                if(data.password==req.body.password){
                   // req.session.userId=data.unique_id;
                    return res.redirect('/get_feedbackdata');
                }
                else{
                    res.send({"Unsuccessful":"Wrong password !"});
                }
            }
                else{
                    res.send({"Unsuccessful":"This email is not registered"});
                }
                });
            });



module.exports =router;