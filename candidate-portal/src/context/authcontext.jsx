import {
createContext,
useContext,
useEffect,
useState
} from "react";


import socket from "../socket";





const AuthContext=createContext();








export const AuthProvider=({children})=>{



const [user,setUser]=useState(null);

const [token,setToken]=useState(null);

const [loading,setLoading]=useState(true);








// ===============================
// CONNECT SOCKET
// ===============================


const connectSocket=(userData)=>{


if(!userData?._id){

return;

}






// avoid duplicate connection

if(socket.connected){


socket.emit(

"join",

userData._id

);


console.log(

"Socket already connected:",

userData._id

);


return;


}







socket.connect();






socket.once(

"connect",

()=>{


console.log(

"Socket connected:",

socket.id

);





socket.emit(

"join",

userData._id

);





console.log(

"Socket joined:",

userData._id

);



}

);





};











// ===============================
// LOAD USER SESSION
// ===============================


useEffect(()=>{



const storedUser = 

localStorage.getItem(

"user"

);





const storedToken =

localStorage.getItem(

"token"

);






if(storedUser && storedToken){


try{


const userData=

JSON.parse(

storedUser

);





setUser(userData);

setToken(storedToken);






connectSocket(userData);




}

catch(error){


console.log(

"Session Restore Error",

error

);




localStorage.removeItem(

"user"

);


localStorage.removeItem(

"token"

);



}



}





setLoading(false);






// DO NOT DISCONNECT HERE
// React StrictMode will call cleanup twice
// causing socket issues




},[]);












// ===============================
// LOGIN
// ===============================


const login=(userData,tokenData)=>{



setUser(userData);

setToken(tokenData);







localStorage.setItem(

"user",

JSON.stringify(userData)

);






localStorage.setItem(

"token",

tokenData

);






connectSocket(userData);




};











// ===============================
// LOGOUT
// ===============================


const logout=()=>{





if(socket.connected){


socket.disconnect();


}






setUser(null);

setToken(null);






localStorage.removeItem(

"user"

);




localStorage.removeItem(

"token"

);






};












// ===============================
// PROVIDER
// ===============================


return(


<AuthContext.Provider


value={


{


user,

token,

loading,

login,

logout


}


}



>


{children}


</AuthContext.Provider>


);



};












// ===============================
// CUSTOM HOOK
// ===============================


export const useAuth=()=>{



const context=

useContext(AuthContext);




if(!context){


throw new Error(

"useAuth must be used inside AuthProvider"

);


}




return context;



};