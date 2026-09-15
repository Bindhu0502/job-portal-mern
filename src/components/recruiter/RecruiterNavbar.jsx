import {
  useAuth
} from "../../context/authcontext";


import {
  useNavigate
} from "react-router-dom";





function RecruiterNavbar(){


const {
user,
logout
}=useAuth();



const navigate=useNavigate();





const handleLogout=()=>{


logout();


navigate("/recruiter/login");


};







return(


<header

className="

h-16

bg-white

border-b

flex

items-center

justify-between

px-6

"

>



<h2 className="text-xl font-semibold">

Recruiter Dashboard

</h2>







<div className="flex items-center gap-4">


<div>

<p className="font-medium">

{user?.name}

</p>


<p className="text-sm text-gray-500">

{user?.company}

</p>


</div>





<button

onClick={handleLogout}

className="

text-red-600

"

>

Logout

</button>



</div>




</header>


);



}



export default RecruiterNavbar;