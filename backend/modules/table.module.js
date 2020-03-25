const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//5 fileds at the exe schema
//this is all the inforamtion were gonna store about the exersices 
const tableSchema = new Schema({
    id: { type: Number, required: true },
    startHour: { type: Number, required: true },
    endHour: { type: Number, required: true },
    columID: { type: Number, required: true },
    comments: { type: String, required: true },
}, {
  timestamps: true,
});

// {id:1,title:"Event",startHour:3,endHour:4, columID:0, comments:"Dana"},

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;