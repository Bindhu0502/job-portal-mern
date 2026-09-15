import React from "react";

import {
  Link
} from "react-router-dom";




function SavedJobsPreview({
  savedJobs
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

Saved Jobs

</h2>









{

savedJobs.length === 0 ?



(


<div

className="
text-center

py-10

text-gray-500
dark:text-gray-400

"

>

No saved jobs yet

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


savedJobs.slice(0,5).map((item)=>(



<div

key={item._id}

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

{

item.job?.title ||

item.title ||

"Job Title"

}

</h3>








<p

className="
mt-1

text-gray-500
dark:text-gray-400

"

>

{

item.job?.company ||

item.company ||

"Company"

}

</p>








<p

className="
mt-2

text-gray-600
dark:text-gray-300

"

>

📍

{" "}

{

item.job?.location ||

item.location ||

"Location"

}

</p>








<Link

to={`/jobs/${

item.job?._id ||

item._id

}`}

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



export default SavedJobsPreview;