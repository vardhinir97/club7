var mongoose=require('mongoose');

var Schema=mongoose.Schema;
var myuser= new Schema({
	name:String,
	feedback:String
});
module.exports=mongoose.model('feedback',myuser);