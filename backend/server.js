  
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); //helps us to connect to our mongodb database

require('dotenv').config(); //dotenv file

const app=express();
const port = process.env.PORT ||5000;

/////io
const serverSharon = require("http").createServer(app);
const io = require("socket.io")(serverSharon);

io.on('connection', (socket) => {
  console.log('made socket connection', socket.id)
   socket.on("update_message", (update_message)=>{
     console.log("Received: "+ update_message);
     io.sockets.emit('update_message', update_message);
  })

  socket.on("table saved to the DB", (chosen_state_id)=>{
    console.log("saved: "+ chosen_state_id);
    io.sockets.emit('table saved to the DB', chosen_state_id);
 })


});

const port1 = 4000;
serverSharon.listen(port1, () => {
    console.log(`io Server Running at port ${port1}`)
  });
///////
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


//////UDP PACKETS

var PORT = 6060;
var HOST = '0.0.0.0';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.bind(PORT);

server.on('listening', function() {
  var address = server.address();
 console.log('UDP Server listening on ' + address.address + ':' + address.port);
});

server.on('message', function(message, remote) {
    console.log("IN");
 console.log(remote.address + ':' + remote.port +' - ' + message);
});
