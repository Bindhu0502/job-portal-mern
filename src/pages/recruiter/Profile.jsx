import { useEffect, useState } from "react";

import RecruiterLayout from "../../components/recruiter/RecruiterLayout";

import api from "../../services/api";




function RecruiterProfile(){



const [loading,setLoading]=useState(true);

const [saving,setSaving]=useState(false);





const [formData,setFormData]=useState({


company:"",

companyLogo:"",

companyWebsite:"",

companyLocation:"",

companyDescription:""


});









useEffect(()=>{


fetchProfile();


},[]);









// ===============================
// GET PROFILE
// ===============================


const fetchProfile=async()=>{


try{


const res = await api.get(

"/recruiter/profile"

);





const recruiter = res.data.recruiter;






setFormData({


company:recruiter.company || "",


companyLogo:recruiter.companyLogo || "",


companyWebsite:recruiter.companyWebsite || "",


companyLocation:recruiter.companyLocation || "",


companyDescription:recruiter.companyDescription || ""


});





}

catch(error){


console.log(

"Profile Fetch Error:",

error

);



alert(

"Unable to load profile"

);


}

finally{


setLoading(false);


}



};









// ===============================
// HANDLE INPUT
// ===============================


const handleChange=(e)=>{


setFormData({


...formData,


[e.target.name]:e.target.value


});


};











// ===============================
// UPDATE PROFILE
// ===============================


const handleSubmit=async(e)=>{


e.preventDefault();





try{


setSaving(true);





await api.put(

"/recruiter/profile",

formData

);







alert(

"Company profile updated successfully"

);





}

catch(error){


console.log(

"Update Profile Error:",

error

);



alert(

error.response?.data?.message ||

"Unable to update profile"

);


}

finally{


setSaving(false);


}



};









if(loading){


return(


<RecruiterLayout>


<div className="

text-center

py-20

text-xl

">


Loading Profile...


</div>



</RecruiterLayout>


);


}









return(


<RecruiterLayout>





<div className="

bg-white

rounded-xl

shadow-lg

p-8

max-w-4xl

mx-auto

">






<h1 className="

text-3xl

font-bold

mb-8

">


Company Profile


</h1>









{/* Logo Preview */}


{

formData.companyLogo &&

<div className="mb-6">


<img


src={formData.companyLogo}


alt="Company Logo"


className="

h-24

w-24

rounded-full

object-cover

border

"


/>


</div>


}









<form onSubmit={handleSubmit}>







<div className="

grid

md:grid-cols-2

gap-6

">









<div>


<label className="font-semibold">

Company Name

</label>



<input


type="text"


name="company"


value={formData.company}


onChange={handleChange}


required


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

Company Logo URL

</label>



<input


type="text"


name="companyLogo"


value={formData.companyLogo}


onChange={handleChange}


placeholder="https://logo-url.com"


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

Company Website

</label>



<input


type="text"


name="companyWebsite"


value={formData.companyWebsite}


onChange={handleChange}


placeholder="https://company.com"


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

Company Location

</label>



<input


type="text"


name="companyLocation"


value={formData.companyLocation}


onChange={handleChange}


placeholder="Hyderabad"


className="

w-full

border

rounded-lg

p-3

mt-2

"


/>



</div>










</div>









<div className="mt-6">


<label className="font-semibold">

About Company

</label>



<textarea


name="companyDescription"


rows="5"


value={formData.companyDescription}


onChange={handleChange}


placeholder="Describe your company..."


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


type="submit"


disabled={saving}


className="

mt-8

bg-blue-600

hover:bg-blue-700

text-white

px-8

py-3

rounded-lg

disabled:bg-gray-400

"


>


{


saving

?

"Saving..."

:

"Save Profile"


}



</button>









</form>






</div>






</RecruiterLayout>


);


}



export default RecruiterProfile;