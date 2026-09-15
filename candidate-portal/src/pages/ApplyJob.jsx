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


setForm(prev=>({


...prev,


[e.target.name]:e.target.value


}));


};








// ===============================
// RESUME SELECT
// ===============================

const handleResume=(e)=>{


const file=e.target.files?.[0];


if(!file)

return;




const allowed=[

"application/pdf",

"application/msword",

"application/vnd.openxmlformats-officedocument.wordprocessingml.document"

];





if(!allowed.includes(file.type)){


setError(
"Only PDF, DOC and DOCX files are allowed"
);


return;

}



if(file.size > 5 * 1024 * 1024){


setError(
"Resume must be less than 5MB"
);


return;

}





setError("");



setForm(prev=>({


...prev,


resume:file


}));


};









// ===============================
// SUBMIT
// ===============================


const handleSubmit=async(e)=>{


e.preventDefault();



setError("");




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





const data=new FormData();



data.append(
"job",
id
);



data.append(
"fullName",
form.fullName
);



data.append(
"email",
form.email
);



data.append(
"phone",
form.phone
);



data.append(
"experience",
form.experience
);



data.append(
"skills",
form.skills
);



data.append(
"coverLetter",
form.coverLetter
);



data.append(
"resume",
form.resume
);






console.log(
"JOB ID:",
id
);


console.log(
"RESUME:",
form.resume
);







const response = await api.post(

"/applications",

data,

{

headers:{

"Content-Type":

"multipart/form-data"

}

}

);






alert(

response.data.message ||

"Application submitted successfully"

);





navigate(
"/my-applications"
);




}

catch(error){



console.log(
"APPLICATION ERROR FULL:",
error.response
);



console.log(
"BACKEND MESSAGE:",
error.response?.data?.message
);



setError(

error.response?.data?.message ||

"Application failed"

);



}

finally{


setLoading(false);


}



};








return(


<div className="min-h-screen bg-gray-50 py-10">


<div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-8">



<h1 className="text-3xl font-bold mb-8">

Apply For Job

</h1>





{

error &&

<div className="bg-red-100 text-red-700 p-4 rounded-lg">

{error}

</div>


}








<form

onSubmit={handleSubmit}

className="space-y-5"

>







<input

name="fullName"

value={form.fullName}

onChange={handleChange}

placeholder="Full Name"

className="w-full border p-3 rounded-lg"

/>







<input

name="email"

type="email"

value={form.email}

onChange={handleChange}

placeholder="Email Address"

className="w-full border p-3 rounded-lg"

/>







<input

name="phone"

value={form.phone}

onChange={handleChange}

placeholder="Phone Number"

className="w-full border p-3 rounded-lg"

/>







<select

name="experience"

value={form.experience}

onChange={handleChange}

className="w-full border p-3 rounded-lg"

>


<option value="Fresher">

Fresher

</option>


<option value="0-1 Years">

0-1 Years

</option>


<option value="1-3 Years">

1-3 Years

</option>


<option value="3+ Years">

3+ Years

</option>


</select>







<input

name="skills"

value={form.skills}

onChange={handleChange}

placeholder="Skills (React, JavaScript, SQL)"

className="w-full border p-3 rounded-lg"

/>








<textarea

name="coverLetter"

value={form.coverLetter}

onChange={handleChange}

placeholder="Cover Letter"

rows="5"

className="w-full border p-3 rounded-lg"

/>









{/* RESUME */}


<div className="border rounded-lg p-5">


<h3 className="font-semibold mb-3">

Upload Resume

</h3>




<div className="flex items-center gap-3">


<Upload size={20}/>



<input

type="file"

accept=".pdf,.doc,.docx"

onChange={handleResume}

/>


</div>







{

form.resume &&


<div className="mt-3 flex gap-2 items-center text-green-600">


<FileText size={18}/>


{form.resume.name}


</div>


}





</div>








<button

disabled={loading}

className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold"

>


{

loading

?

"Submitting..."

:

"Apply Now"

}


</button>






</form>




</div>


</div>


);



}


export default ApplyJob;