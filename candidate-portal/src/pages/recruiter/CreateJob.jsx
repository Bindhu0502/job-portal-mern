import { useState } from "react";

import {
  useNavigate
} from "react-router-dom";


import {
  Briefcase,
  MapPin,
  DollarSign
} from "lucide-react";


import api from "../../services/api";


import RecruiterLayout from "../../components/recruiter/RecruiterLayout";





function CreateJob(){


const navigate = useNavigate();




const [loading,setLoading]=useState(false);



const [formData,setFormData]=useState({

title:"",

company:"",

location:"",

jobType:"Full Time",

experience:"Fresher",

salary:"",

skills:"",

description:"",

requirements:""


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


setLoading(true);





await api.post(

"/recruiter/jobs",

{


...formData,


skills:

formData.skills

.split(",")

.map(skill=>skill.trim())

}


);





alert(

"Job created successfully"

);



navigate(

"/recruiter/jobs"

);



}

catch(error){


console.log(

"Create Job Error",

error

);



alert(

error.response?.data?.message ||

"Unable to create job"

);


}

finally{


setLoading(false);


}


};











return(


<RecruiterLayout>


<div className="max-w-4xl mx-auto">





<h1 className="text-3xl font-bold mb-8">

Create New Job

</h1>






<form

onSubmit={handleSubmit}

className="

bg-white

rounded-xl

shadow

p-8

space-y-6

"

>







<div className="grid md:grid-cols-2 gap-6">





<div>


<label className="font-semibold">

Job Title

</label>


<div className="relative mt-2">


<Briefcase

className="absolute left-3 top-3 text-gray-400"

/>


<input

name="title"

value={formData.title}

onChange={handleChange}

required

placeholder="Frontend Developer"

className="

w-full

border

rounded-lg

p-3

pl-10

"

/>


</div>


</div>









<div>


<label className="font-semibold">

Company

</label>


<input

name="company"

value={formData.company}

onChange={handleChange}

required

placeholder="Company name"

className="

w-full

border

rounded-lg

p-3

mt-2

"

/>


</div>








<div>


<label className="font-semibold">

Location

</label>


<div className="relative mt-2">


<MapPin

className="absolute left-3 top-3 text-gray-400"

/>


<input

name="location"

value={formData.location}

onChange={handleChange}

required

placeholder="Hyderabad"

className="

w-full

border

rounded-lg

p-3

pl-10

"

/>


</div>


</div>









<div>


<label className="font-semibold">

Salary

</label>


<div className="relative mt-2">


<DollarSign

className="absolute left-3 top-3 text-gray-400"

/>


<input

name="salary"

value={formData.salary}

onChange={handleChange}

placeholder="6-10 LPA"

className="

w-full

border

rounded-lg

p-3

pl-10

"

/>


</div>


</div>






</div>









<div className="grid md:grid-cols-2 gap-6">



<div>


<label className="font-semibold">

Job Type

</label>


<select

name="jobType"

value={formData.jobType}

onChange={handleChange}

className="

w-full

border

rounded-lg

p-3

mt-2

"

>


<option>

Full Time

</option>


<option>

Part Time

</option>


<option>

Internship

</option>


<option>

Contract

</option>


</select>


</div>









<div>


<label className="font-semibold">

Experience

</label>


<select

name="experience"

value={formData.experience}

onChange={handleChange}

className="

w-full

border

rounded-lg

p-3

mt-2

"

>


<option>

Fresher

</option>


<option>

1-2 Years

</option>


<option>

3-5 Years

</option>


<option>

5+ Years

</option>


</select>


</div>


</div>









<div>


<label className="font-semibold">

Skills

</label>


<input

name="skills"

value={formData.skills}

onChange={handleChange}

placeholder="React, JavaScript, MongoDB"

className="

w-full

border

rounded-lg

p-3

mt-2

"

/>


</div>









<div>


<label className="font-semibold">

Job Description

</label>


<textarea

name="description"

value={formData.description}

onChange={handleChange}

rows="5"

placeholder="Describe the job role..."

className="

w-full

border

rounded-lg

p-3

mt-2

"

/>


</div>









<div>


<label className="font-semibold">

Requirements

</label>


<textarea

name="requirements"

value={formData.requirements}

onChange={handleChange}

rows="5"

placeholder="Required qualifications..."

className="

w-full

border

rounded-lg

p-3

mt-2

"

/>


</div>









<button

disabled={loading}

className="

bg-blue-600

hover:bg-blue-700

text-white

px-8

py-3

rounded-lg

"

>


{

loading

?

"Posting..."

:

"Post Job"

}


</button>







</form>






</div>


</RecruiterLayout>


);


}



export default CreateJob;