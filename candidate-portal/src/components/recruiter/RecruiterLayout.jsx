import RecruiterSidebar from "./RecruiterSidebar";

import RecruiterNavbar from "./RecruiterNavbar";




function RecruiterLayout({children}){



return(


<div className="flex min-h-screen bg-gray-50">


<RecruiterSidebar />



<div className="flex-1">


<RecruiterNavbar />



<main className="p-6">


{children}


</main>



</div>


</div>


);



}



export default RecruiterLayout;