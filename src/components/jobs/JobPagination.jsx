function JobPagination({

page,

totalPages,

setPage

}) {



return (

<div className="
flex
justify-center
items-center
gap-5
mt-8
">






{/* Previous Button */}


<button

disabled={page === 1}

onClick={()=>setPage(page - 1)}

className={`
px-5
py-2
rounded-lg
font-medium
border
transition

${
page === 1

?

"bg-gray-200 text-gray-400 cursor-not-allowed border-gray-200"

:

"bg-white text-gray-700 border-gray-300 hover:bg-gray-100"

}

`}

>


Previous


</button>










{/* Page Text */}


<span

className="
text-gray-800
font-semibold
text-base
"

>


Page {page} of {totalPages}


</span>









{/* Next Button */}



<button

disabled={page === totalPages}

onClick={()=>setPage(page + 1)}

className={`
px-5
py-2
rounded-lg
font-medium
transition

${
page === totalPages

?

"bg-gray-200 text-gray-400 cursor-not-allowed"

:

"bg-blue-600 text-white hover:bg-blue-700"

}

`}

>


Next


</button>






</div>


);


}



export default JobPagination;