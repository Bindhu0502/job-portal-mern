import {
createContext,
useContext,
useEffect,
useState
} from "react";


import api from "../services/api";


import socket from "../socket";


import {
useAuth
} from "./authcontext";






const NotificationContext=createContext();








export const NotificationProvider=({children})=>{


const {user}=useAuth();



const [notifications,setNotifications]=useState([]);

const [count,setCount]=useState(0);









// =================================
// FETCH NOTIFICATIONS
// =================================


const fetchNotifications=async()=>{


try{


console.log("Fetching notifications...");



const res=await api.get(

"/notifications"

);



const data=res.data.notifications || [];



console.log(
"Notifications from backend:",
data
);





setNotifications(data);





const unread=data.filter(

notification=>

notification.isRead===false

).length;




console.log(
"Unread Count:",
unread
);





setCount(unread);



}

catch(error){


console.log(

"Fetch Notification Error:",

error.response?.data || error

);



}



};













// =================================
// SOCKET LISTENER
// =================================


useEffect(()=>{


if(!user?._id){

return;

}





fetchNotifications();






const receiveNotification=(notification)=>{


console.log(

"New Socket Notification:",

notification

);





setNotifications(prev=>[

notification,

...prev

]);





setCount(prev=>prev+1);



};







// remove old listener

socket.off(

"notification",

receiveNotification

);





socket.on(

"notification",

receiveNotification

);






return()=>{


socket.off(

"notification",

receiveNotification

);



};



},[user]);













// =================================
// MARK SINGLE READ
// =================================


const markRead=async(id)=>{


try{


console.log(

"Marking notification read:",

id

);



await api.put(

`/notifications/${id}`

);




await fetchNotifications();



}

catch(error){


console.log(

"Mark Read Error:",

error.response?.data || error

);



}



};













// =================================
// MARK ALL READ
// =================================


const markAllRead=async()=>{


try{


console.log(

"MARK ALL READ CLICKED"

);





const res=await api.put(

"/notifications/read-all"

);





console.log(

"MARK ALL RESPONSE:",

res.data

);






await fetchNotifications();





}

catch(error){



console.log(

"MARK ALL ERROR:",

error.response?.data || error

);



}



};













// =================================
// CLEAR
// =================================


const clearNotifications=()=>{


setNotifications([]);

setCount(0);


};













return(



<NotificationContext.Provider


value={


{


notifications,

count,

markRead,

markAllRead,

clearNotifications,

fetchNotifications


}


}


>


{children}


</NotificationContext.Provider>



);



};












// =================================
// CUSTOM HOOK
// =================================


export const useNotification=()=>{


const context=useContext(NotificationContext);



if(!context){


throw new Error(

"useNotification must be used inside NotificationProvider"

);


}



return context;



};