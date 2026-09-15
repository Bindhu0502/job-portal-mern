import React from "react";


function SearchBar({
  search,
  setSearch
}) {


return (

<div>


<input

type="text"

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

placeholder="Search by Job Title, Company or Skills..."

className="
w-full
border
border-gray-300
dark:border-gray-600
rounded-lg
p-3

bg-white
dark:bg-gray-700

text-gray-900
dark:text-white

placeholder-gray-400
dark:placeholder-gray-300

focus:outline-none
focus:ring-2
focus:ring-blue-500

transition

"

/>


</div>


);


}


export default SearchBar;