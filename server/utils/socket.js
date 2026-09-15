let io;



export const initSocket=(socketServer)=>{


io = socketServer;



global.onlineUsers = new Map();




socketServer.on(

"connection",

(socket)=>{


console.log(

"Socket Connected:",

socket.id

);






socket.on(

"join",

(userId)=>{


if(!userId)

return;




global.onlineUsers.set(

userId.toString(),

socket.id

);





console.log(

"User Joined:",

userId

);



});









socket.on(

"disconnect",

()=>{



for(

const [userId,socketId]

of global.onlineUsers.entries()

){



if(socketId===socket.id){


global.onlineUsers.delete(userId);


}



}




console.log(

"Socket Disconnected:",

socket.id

);



});


});


};







export const getIO=()=>{


return io;


};