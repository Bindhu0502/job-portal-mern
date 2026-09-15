import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";


function Register(){


const navigate = useNavigate();


const [formData,setFormData]=useState({

name:"",
company:"",
email:"",
password:""

});



const handleChange=(e)=>{

setFormData({

...formData,

[e.target.name]:e.target.value

});

};





const handleSubmit=async(e)=>{


e.preventDefault();


try{


await api.post(

"/auth/recruiter-register",

formData

);



alert(
"Recruiter account created. Waiting for approval."
);



navigate("/login");



}

catch(error){


alert(

error.response?.data?.message ||

"Registration failed"

);


}


};







return (

<div className="
min-h-screen
bg-gray-50
flex
items-center
justify-center
">


<form

onSubmit={handleSubmit}

className="
bg-white
shadow
rounded-xl
p-8
w-96
"

>


<h1 className="
text-2xl
font-bold
mb-6
">

Recruiter Registration

</h1>





<input

name="name"

placeholder="Your Name"

onChange={handleChange}

className="
border
p-3
w-full
rounded
mb-3
"

/>





<input

name="company"

placeholder="Company Name"

onChange={handleChange}

className="
border
p-3
w-full
rounded
mb-3
"

/>





<input

name="email"

placeholder="Official Email"

onChange={handleChange}

className="
border
p-3
w-full
rounded
mb-3
"

/>





<input

name="password"

type="password"

placeholder="Password"

onChange={handleChange}

className="
border
p-3
w-full
rounded
mb-5
"

/>





<button

className="
bg-blue-600
text-white
w-full
py-3
rounded
"

>

Create Recruiter Account

</button>



</form>


</div>

);


}


export default Register;