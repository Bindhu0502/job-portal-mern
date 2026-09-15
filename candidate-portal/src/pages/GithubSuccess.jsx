import {
useEffect
} from "react";


import {
useNavigate,

useSearchParams

} from "react-router-dom";



function GithubSuccess(){


const navigate = useNavigate();


const [searchParams] = useSearchParams();





useEffect(()=>{


const token = searchParams.get(
"token"
);



const user = searchParams.get(
"user"
);





if(token && user){



localStorage.setItem(

"token",

token

);





localStorage.setItem(

"user",

user

);





navigate(

"/dashboard"

);



}

else{


navigate(

"/login"

);


}



},[]);







return(


<div className="min-h-screen flex items-center justify-center">


<h2 className="text-2xl font-bold">

Completing GitHub Login...

</h2>


</div>


);


}



export default GithubSuccess;