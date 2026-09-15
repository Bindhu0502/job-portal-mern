import { io } from "socket.io-client";



// ===============================
// SOCKET CONFIGURATION
// ===============================


const socket = io(

"http://localhost:5000",

{


// Do not connect automatically
autoConnect:false,



// Use websocket only
transports:[

"websocket"

],



// Reconnect automatically if connection drops
reconnection:true,



// Number of reconnect attempts
reconnectionAttempts:5,



// Delay between reconnect attempts
reconnectionDelay:1000,



// Send cookies/auth if required
withCredentials:true



}

);








// ===============================
// SOCKET EVENTS (DEBUG)
// ===============================


socket.on(

"connect",

()=>{


console.log(

"✅ Socket Connected:",

socket.id

);


}

);






socket.on(

"disconnect",

(reason)=>{


console.log(

"❌ Socket Disconnected:",

reason

);


}

);







socket.on(

"connect_error",

(error)=>{


console.log(

"⚠️ Socket Connection Error:",

error.message

);


}

);








export default socket;