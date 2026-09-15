import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/authcontext";


function ProtectedRoute({ children }) {


const { user, loading } = useAuth();




// Wait until auth loads

if(loading){

return (

<div className="text-center py-20">

Loading...

</div>

);

}





// If user not logged in

if(!user){

return (

<Navigate

to="/login"

replace

/>

);

}





return children;


}


export default ProtectedRoute;