import { useEffect, useState } from "react";

import api from "../../services/api";

import {
  Bookmark
} from "lucide-react";



function SaveJobButton({
jobId
}){


const [saved,setSaved] =
useState(false);



const [loading,setLoading] =
useState(false);





useEffect(()=>{

checkSaved();

},[jobId]);






const checkSaved = async()=>{


try{


const res = await api.get(

`/saved-jobs/check/${jobId}`

);



setSaved(
res.data.saved
);



}


catch(error){


console.log(
"Check Saved Error",
error.response?.data || error
);


}


};









const handleSave = async()=>{


const token =
localStorage.getItem("token");



if(!token){

alert(
"Please login to save jobs"
);

return;

}




try{


setLoading(true);



if(saved){


await api.delete(

`/saved-jobs/${jobId}`

);



setSaved(false);



}

else{


await api.post(

`/saved-jobs/${jobId}`

);



setSaved(true);


}



}


catch(error){


console.log(
"Save Job Error",
error.response?.data || error
);



alert(

error.response?.data?.message ||

"Unable to save job"

);



}

finally{


setLoading(false);


}



};









return (


<button

onClick={handleSave}

disabled={loading}

className="
flex
items-center
gap-2
border
px-5
py-3
rounded-lg
hover:bg-gray-50
"

>


<Bookmark

size={20}

fill={saved ? "blue":"none"}

className={
saved
?
"text-blue-600"
:
"text-gray-500"
}

/>



{

saved

?

"Saved"

:

"Save Job"

}



</button>


);


}


export default SaveJobButton;