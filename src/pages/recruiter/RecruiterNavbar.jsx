import { Link, useNavigate } from "react-router-dom";
import { UserCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

import { useAuth } from "../../context/authcontext";


function RecruiterNavbar(){


const navigate = useNavigate();


const {user,logout}=useAuth();


const [open,setOpen]=useState(false);



const handleLogout=()=>{

logout();

navigate("/login");

};




return (

<nav className="
bg-white
border-b
shadow-sm
">


<div className="
max-w-7xl
mx-auto
px-6
py-4
flex
justify-between
items-center
">


{/* Logo */}

<Link

to="/recruiter/dashboard"

className="
text-2xl
font-bold
text-blue-600
"

>

CareerHub Recruiter

</Link>





{/* Recruiter Menu */}

<div className="
flex
gap-7
font-medium
text-gray-700
">


<Link to="/recruiter/dashboard">

Dashboard

</Link>


<Link to="/recruiter/jobs">

My Jobs

</Link>


<Link to="/recruiter/create-job">

Create Job

</Link>


<Link to="/recruiter/applications">

Applications

</Link>


</div>





{/* User */}

<div className="relative">


<button

onClick={()=>setOpen(!open)}

className="
flex
items-center
gap-2
"

>


<UserCircle

size={35}

className="text-blue-600"

/>



<span>

{user?.name || "Recruiter"}

</span>


<ChevronDown size={18}/>


</button>





{

open &&

<div className="
absolute
right-0
mt-3
bg-white
border
shadow-lg
rounded-lg
w-40
p-2
">


<Link

to="/profile"

className="
block
px-3
py-2
hover:bg-gray-100
"

>

Profile

</Link>



<button

onClick={handleLogout}

className="
block
w-full
text-left
px-3
py-2
text-red-600
hover:bg-red-50
"

>

Logout

</button>



</div>


}



</div>





</div>


</nav>

);

}


export default RecruiterNavbar;