import {
  useState
} from "react";


import {
  useParams,
  useNavigate
} from "react-router-dom";


import {
  FileText,
  Upload
} from "lucide-react";


import api from "../services/api";







function ApplyJob(){


const {id}=useParams();


const navigate=useNavigate();





const [loading,setLoading]=useState(false);

const [error,setError]=useState("");





const [form,setForm]=useState({

fullName:"",

email:"",

phone:"",

experience:"Fresher",

skills:"",

coverLetter:"",

resume:null

});









// ===============================
// INPUT CHANGE
// ===============================


const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};









// ===============================
// RESUME CHANGE
// ===============================


const handleResume=(e)=>{


const file=e.target.files[0];


if(!file){

return;

}





const allowed=[

"application/pdf",

"application/msword",

"application/vnd.openxmlformats-officedocument.wordprocessingml.document"

];





if(!allowed.includes(file.type)){


setError(

"Only PDF, DOC and DOCX files allowed"

);


return;


}





if(file.size > 5 * 1024 * 1024){


setError(

"Resume size should be less than 5MB"

);


return;


}






setError("");



setForm({

...form,

resume:file

});



};









// ===============================
// SUBMIT APPLICATION
// ===============================


const handleSubmit=async(e)=>{


e.preventDefault();





if(!id){


setError(

"Invalid Job ID"

);


return;


}






if(

!form.fullName ||

!form.email ||

!form.resume

){


setError(

"Name, Email and Resume are required"

);


return;


}







try{


setLoading(true);

setError("");





const formData=new FormData();






// IMPORTANT: JOB ID

formData.append(

"job",

id

);







formData.append(

"fullName",

form.fullName

);





formData.append(

"email",

form.email

);





formData.append(

"phone",

form.phone

);





formData.append(

"experience",

form.experience

);





formData.append(

"skills",

form.skills

);





formData.append(

"coverLetter",

form.coverLetter

);






formData.append(

"resume",

form.resume

);











const res=await api.post(

"/applications",

formData,

{

headers:{

"Content-Type":

"multipart/form-data"

}

}

);







alert(

res.data.message ||

"Application submitted successfully"

);





navigate(

"/my-applications"

);






}

catch(error){


console.log(

"APPLICATION ERROR",

error.response?.data || error

);





setError(

error.response?.data?.message ||

"Unable to submit application"

);



}

finally{


setLoading(false);


}



};











return(



<div className="
min-h-screen
bg-gray-50
py-10
">



<div className="
max-w-3xl
mx-auto
px-6
">






<h1 className="
text-3xl
font-bold
mb-8
">

Apply For Job

</h1>







<form

onSubmit={handleSubmit}

className="
bg-white
shadow
rounded-xl
p-8
space-y-6
"

>








{

error &&


<div className="
bg-red-100
text-red-700
p-3
rounded-lg
">

{error}

</div>


}








<input

name="fullName"

value={form.fullName}

onChange={handleChange}

placeholder="Full Name"

className="
w-full
border
p-3
rounded-lg
"

/>









<input

name="email"

type="email"

value={form.email}

onChange={handleChange}

placeholder="Email Address"

className="
w-full
border
p-3
rounded-lg
"

/>









<input

name="phone"

value={form.phone}

onChange={handleChange}

placeholder="Phone Number"

className="
w-full
border
p-3
rounded-lg
"

/>









<select

name="experience"

value={form.experience}

onChange={handleChange}

className="
w-full
border
p-3
rounded-lg
"

>


<option>

Fresher

</option>


<option>

0-1 Years

</option>


<option>

1-3 Years

</option>


<option>

3+ Years

</option>


</select>









<input

name="skills"

value={form.skills}

onChange={handleChange}

placeholder="Skills"

className="
w-full
border
p-3
rounded-lg
"

/>









<textarea

name="coverLetter"

value={form.coverLetter}

onChange={handleChange}

rows="5"

placeholder="Cover Letter"

className="
w-full
border
p-3
rounded-lg
"

/>









{/* RESUME */}



<div>


<label className="
font-semibold
">

Upload Resume

</label>





<div className="
border
rounded-lg
p-4
mt-2
">


<div className="
flex
items-center
gap-3
">


<Upload size={20}/>




<input

type="file"

accept=".pdf,.doc,.docx"

onChange={handleResume}

/>



</div>








{

form.resume &&


<div className="
flex
items-center
gap-2
mt-3
text-green-600
">


<FileText size={18}/>


{form.resume.name}


</div>


}



</div>



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
font-semibold
"

>


{

loading

?

"Submitting..."

:

"Submit Application"

}


</button>






</form>






</div>

</div>


);



}



export default ApplyJob;