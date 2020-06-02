  
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); //helps us to connect to our mongodb database

require('dotenv').config(); //dotenv file

const app=express();
const port = process.env.PORT ||5000;

const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(cors());
app.use(express.json()); //parse jason

const uri = process.env.LOCAL_URI; //where our db is stored 
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true});
                      
const connection= mongoose.connection; 
connection.once('open', ()=>{
    console.log("MongoBD database connection established successfully" );
})


const countsRouter = require('./routes/counts');
const usersRouter = require('./routes/users');

app.use('/users', usersRouter);
app.use('/counts', countsRouter);

// app.get('/', (req, res) => {
//   res.send('<h1>Hello world</h1>');
// });


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



//Socket io

io.on('connection', (socket) => {
    socket.on('my other event', (data) => {
      socket.setSendBufferSize(20);
        console.log('socketData: '+JSON.stringify(data)); // reads the data a  
        io.sockets.emit("socketData", data);
      });

    console.log('made socket connection', socket.id)

     io.sockets.emit("Output from backend",socket.id);


     serverUDPCDRC.on('message', function(message, remote) {
        io.sockets.emit("udpCDRCMessage","CDRC Clock "+message);     
        });

      serverUDPTod.on('message', function(message, remote) {
          io.sockets.emit("udpTodMessage","Tod Clock "+message);     
        });   

    

     socket.on("message", (message)=>{
       console.log("Received: "+ message);
     // io.sockets.emit("chat", message);
      socket.broadcast.emit('message', message);
      //console.log("chat" +JSON.stringify(message)); 

    })
});

const port1 = 4000;
server.listen(port1, () => {
    console.log(`io Server Running at port ${port1}`)
  });

app.listen(port ,()=> {
    console.log( `app Server is running on port:  ${port}` ); //start the server
});