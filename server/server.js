const path = require("path");
const express = require("express");
const publicPath = path.join(__dirname,"../public");
const socketIO = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 3000;
const app = express();
const {generate_message,generateLocation_message} = require("./utils/message");
const {isRealString} =  require("./utils/validation")
const {Users} =require("./utils/users")

const server = http.createServer(app);

var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));



io.on("connection",(socket)=>{

    
    socket.on("join",(params,callback)=>{
        if(isRealString(params.name) && isRealString(params.room)){
    
            socket.join(params.room);
            users.removeUser(socket.id);
            users.addUser(socket.id,params.name,params.room);
           
           
            io.to(params.room).emit("updateUserList",users.getUserList(params.room));
            socket.emit("newMessage",generate_message("Admin","Welcome to " + params.room));
            socket.broadcast.to(params.room).emit("newMessage",generate_message("Admin",`${params.name} has Joined`));
            

            callback();
        }
    
    else{
    callback("Name and Roomname are required");   
    }
    })



    console.log("New User connected")

    socket.on("createMessageEvent",(message,callback)=>{
        // console.log("New message from Client ",message)
        var user = users.getUser(socket.id)[0];
        // console.log(user);
        // console.log(socket.id);

        console.log(user);

        if(user && isRealString(message.text)){

             console.log("Hello");
            io.to(user.room).emit("newMessage",generate_message(user.name,message.text))
        }

        callback("This is form the server");
    })

    socket.on("create_location_message",(coords)=>{
        var user = users.getUser(socket.id)[0];
        // console.log(user)
        if(user){
       io.to(user.room).emit("newLocationMessage",generateLocation_message(user.name,coords.latitude,coords.longitude));
        }
    })
    

    socket.on("disconnect",()=>{ 
        
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit("updateUserList",users.getUserList(user.room));
            io.to(user.room).emit("newMessage",generate_message("Admin",`${user.name} has left`));
        }
        console.log("User was disconnected")
    })
})
server.listen(PORT,()=>{
    console.log(`server is up on port ${PORT}`);
})



