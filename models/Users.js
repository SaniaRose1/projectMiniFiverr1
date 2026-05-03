const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:{
      type:  String,
      
    },
    skill:[String],
    rating:{
      type:Number,
      default:0
    },
    role:{
        type:String,
        enum :["poster","freelancer"],
        required:true
    }
},{timestamps:true})
module.exports = mongoose.model("User",userSchema);
