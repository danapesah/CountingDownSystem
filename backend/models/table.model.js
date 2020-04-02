const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; 
// A Mongoose schema defines the structure of the document, 
//default values, validators, etc., 
//whereas a Mongoose model provides an interface to the database for 
//creating, querying, updating, deleting records, etc
const tableSchema = new Schema({_system_info_object:{}})

const Table = mongoose.model('Table', tableSchema); 

module.exports = Table;
