import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";


import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineLockClosed,
} from "react-icons/hi2";


import api from "../services/api";


import AuthLayout from "../components/auth/AuthLayout";
import AuthHeader from "../components/auth/AuthHeader";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import Divider from "../components/ui/Divider";
import SocialButtons from "../components/auth/SocialButtons";





function Register(){


const navigate = useNavigate();



const [loading,setLoading]=useState(false);





const [formData,setFormData]=useState({


name:"",

email:"",

password:"",

confirmPassword:"",


});







const [errors,setErrors]=useState({});









const handleChange=(e)=>{


setFormData({

...formData,

[e.target.name]:e.target.value

});




setErrors({

...errors,

[e.target.name]:""

});


};









const validateForm=()=>{


let newErrors={};




if(!formData.name.trim()){

newErrors.name="Name is required";

}




if(!formData.email.trim()){

newErrors.email="Email is required";

}




if(!formData.password){

newErrors.password="Password is required";

}




if(formData.password.length < 6){

newErrors.password =
"Password must be minimum 6 characters";

}




if(
formData.password !== formData.confirmPassword
){

newErrors.confirmPassword =
"Passwords do not match";

}





setErrors(newErrors);



return Object.keys(newErrors).length===0;



};









const handleSubmit=async(e)=>{


e.preventDefault();



if(!validateForm()) return;






try{


setLoading(true);





await api.post(

"/auth/register",

{


name:formData.name,

email:formData.email,

password:formData.password


}

);







alert(

"Registration successful. Please login."

);







navigate("/login");





}

catch(error){



console.log(error);



alert(

error.response?.data?.message ||

"Registration failed"

);



}

finally{


setLoading(false);


}



};









return (


<AuthLayout>



<AuthHeader

title="Create Account"

subtitle="Join CareerHub and find your dream job."

/>







<form onSubmit={handleSubmit}>


<AuthInput


label="Full Name"

name="name"

type="text"

placeholder="Enter your name"

value={formData.name}

onChange={handleChange}

icon={
<HiOutlineUser size={20}/>
}

error={errors.name}


/>







<AuthInput


label="Email Address"

name="email"

type="email"

placeholder="Enter your email"

value={formData.email}

onChange={handleChange}

icon={
<HiOutlineEnvelope size={20}/>
}

error={errors.email}


/>








<AuthInput


label="Password"

name="password"

type="password"

placeholder="Create password"

value={formData.password}

onChange={handleChange}

icon={
<HiOutlineLockClosed size={20}/>
}

error={errors.password}


/>









<AuthInput


label="Confirm Password"

name="confirmPassword"

type="password"

placeholder="Confirm password"

value={formData.confirmPassword}

onChange={handleChange}

icon={
<HiOutlineLockClosed size={20}/>
}

error={errors.confirmPassword}


/>









<AuthButton

type="submit"

loading={loading}

>

Create Account

</AuthButton>






</form>








<Divider/>





<SocialButtons/>









<p className="
text-center
mt-6
text-sm
text-gray-600
">


Already have an account?


<Link

to="/login"

className="
text-blue-600
font-semibold
ml-1
"

>

Login

</Link>



</p>






</AuthLayout>


);


}





export default Register;