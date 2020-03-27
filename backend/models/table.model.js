const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; 
// A Mongoose schema defines the structure of the document, 
//default values, validators, etc., 
//whereas a Mongoose model provides an interface to the database for 
//creating, querying, updating, deleting records, etc


const tableSchema = new Schema({
  c: {  }
  //c:[],
 // resources:[],

  //  type: String,
  //  required: true,

   
      //  resources:[
      //       {title:String , key:Number},
      //  ],
      //  events:[
      //      {id:Number,title:String,startHour:Number,endHour:Number, columID:Number, comments:String } ,

      //  ]
   
}, 
{
  timestamps: true,
});

const Table = mongoose.model('Table', tableSchema); 

module.exports = Table;
