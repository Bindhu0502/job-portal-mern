import { Link } from "react-router-dom";


function ApplyButton({jobId}){


return (

<Link

to={`/jobs/${jobId}/apply`}

className="
bg-blue-600
text-white
px-6
py-3
rounded-lg
font-semibold
hover:bg-blue-700
transition
"

>

Apply Now

</Link>


);


}


export default ApplyButton;