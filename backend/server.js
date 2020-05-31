  
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



io.on('connection', (socket) => {
    socket.on('my other event', (data) => {
        console.log('socketData: '+JSON.stringify(data)); // reads the data a  
        io.sockets.emit("socketData", data);
      });

    console.log('made socket connection', socket.id)

     io.sockets.emit("Output from backend",socket.id);
    

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

