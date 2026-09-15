import {
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";


import {
  useAuth
} from "../../context/authcontext";


import NotificationBell from "../common/NotificationBell";







function Navbar(){


const navigate = useNavigate();

const location = useLocation();



const {
logout,
user
}=useAuth();







// ===============================
// LOGOUT
// ===============================


const handleLogout=()=>{


logout();


navigate("/login");


};








// ===============================
// ACTIVE LINK
// ===============================


const activeClass=(path)=>{


return location.pathname===path

?

"text-blue-600 font-semibold"

:

"hover:text-blue-600";


};









return(



<nav className="
bg-white
shadow
border-b
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








{/* LOGO */}



<Link

to="/"

className="
text-2xl
font-bold
text-blue-600
"

>

CareerHub

</Link>









{/* MENU */}



<div className="
hidden
md:flex
gap-6
font-medium
items-center
">







{

user?.role==="recruiter"

?

<>


<Link

to="/recruiter/dashboard"

className={activeClass(
"/recruiter/dashboard"
)}

>

Dashboard

</Link>






<Link

to="/recruiter/create-job"

className={activeClass(
"/recruiter/create-job"
)}

>

Post Job

</Link>







<Link

to="/recruiter/jobs"

className={activeClass(
"/recruiter/jobs"
)}

>

My Jobs

</Link>







<Link

to="/recruiter/applications"

className={activeClass(
"/recruiter/applications"
)}

>

Applications

</Link>







<Link

to="/recruiter/profile"

className={activeClass(
"/recruiter/profile"
)}

>

Profile

</Link>



</>


:



<>


<Link

to="/"

className={activeClass("/")}

>

Home

</Link>







<Link

to="/jobs"

className={activeClass("/jobs")}

>

Jobs

</Link>







<Link

to="/dashboard"

className={activeClass("/dashboard")}

>

Dashboard

</Link>







<Link

to="/saved-jobs"

className={activeClass("/saved-jobs")}

>

Saved Jobs

</Link>







<Link

to="/my-applications"

className={activeClass("/my-applications")}

>

My Applications

</Link>







<Link

to="/profile"

className={activeClass("/profile")}

>

Profile

</Link>


</>


}





</div>












{/* RIGHT SIDE */}



<div className="
flex
items-center
gap-5
">







{/* NOTIFICATIONS */}



{

user &&

<NotificationBell/>

}









{/* USER NAME */}



{

user &&


<span

className="
font-medium
hidden
sm:block
"

>


Hi, {user.name}


</span>


}











{/* LOGOUT */}



{

user &&


<button

onClick={handleLogout}

className="
text-red-600
font-medium
hover:text-red-800
"

>

Logout

</button>


}



</div>








</div>





</nav>


);


}



export default Navbar;