import {
  useEffect,
  useState
} from "react";


import {
  useNavigate
} from "react-router-dom";


import api from "../services/api";


import Loader from "../components/common/Loader";




function EditProfile(){


const navigate = useNavigate();




const [loading,setLoading] =
useState(true);



const [saving,setSaving] =
useState(false);



const [profileImage,setProfileImage] =
useState(null);



const [resume,setResume] =
useState(null);







const [formData,setFormData] = useState({

name:"",

phone:"",

location:"",

skills:"",

education:"",

experienceDetails:""

});







useEffect(()=>{

loadProfile();

},[]);








const loadProfile = async()=>{


try{


const res =
await api.get("/users/profile");


const user =
res.data.user || res.data;




setFormData({

name:user.name || "",

phone:user.phone || "",

location:user.location || "",

skills:
user.skills
?
user.skills.join(", ")
:
"",


education:
user.education || "",


experienceDetails:
user.experienceDetails || ""

});


}

catch(error){

console.log(
"PROFILE LOAD ERROR:",
error
);

}

finally{

setLoading(false);

}


};









const handleChange=(e)=>{


setFormData({

...formData,

[e.target.name]:
e.target.value

});


};









const handleSubmit=async(e)=>{


e.preventDefault();


try{


setSaving(true);



const data =
new FormData();



Object.keys(formData).forEach((key)=>{


data.append(

key,

formData[key]

);


});






if(profileImage){

data.append(

"profileImage",

profileImage

);

}






if(resume){

data.append(

"resume",

resume

);

}






const response = await api.put(

"/users/profile",

data,

{

headers:{

"Content-Type":
"multipart/form-data"

}

}

);





console.log(
"UPDATE RESPONSE:",
response.data
);



alert(
"Profile Updated Successfully"
);



navigate("/profile");



}


catch(error){


console.log(

"PROFILE UPDATE ERROR:",

error.response?.data || error

);


alert(

error.response?.data?.message ||

"Profile update failed"

);


}


finally{


setSaving(false);


}



};








if(loading){

return (

<div

className="
min-h-screen
flex
items-center
justify-center

bg-gray-100
dark:bg-gray-950

"

>

<Loader />

</div>

);

}









return(


<div

className="
min-h-screen

bg-gray-100
dark:bg-gray-950

py-10
px-5

transition-colors
duration-300

"

>





<div

className="
max-w-4xl
mx-auto

bg-white
dark:bg-gray-800

border
border-gray-200
dark:border-gray-700

rounded-2xl

shadow-lg

p-8

"

>







<h1

className="
text-3xl
font-bold
mb-8

text-gray-800
dark:text-white

"

>

Edit Profile

</h1>









<form

onSubmit={handleSubmit}

className="
space-y-6

"

>







{[

{
name:"name",
placeholder:"Full Name"
},

{
name:"phone",
placeholder:"Phone Number"
},

{
name:"location",
placeholder:"Location"
},

{
name:"skills",
placeholder:"Skills (React, SQL, Power BI)"
}

].map((field)=>(


<input

key={field.name}

type="text"

name={field.name}

value={formData[field.name]}

onChange={handleChange}

placeholder={field.placeholder}

className="
w-full

border
border-gray-300
dark:border-gray-600

rounded-lg

p-3

bg-white
dark:bg-gray-700

text-gray-900
dark:text-white

placeholder-gray-400
dark:placeholder-gray-300

"

/>


))}









<textarea

name="education"

value={formData.education}

onChange={handleChange}

placeholder="Education"

rows="4"

className="
w-full

border
border-gray-300
dark:border-gray-600

rounded-lg

p-3

bg-white
dark:bg-gray-700

text-gray-900
dark:text-white

"

/>









<textarea

name="experienceDetails"

value={formData.experienceDetails}

onChange={handleChange}

placeholder="Experience Details"

rows="4"

className="
w-full

border
border-gray-300
dark:border-gray-600

rounded-lg

p-3

bg-white
dark:bg-gray-700

text-gray-900
dark:text-white

"

/>









<div>


<label

className="
font-semibold
block
mb-2

text-gray-800
dark:text-white

"

>

Upload Profile Image

</label>



<input

type="file"

accept="image/png,image/jpeg,image/jpg"

onChange={(e)=>

setProfileImage(
e.target.files[0]
)

}

className="
text-gray-700
dark:text-gray-300

"

/>




{

profileImage &&


<p

className="
text-green-600
dark:text-green-400

mt-2

"

>

Selected: {profileImage.name}

</p>


}



</div>









<div>


<label

className="
font-semibold
block
mb-2

text-gray-800
dark:text-white

"

>

Upload Resume

</label>




<input

type="file"

accept=".pdf"

onChange={(e)=>

setResume(
e.target.files[0]
)

}

className="
text-gray-700
dark:text-gray-300

"

/>



</div>









<button

type="submit"

disabled={saving}

className="
bg-blue-600

hover:bg-blue-700

text-white

px-8

py-3

rounded-lg

font-semibold

transition

disabled:opacity-50

"

>


{

saving

?

"Saving..."

:

"Save Changes"

}


</button>








</form>







</div>






</div>


);


}



export default EditProfile;