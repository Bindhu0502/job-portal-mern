import React from "react";



function NotificationCard({

stats,

applications = []

}) {



const notifications = [];





if(applications.length > 0){


applications.slice(0,5).forEach((application)=>{


notifications.push({

message:

`Your application for ${
application.job?.title || "job"
} is ${application.status || "Applied"}`,

status:

application.status || "Applied"

});


});


}









const statusColor = (status)=>{


switch(status){


case "Selected":

return `
bg-green-100
dark:bg-green-900

text-green-700
dark:text-green-300
`;



case "Rejected":

return `
bg-red-100
dark:bg-red-900

text-red-700
dark:text-red-300
`;



case "Shortlisted":

return `
bg-blue-100
dark:bg-blue-900

text-blue-700
dark:text-blue-300
`;



case "Under Review":

return `
bg-yellow-100
dark:bg-yellow-900

text-yellow-700
dark:text-yellow-300
`;



default:

return `
bg-gray-100
dark:bg-gray-700

text-gray-700
dark:text-gray-300
`;



}


};









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

Notifications

</h2>









{

notifications.length === 0 ?


(


<div

className="
text-center

py-10

text-gray-500
dark:text-gray-400

"

>

No notifications yet

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

notifications.map((item,index)=>(


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







<p

className="
text-gray-700
dark:text-gray-200

mb-3

"

>

🔔 {item.message}

</p>







<span

className={`
px-3
py-1

rounded-full

text-sm

font-semibold

${statusColor(item.status)}

`}

>

{item.status}

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



export default NotificationCard;