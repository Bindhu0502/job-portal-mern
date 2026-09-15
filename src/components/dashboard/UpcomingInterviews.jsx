import React from "react";



function UpcomingInterviews({

  interviews = []

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

Upcoming Interviews

</h2>









{

interviews.length === 0 ?



(


<div

className="
text-center

py-10

text-gray-500
dark:text-gray-400

"

>

No upcoming interviews

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


interviews.map((interview,index)=>(


<div

key={index}

className="
border

border-gray-200
dark:border-gray-700

rounded-xl

p-4

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

interview.job?.title ||

"Interview"

}

</h3>







<p

className="
mt-2

text-gray-600
dark:text-gray-300

"

>

🏢

{" "}

{

interview.company ||

interview.job?.company ||

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

📅

{" "}

{

interview.date

?

new Date(
interview.date
)
.toLocaleDateString()

:

"Date not available"

}

</p>







<span

className="
inline-block

mt-3

px-3

py-1

rounded-full

bg-blue-100
dark:bg-blue-900

text-blue-700
dark:text-blue-300

text-sm

font-semibold

"

>

Scheduled

</span>







</div>


))


}



</div>


)


}







</div>


);


}



export default UpcomingInterviews;