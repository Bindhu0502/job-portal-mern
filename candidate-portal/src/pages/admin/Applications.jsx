import {
  useEffect,
  useState,
} from "react";


import {
  FaTrash,
  FaSearch,
  FaFilePdf,
} from "react-icons/fa";


import {
  toast
} from "react-toastify";


import api from "../../services/api";



function Applications(){


const [applications,setApplications]=useState([]);

const [search,setSearch]=useState("");

const [loading,setLoading]=useState(true);





useEffect(()=>{

fetchApplications();

},[]);





const fetchApplications=async()=>{

try{


const res =
await api.get(
"/admin/applications"
);



setApplications(
res.data.applications || []
);



}
catch(error){

toast.error(
"Failed to load applications"
);


}

finally{

setLoading(false);

}

};







const updateStatus =
async(id,status)=>{


try{


await api.put(

`/admin/applications/${id}`,

{
status
}

);



toast.success(
"Status updated"
);



fetchApplications();



}
catch(error){

toast.error(
"Update failed"
);

}


};







const deleteApplication =
async(id)=>{


if(
!window.confirm(
"Delete application?"
)
)
return;



try{


await api.delete(

`/admin/applications/${id}`

);



setApplications(

prev =>
prev.filter(
item =>
item._id!==id
)

);



toast.success(
"Application deleted"
);



}
catch(error){

toast.error(
"Delete failed"
);

}


};








const filtered =
applications.filter(
(item)=>{


const name =
item.fullName
?.toLowerCase() || "";


const job =
item.job?.title
?.toLowerCase() || "";



return (

name.includes(
search.toLowerCase()
)

||

job.includes(
search.toLowerCase()
)

);


});






return (

<div className="space-y-6">



<h1 className="
text-3xl
font-bold
">

Applications Management

</h1>






<div className="
bg-white
shadow
rounded-xl
p-5
flex
items-center
gap-3
">


<FaSearch
className="text-gray-400"
/>


<input

placeholder="Search applicant or job..."

value={search}

onChange={
e=>setSearch(
e.target.value
)
}

className="
outline-none
w-full
"

/>


</div>








<div className="
bg-white
shadow
rounded-xl
overflow-x-auto
">


<table className="w-full">



<thead className="bg-gray-100">


<tr>


<th className="p-4 text-left">
Candidate
</th>


<th className="p-4 text-left">
Email
</th>


<th className="p-4 text-left">
Job
</th>


<th className="p-4 text-left">
Company
</th>


<th className="p-4 text-left">
Status
</th>


<th className="p-4 text-center">
Resume
</th>


<th className="p-4 text-center">
Action
</th>


</tr>


</thead>






<tbody>


{

loading ? (

<tr>

<td
colSpan="7"
className="
text-center
p-8
"
>

Loading Applications...

</td>

</tr>


)


:


filtered.map(
(application)=>(


<tr

key={application._id}

className="
border-t
hover:bg-gray-50
"

>


<td className="p-4 font-semibold">

{application.fullName}

</td>



<td className="p-4">

{application.email}

</td>



<td className="p-4">

{
application.job?.title || "-"
}

</td>



<td className="p-4">

{
application.job?.company || "-"
}

</td>





<td className="p-4">


<select

value={application.status}

onChange={
e=>
updateStatus(
application._id,
e.target.value
)
}

className="
border
rounded-lg
px-3
py-2
"


>


<option>
Applied
</option>


<option>
Under Review
</option>


<option>
Shortlisted
</option>


<option>
Interview Scheduled
</option>


<option>
Selected
</option>


<option>
Rejected
</option>


</select>


</td>







<td className="
p-4
text-center
">


<a

href={`http://localhost:5000/${application.resume}`}

target="_blank"

rel="noreferrer"

className="
bg-blue-600
text-white
px-3
py-2
rounded-lg
inline-flex
items-center
gap-2
"

>

<FaFilePdf/>

Resume

</a>


</td>







<td className="
p-4
text-center
">


<button

onClick={()=>
deleteApplication(
application._id
)
}

className="
bg-red-600
text-white
px-3
py-2
rounded-lg
"

>

<FaTrash/>

</button>


</td>





</tr>


)

)

}



</tbody>



</table>


</div>





</div>

);


}


export default Applications;