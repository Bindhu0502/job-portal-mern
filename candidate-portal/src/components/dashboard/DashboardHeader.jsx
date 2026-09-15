import {
  useEffect,
  useState
} from "react";


import api from "../services/api";


import NotificationDropdown from "./NotificationDropdown";





function DashboardHeader({user}){


const [notifications,setNotifications] =
useState([]);






useEffect(()=>{


fetchNotifications();


},[]);







const fetchNotifications = async()=>{


try{


const res =
await api.get(
"/notifications"
);



setNotifications(
res.data.notifications || []
);



}

catch(error){


console.log(
"Notification Error:",
error
);


}


};









return(


<div

className="
bg-white
dark:bg-gray-900

shadow-sm

border-b

border-gray-200
dark:border-gray-700

px-6

py-4

transition-colors

duration-300

"

>


<div

className="
max-w-7xl

mx-auto

flex

justify-between

items-center

"

>








{/* LEFT */}



<div>


<h1

className="
text-xl

font-bold

text-gray-800

dark:text-white

"

>

Welcome, {user?.name || "User"}

</h1>




<p

className="
text-sm

text-gray-500

dark:text-gray-400

"

>

Manage your career journey

</p>



</div>









{/* RIGHT */}



<div

className="
flex

items-center

gap-6

"

>







{/* SEARCH */}



<input

type="text"

placeholder="Search..."

className="
hidden

md:block

bg-gray-100

dark:bg-gray-700

text-gray-800

dark:text-white

placeholder-gray-500

dark:placeholder-gray-400

rounded-lg

px-4

py-2

w-52

outline-none

border

border-transparent

dark:border-gray-600

"

/>









{/* NOTIFICATION */}



<NotificationDropdown

notifications={notifications}

/>









{/* PROFILE */}



<div

className="
flex

items-center

gap-3

"

>







<div

className="
w-10

h-10

rounded-full

bg-blue-600

text-white

flex

items-center

justify-center

font-bold

"

>

{

user?.name

?

user.name.charAt(0)

:

"U"

}


</div>










<div

className="
hidden

md:block

"

>


<p

className="
font-semibold

text-gray-800

dark:text-white

"

>

{user?.name}

</p>





<p

className="
text-xs

text-gray-500

dark:text-gray-400

capitalize

"

>

{user?.role || "candidate"}

</p>



</div>







</div>









</div>








</div>



</div>


);


}



export default DashboardHeader;