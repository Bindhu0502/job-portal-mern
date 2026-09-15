import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../../services/api";

import { useAuth } from "../../context/authcontext";



function RecruiterLogin(){


const navigate = useNavigate();


const {login}=useAuth();



const [formData,setFormData]=useState({

email:"",

password:""

});



const [loading,setLoading]=useState(false);







const handleChange=(e)=>{


setFormData({

...formData,

[e.target.name]:e.target.value

});


};









const handleSubmit=async(e)=>{


e.preventDefault();



try{


setLoading(true);






const res = await api.post(

"/auth/login",

formData

);








const user = res.data.user;

const token = res.data.token;








console.log(
"Recruiter Login User:",
user
);


console.log(
"Recruiter Role:",
user.role
);








// Only recruiter allowed

if(user.role !== "recruiter"){


alert(

"This account is not a recruiter account"

);


return;


}









// Remove old candidate session

localStorage.removeItem("user");

localStorage.removeItem("token");

sessionStorage.removeItem("user");

sessionStorage.removeItem("token");









// Save recruiter session

login(

user,

token

);









// Redirect recruiter dashboard

setTimeout(()=>{


navigate(

"/recruiter/dashboard",

{

replace:true

}

);


},100);






}

catch(error){


console.log(

"Recruiter Login Error:",

error

);



alert(

error.response?.data?.message ||

"Login failed"

);


}

finally{


setLoading(false);


}



};









return(


<div className="
min-h-screen
flex
items-center
justify-center
bg-gray-100
">





<div className="
bg-white
p-8
rounded-xl
shadow-lg
w-full
max-w-md
">






<h1 className="
text-3xl
font-bold
mb-6
text-center
">

Recruiter Login

</h1>









<form onSubmit={handleSubmit}>


<input


name="email"


type="email"


placeholder="Recruiter Email"


value={formData.email}


onChange={handleChange}


required


className="
w-full
border
p-3
rounded-lg
mb-4
"

/>








<input


name="password"


type="password"


placeholder="Password"


value={formData.password}


onChange={handleChange}


required


className="
w-full
border
p-3
rounded-lg
mb-6
"

/>








<button


type="submit"


disabled={loading}


className="
w-full
bg-blue-600
hover:bg-blue-700
text-white
py-3
rounded-lg
disabled:bg-gray-400
"


>


{

loading

?

"Logging in..."

:

"Login"

}



</button>








</form>









<p className="
mt-5
text-center
">


New recruiter?


<Link


to="/recruiter/register"


className="
text-blue-600
ml-2
"


>

Register

</Link>


</p>







</div>





</div>


);


}



export default RecruiterLogin;