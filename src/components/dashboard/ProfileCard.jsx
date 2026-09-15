import React from "react";

import {
  Link
} from "react-router-dom";



function ProfileCard({ user }) {



return (


<div

className="
bg-white
dark:bg-gray-800

border
border-gray-200
dark:border-gray-700

rounded-2xl

shadow-md

p-6

transition-all
duration-300
"

>






{/* Header */}


<div

className="
flex
items-center
gap-5
"

>



{

user?.profileImage ?


<img

src={`http://localhost:5000/${user.profileImage}`}

alt="profile"

className="
w-20
h-20
rounded-full
object-cover
border-4
border-blue-500
"

/>



:


<div

className="
w-20
h-20

rounded-full

bg-blue-100
dark:bg-blue-900

flex
items-center
justify-center

text-3xl

"

>

👤

</div>


}



<div>


<h2

className="
text-xl
font-bold

text-gray-800
dark:text-white

"

>

{user?.name || "User"}

</h2>



<p

className="
text-gray-500
dark:text-gray-300

"

>

{user?.email}

</p>



</div>




</div>









{/* Details */}



<div

className="
mt-6
space-y-3

text-gray-700
dark:text-gray-300

"

>


<p>

📍

{" "}

{user?.location || "Location not added"}

</p>




<p>

🎓

{" "}

{user?.education || "Education not added"}

</p>





<p>

💼

{" "}

{user?.experience || "Experience not added"}

</p>





</div>









{/* Skills */}



<div

className="
mt-6
"

>


<h3

className="
font-semibold

text-gray-800
dark:text-white

mb-3

"

>

Skills

</h3>




<div

className="
flex
flex-wrap
gap-2

"

>


{

user?.skills?.length > 0


?


user.skills.map((skill,index)=>(


<span

key={index}

className="
bg-blue-100
dark:bg-blue-900

text-blue-700
dark:text-blue-200

px-3
py-1

rounded-full

text-sm

"

>

{skill}

</span>


))


:


<p

className="
text-gray-500
dark:text-gray-400
"

>

No skills added

</p>


}



</div>


</div>









{/* Profile Completion */}



<div

className="
mt-6
"

>


<div

className="
flex
justify-between
mb-2
"

>


<p

className="
font-semibold

text-gray-800
dark:text-white

"

>

Profile Completion

</p>



<p

className="
text-blue-600
dark:text-blue-400

font-bold

"

>

{user?.profileCompletion || 0}%

</p>


</div>







<div

className="
w-full

bg-gray-200
dark:bg-gray-700

rounded-full

h-3

"

>


<div

className="
bg-blue-600

h-3

rounded-full

transition-all

"

style={{

width:`${user?.profileCompletion || 0}%`

}}


/>



</div>



</div>









{/* Button */}



<Link

to="/edit-profile"

className="
block

mt-6

text-center

bg-blue-600

hover:bg-blue-700

text-white

py-3

rounded-lg

transition

"

>

Edit Profile

</Link>








</div>


);


}



export default ProfileCard;