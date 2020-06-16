var mongoose=require('mongoose');

var Schema=mongoose.Schema;
var myuser= new Schema({
	name:String,
    phone:String,
    date:String,
    email:String,
    number:String,
    time:String


});
module.exports=mongoose.model('booking',myuser);