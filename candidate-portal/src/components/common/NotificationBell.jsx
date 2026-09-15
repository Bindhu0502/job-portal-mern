import {
useState
} from "react";


import {
Bell,
Check
} from "lucide-react";


import {
useNotification
} from "../../context/NotificationContext";






function NotificationBell(){


const {

notifications,

count,

markRead,

markAllRead

}=useNotification();



const [open,setOpen]=useState(false);





return(


<div className="relative">



<button

onClick={()=>setOpen(!open)}

className="relative p-2"

>


<Bell size={25}/>




{

count>0 &&


<span

className="
absolute
top-0
right-0
bg-red-600
text-white
text-xs
rounded-full
w-5
h-5
flex
items-center
justify-center
"

>

{count}

</span>


}


</button>









{

open &&



<div

className="
absolute
right-0
mt-3
w-96
bg-white
shadow-xl
rounded-xl
border
z-50
"

>



<div className="
flex
justify-between
items-center
p-4
border-b
">


<h3 className="font-bold">

Notifications

</h3>



{

count>0 &&


<button

onClick={markAllRead}

className="
text-sm
text-blue-600
"

>

Mark all read

</button>


}



</div>










<div className="
max-h-96
overflow-y-auto
">





{

notifications.length===0


?


<p className="
p-5
text-gray-500
text-center
">

No notifications

</p>



:



notifications.map(item=>(



<div

key={item._id}

onClick={()=>markRead(item._id)}

className={`

p-4
border-b
cursor-pointer

${

!item.isRead

?

"bg-blue-50"

:

"bg-white"

}

`}

>




<div className="
flex
justify-between
">


<p className="font-semibold">

{item.title}

</p>



{

item.isRead &&


<Check

size={16}

className="text-green-600"

/>


}



</div>







<p className="
text-sm
text-gray-600
mt-1
">

{item.message}

</p>






</div>



))



}





</div>






</div>



}




</div>



);


}



export default NotificationBell;