const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; 
// A Mongoose schema defines the structure of the document, 
//default values, validators, etc., 
//whereas a Mongoose model provides an interface to the database for 
//creating, querying, updating, deleting records, etc


const userSchema = new Schema({
user_info:{
    username: {
    type: String,
    required: true,
    unique: true,
    trim: true, //trim spaces at the end 
    minlength: 3 //at least 3 characters long 
  },
  password:{
    type: String,
    required: true,
    trim: true, //trim spaces at the end 
    minlength: 8 //at least 3 characters long 
  },
  permissions:{
    type: String,
    required: true,
  }
}
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema); 

module.exports = User;