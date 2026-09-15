import {
  useEffect,
  useState,
} from "react";


import {
  FaTrash,
  FaCheck,
  FaBan,
  FaSearch,
} from "react-icons/fa";


import {
  toast,
} from "react-toastify";


import api from "../../services/api";



function Companies(){


const [companies,setCompanies]=useState([]);

const [search,setSearch]=useState("");

const [loading,setLoading]=useState(true);






useEffect(()=>{

fetchCompanies();

},[]);






const fetchCompanies=async()=>{


try{


const res =
await api.get(
"/admin/companies"
);



setCompanies(
res.data.companies || []
);



}
catch(error){

console.log(error);

toast.error(
"Failed to load companies"
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

`/admin/companies/${id}/status`,

{
status
}

);



toast.success(
"Company status updated"
);



fetchCompanies();



}
catch(error){


toast.error(
"Unable to update status"
);


}


};








const deleteCompany =
async(id)=>{


const confirm =
window.confirm(
"Delete this company?"
);



if(!confirm)
return;




try{


await api.delete(

`/admin/companies/${id}`

);



setCompanies(

prev =>
prev.filter(
company =>
company._id !== id
)

);



toast.success(
"Company deleted"
);



}
catch(error){


toast.error(
"Delete failed"
);


}


};







const filteredCompanies =
companies.filter(
(company)=>

company.name
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

Companies Management

</h1>







<div className="
bg-white
rounded-xl
shadow
p-5
flex
items-center
gap-3
">


<FaSearch
className="text-gray-400"
/>


<input

type="text"

placeholder="Search companies..."

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
Company
</th>


<th className="p-4 text-left">
Owner
</th>


<th className="p-4 text-left">
Email
</th>


<th className="p-4 text-left">
Location
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
className="
text-center
p-8
"
>

Loading Companies...

</td>

</tr>


)


:


filteredCompanies.map(
(company)=>(


<tr

key={company._id}

className="
border-t
hover:bg-gray-50
"

>


<td className="p-4 font-semibold">

{company.name}

</td>





<td className="p-4">

{
company.owner?.name || "-"
}

</td>





<td className="p-4">

{
company.owner?.email || "-"
}

</td>





<td className="p-4">

{
company.location || "-"
}

</td>






<td className="p-4">


<span className={`px-3 py-1 rounded-full text-sm ${
company.status==="approved"

?
"bg-green-100 text-green-700"

:

company.status==="blocked"

?
"bg-red-100 text-red-700"

:

"bg-yellow-100 text-yellow-700"

}`}>

{company.status}

</span>


</td>








<td className="
p-4
flex
gap-2
justify-center
">


{
company.status !== "approved" &&

<button

onClick={()=>
updateStatus(
company._id,
"approved"
)
}

className="
bg-green-500
text-white
px-3
py-2
rounded
flex
items-center
gap-1
"

>

<FaCheck/>

Approve

</button>

}







{
company.status !== "blocked" &&

<button

onClick={()=>
updateStatus(
company._id,
"blocked"
)
}

className="
bg-orange-500
text-white
px-3
py-2
rounded
flex
items-center
gap-1
"

>

<FaBan/>

Block

</button>

}






<button

onClick={()=>
deleteCompany(
company._id
)
}

className="
bg-red-600
text-white
px-3
py-2
rounded
flex
items-center
gap-1
"

>

<FaTrash/>

Delete

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



export default Companies;