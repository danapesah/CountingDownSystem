
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); //helps us to connect to our mongodb database

require('dotenv').config(); //dotenv file 

const app=express();
const port = process.env.PORT ||5000;


app.use(cors());
app.use(express.json()); //parse jason

const uri = process.env.LOCAL_URI; //where our db is stored 
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true,   useUnifiedTopology: true });
                      
const connection= mongoose.connection; 
connection.once('open', ()=>{
    console.log("MongoBD database connection established successfully" );
})


const countsRouter = require('./routes/counts');
const usersRouter = require('./routes/users');

app.use('/users', usersRouter);
app.use('/counts', countsRouter);




app.listen(port ,()=> {
    console.log('Server is running on port:',  {port} ); //start the server
});

/////////////////////////////////UDP SERVER CDRC

var PORT = 6060;

var dgram = require('dgram');
var serverUDPCDRC = dgram.createSocket('udp4');

serverUDPCDRC.bind(PORT);
serverUDPCDRC.on('listening', function() {
  var addressCDRC = serverUDPCDRC.address();
 console.log('UDP Server listening on ' + addressCDRC.address + ':' + addressCDRC.port);
});


/////////////////////////////////UDP SERVER Tod

var PORT = 6070;
var HOST = '0.0.0.0';

var dgram = require('dgram');
var serverUDPTod = dgram.createSocket('udp4');

serverUDPTod.bind(PORT);
serverUDPTod.on('listening', function() {
  var addressTod = serverUDPTod.address();
 console.log('UDP Server listening on ' + addressTod.address + ':' + addressTod.port);
});


////////////////////////////////////////
function intervalFunc() {
  console.log('Server is running on port:',  {port} );
}

setInterval(intervalFunc, 60000);
/////io

var udpCDRCMessage = "";
var udpTodMessage = "";
const serverSharon = require("http").createServer(app);
const io = require("socket.io")(serverSharon);

io.on('connection', (socket) => {
  console.log( socket.client.conn.server.clientsCount + " users connected " + socket.id );

   socket.on("update_message", (update_message, id)=>{
     console.log("Received: "+ update_message);
     io.sockets.emit('update_message', update_message, id);
  })

  socket.on("table saved to the DB", (chosen_state_id)=>{
    console.log("saved: "+ chosen_state_id);
    io.sockets.emit('table saved to the DB', chosen_state_id);
 })

 serverUDPCDRC.on('message', function(message, remote) {
   if(message != udpCDRCMessage)
   {
    io.sockets.emit("udpCDRCMessage","CDRC Clock "+message);  
    udpCDRCMessage = message;
   }  
  });

serverUDPTod.on('message', function(message, remote) {
  if(message != udpTodMessage)
  {
    io.sockets.emit("udpTodMessage","Tod Clock "+message);   
    udpTodMessage = message;
  }
  });   


});

const port1 = 4000;
serverSharon.listen(port1, () => {
    console.log(`io Server Running at port ${port1}`)
  });
///////