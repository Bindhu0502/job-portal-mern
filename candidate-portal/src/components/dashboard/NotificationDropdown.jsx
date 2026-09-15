import { useState } from "react";


function NotificationDropdown({notifications}){


const [open,setOpen] = useState(false);



return (

<div className="relative">


{/* Bell Button */}

<button

onClick={()=>setOpen(!open)}

className="
relative
text-gray-600
hover:text-blue-600
text-2xl
"

>

🔔


{
notifications.length > 0 &&

<span

className="
absolute
-top-2
-right-2
bg-red-500
text-white
text-xs
rounded-full
px-2
"

>

{notifications.length}

</span>

}


</button>






{/* Dropdown */}


{

open &&

<div

className="
absolute
right-0
mt-3
w-80
bg-white
rounded-xl
shadow-xl
border
z-50
"

>


<div className="
p-4
border-b
font-bold
">

Notifications

</div>




{

notifications.length===0

?

<p className="
p-5
text-gray-500
">

No new notifications

</p>


:


notifications.map((item,index)=>(


<div

key={index}

className="
p-4
border-b
hover:bg-gray-50
"

>

<p className="font-medium">

{item.title}

</p>


<p className="
text-sm
text-gray-500
">

{item.message}

</p>


</div>


))


}



</div>


}



</div>

);


}


export default NotificationDropdown;