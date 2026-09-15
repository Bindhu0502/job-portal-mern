import React from "react";



function JobFilters({

filters,

setFilters

}) {



const updateFilter=(name,value)=>{


setFilters({

...filters,

[name]:value

});


};







return (

<div>



<h2 className="
text-xl
font-bold
mb-5

text-gray-800
dark:text-white

">

Filters

</h2>








{/* LOCATION */}



<select

value={filters.location}

onChange={(e)=>
updateFilter(
"location",
e.target.value
)
}

className="
w-full
border
border-gray-300
dark:border-gray-600

rounded-lg

p-3

mb-4

bg-white
dark:bg-gray-700

text-gray-800
dark:text-white

focus:outline-none
focus:ring-2
focus:ring-blue-500

"


>


<option value="">

All Locations

</option>


<option value="Hyderabad">

Hyderabad

</option>


<option value="Bangalore">

Bangalore

</option>


<option value="Mumbai">

Mumbai

</option>


<option value="Pune">

Pune

</option>


</select>










{/* JOB TYPE */}



<select

value={filters.jobType}

onChange={(e)=>
updateFilter(
"jobType",
e.target.value
)
}

className="
w-full

border
border-gray-300
dark:border-gray-600

rounded-lg

p-3

mb-4

bg-white
dark:bg-gray-700

text-gray-800
dark:text-white

focus:outline-none
focus:ring-2
focus:ring-blue-500

"

>


<option value="">

Job Type

</option>


<option value="Full Time">

Full Time

</option>


<option value="Part Time">

Part Time

</option>


<option value="Internship">

Internship

</option>



</select>









{/* EXPERIENCE */}



<select

value={filters.experience}

onChange={(e)=>
updateFilter(
"experience",
e.target.value
)
}

className="
w-full

border
border-gray-300
dark:border-gray-600

rounded-lg

p-3

mb-4

bg-white
dark:bg-gray-700

text-gray-800
dark:text-white

focus:outline-none
focus:ring-2
focus:ring-blue-500

"

>


<option value="">

Experience

</option>


<option value="0-2 Years">

0-2 Years

</option>


<option value="2-5 Years">

2-5 Years

</option>


<option value="5+ Years">

5+ Years

</option>



</select>









<button

onClick={()=>


setFilters({

location:"",
jobType:"",
experience:""

})


}

className="
w-full

bg-red-500
hover:bg-red-600

text-white

py-3

rounded-lg

transition

"

>


Clear Filters


</button>






</div>


);


}



export default JobFilters;