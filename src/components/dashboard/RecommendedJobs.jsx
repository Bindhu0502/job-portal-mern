import React from "react";

import {
  Link
} from "react-router-dom";




function RecommendedJobs({
  jobs = []
}) {



return (


<div

className="
bg-white
dark:bg-gray-800

border
border-gray-200
dark:border-gray-700

rounded-2xl

shadow-md

p-6

transition-all
duration-300
"

>







<h2

className="
text-2xl
font-bold

text-gray-800
dark:text-white

mb-6

"

>

Recommended Jobs

</h2>









{

jobs.length === 0 ?


(


<div

className="
text-center
py-10

text-gray-500
dark:text-gray-400

"

>

No recommended jobs available

</div>


)



:



(


<div

className="
space-y-4

"

>



{

jobs.slice(0,5).map((job)=>(


<div

key={job._id}

className="
border

border-gray-200
dark:border-gray-700

rounded-xl

p-4

hover:shadow-md

transition

"

>







<h3

className="
font-bold

text-gray-800
dark:text-white

"

>

{job.title}

</h3>







<p

className="
mt-1

text-gray-500
dark:text-gray-400

"

>

{

typeof job.company === "object"

?

job.company?.name

:

job.company

||

"Company"

}

</p>








<div

className="
mt-3

space-y-2

text-gray-600
dark:text-gray-300

"

>


<p>

📍 {job.location}

</p>



<p>

💼 {job.jobType}

</p>



<p

className="
text-green-600
dark:text-green-400

font-semibold

"

>

₹ {job.salary}

</p>



</div>









<Link

to={`/jobs/${job._id}`}

className="
inline-block

mt-4

bg-blue-600

hover:bg-blue-700

text-white

px-5

py-2

rounded-lg

transition

"

>

View Job

</Link>







</div>


))


}


</div>


)


}








</div>


);


}



export default RecommendedJobs;