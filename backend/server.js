  
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); //helps us to connect to our mongodb database

require('dotenv').config(); //dotenv file

const app=express();
const port = process.env.PORT ||5000;

app.use(cors());
app.use(express.json()); //parse jason

const uri = process.env.LOCAL_URI; //where our db is stored 
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true });
                      
const connection= mongoose.connection; 
connection.once('open', ()=>{
    console.log("MongoBD database connection established successfully" );
})

app.listen(port ,()=> {
    console.log('Server is running on port:',  {port} ); //start the server
});