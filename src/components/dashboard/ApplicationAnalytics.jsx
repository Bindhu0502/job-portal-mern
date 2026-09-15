import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";




function ApplicationAnalytics({
  applications
}) {



const statusCount = {

Applied:0,

"Under Review":0,

Shortlisted:0,

"Interview Scheduled":0,

Selected:0,

Rejected:0

};





applications.forEach((app)=>{


if(statusCount[app.status] !== undefined){

statusCount[app.status]++;

}


});






const data = Object.keys(statusCount)
.map((key)=>({

name:key,

value:statusCount[key]

}))
.filter(
(item)=>item.value>0
);







const COLORS = [

"#2563eb",

"#eab308",

"#16a34a",

"#9333ea",

"#22c55e",

"#dc2626"

];







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

Application Analytics

</h2>









{

data.length === 0 ?


(


<div

className="
h-64

flex
items-center
justify-center

text-gray-500
dark:text-gray-400

"

>

No application data available

</div>


)

:

(


<div

className="
h-72

"

>


<ResponsiveContainer
width="100%"
height="100%"
>


<PieChart>


<Pie

data={data}

cx="50%"

cy="50%"

outerRadius={100}

dataKey="value"

label


>


{

data.map((entry,index)=>(


<Cell

key={index}

fill={
COLORS[index % COLORS.length]
}

/>


))


}


</Pie>





<Tooltip

contentStyle={{

backgroundColor:"#1f2937",

border:"none",

color:"#fff"

}}


/>





<Legend

wrapperStyle={{

color:"inherit"

}}


/>





</PieChart>



</ResponsiveContainer>



</div>


)


}





</div>


);


}



export default ApplicationAnalytics;