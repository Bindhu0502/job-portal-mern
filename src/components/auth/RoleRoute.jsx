import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/authcontext";



function RoleRoute({children, role}){


const {
user,
loading
}=useAuth();





if(loading){


return (

<div className="
min-h-screen
flex
items-center
justify-center
">

Loading...

</div>

);


}






if(!user){


return (

<Navigate

to="/recruiter/login"

replace

/>

);


}








if(user.role !== role){



if(user.role === "candidate"){


return (

<Navigate

to="/dashboard"

replace

/>

);


}



return (

<Navigate

to="/login"

replace

/>

);


}






return children;


}



export default RoleRoute;