
var mongoose=require('mongoose');

var Schema=mongoose.Schema;
var myuser= new Schema({
	name:String,
    phno:String,
    question:String
});
module.exports=mongoose.model('faq',myuser);