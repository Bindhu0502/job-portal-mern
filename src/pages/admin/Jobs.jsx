import {
useEffect,
useState
} from "react";


import {
FaTrash,
FaCheck,
FaBan,
FaSearch
} from "react-icons/fa";


import {
toast
} from "react-toastify";


import api from "../../services/api";



function Jobs(){


const [jobs,setJobs]=useState([]);

const [search,setSearch]=useState("");

const [loading,setLoading]=useState(true);





useEffect(()=>{

fetchJobs();

},[]);





const fetchJobs=async()=>{


try{


const res =
await api.get(
"/admin/jobs"
);



setJobs(
res.data.jobs || []
);



}

catch(error){

console.log(error);

toast.error(
"Failed to load jobs"
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

`/admin/jobs/${id}/status`,

{
status
}

);



toast.success(
"Job status updated"
);



fetchJobs();



}
catch(error){

toast.error(
"Unable to update status"
);

}


};







const deleteJob =
async(id)=>{


if(
!window.confirm(
"Delete this job?"
)
)
return;



try{


await api.delete(

`/admin/jobs/${id}`

);



setJobs(

prev =>
prev.filter(
job =>
job._id!==id
)

);



toast.success(
"Job deleted"
);


}
catch(error){

toast.error(
"Delete failed"
);


}


};






const filteredJobs =
jobs.filter(
(job)=>

job.title
?.toLowerCase()
.includes(
search.toLowerCase()
)

);






return (

<div className="space-y-6">


<h1 className="
text-3xl
font-bold
">

Jobs Management

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


<FaSearch/>


<input

placeholder="Search jobs..."

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
rounded-xl
shadow
overflow-x-auto
">


<table className="w-full">


<thead className="bg-gray-100">


<tr>

<th className="p-4 text-left">
Title
</th>

<th className="p-4 text-left">
Company
</th>

<th className="p-4 text-left">
Location
</th>

<th className="p-4 text-left">
Type
</th>

<th className="p-4 text-left">
Status
</th>

<th className="p-4 text-center">
Actions
</th>


</tr>


</thead>





<tbody>


{
loading ? (

<tr>

<td
colSpan="6"
className="text-center p-8"
>

Loading Jobs...

</td>

</tr>


)


:


filteredJobs.map(
(job)=>(


<tr

key={job._id}

className="
border-t
hover:bg-gray-50
"

>


<td className="p-4 font-semibold">

{job.title}

</td>



<td className="p-4">

{job.company}

</td>



<td className="p-4">

{job.location}

</td>



<td className="p-4">

{job.jobType}

</td>




<td className="p-4">

<span className="
px-3
py-1
rounded-full
bg-gray-100
">

{job.status}

</span>

</td>




<td className="
p-4
flex
gap-2
justify-center
">


{
job.status !== "approved" &&

<button

onClick={()=>
updateStatus(
job._id,
"approved"
)
}

className="
bg-green-500
text-white
px-3
py-2
rounded
"

>

<FaCheck/>

</button>

}




{
job.status !== "closed" &&

<button

onClick={()=>
updateStatus(
job._id,
"closed"
)
}

className="
bg-orange-500
text-white
px-3
py-2
rounded
"

>

<FaBan/>

</button>

}




<button

onClick={()=>
deleteJob(
job._id
)
}

className="
bg-red-600
text-white
px-3
py-2
rounded
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


export default Jobs;