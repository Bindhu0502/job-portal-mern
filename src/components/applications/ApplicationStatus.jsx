import {
CheckCircle,
Circle,
XCircle
} from "lucide-react";





function ApplicationStatus({status}){


const steps=[

"Applied",

"Reviewed",

"Shortlisted",

"Selected"

];





const currentIndex = steps.indexOf(status);







return(



<div className="mt-6">


<h3 className="font-semibold mb-5">

Application Progress

</h3>









{

status==="Rejected"

?


<div className="
bg-red-50
border
border-red-200
rounded-lg
p-5
flex
items-center
gap-3
text-red-700
">


<XCircle size={28}/>


<div>


<p className="font-bold">

Application Rejected

</p>


<p className="text-sm">

This application was not selected.

</p>


</div>


</div>



:



<div className="
flex
flex-col
md:flex-row
items-start
justify-between
gap-6
">


{


steps.map((step,index)=>(



<div

key={step}

className="
flex-1
relative
flex
md:flex-col
items-center
gap-3
"

>



{

index <= currentIndex


?


<CheckCircle

size={32}

className="
text-blue-600
"

/>


:


<Circle

size={32}

className="
text-gray-300
"

/>


}





<p

className={

`

text-sm

text-center

${

index <= currentIndex

?

"text-blue-600 font-semibold"

:

"text-gray-400"

}

`

}

>

{step}

</p>










{

index !== steps.length-1 &&


<div

className={`

hidden

md:block

absolute

top-4

left-1/2

w-full

h-1

${

index < currentIndex

?

"bg-blue-600"

:

"bg-gray-200"

}

`}

/>


}



</div>



))


}



</div>



}





</div>


);



}



export default ApplicationStatus;