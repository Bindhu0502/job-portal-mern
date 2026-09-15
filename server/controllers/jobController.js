import Job from "../models/Job.js";




// =========================================
// CREATE JOB
// POST /api/jobs
// =========================================

export const createJob = async(req,res)=>{


try{


const {

title,
company,
location,
salary,
jobType,
workMode,
experience,
description,
skills,
category,
companyLogo,
openings,
deadline


}=req.body;





if(
!title ||
!company ||
!location ||
!description
){


return res.status(400).json({

success:false,

message:
"Title, company, location and description are required"

});


}







const job = await Job.create({


title,

company,

location,

salary,

jobType,

workMode,

experience,

description,

skills,

category,

companyLogo,

openings,

deadline,


postedBy:req.user._id,


isActive:true


});







res.status(201).json({

success:true,

message:"Job created successfully",

job

});


}



catch(error){


console.log(
"CREATE JOB ERROR:",
error
);



res.status(500).json({

success:false,

message:error.message

});


}


};









// =========================================
// GET ALL ACTIVE JOBS
// SEARCH + FILTER + PAGINATION
// GET /api/jobs
// =========================================


export const getAllJobs = async(req,res)=>{


try{


const {


search,

location,

jobType,

experience,

workMode,

category,

sort,

page=1,

limit=6


}=req.query;







let query={

isActive:true

};








// ===============================
// SEARCH
// ===============================


if(search && search.trim()){


query.$or=[


{
title:{
$regex:search,
$options:"i"
}
},


{
company:{
$regex:search,
$options:"i"
}
},


{
skills:{
$regex:search,
$options:"i"
}
},


{
location:{
$regex:search,
$options:"i"
}
},


{
category:{
$regex:search,
$options:"i"
}

}


];


}









// ===============================
// FILTERS
// ===============================


if(location){


query.location={

$regex:location,

$options:"i"

};


}





if(jobType){


query.jobType=jobType;


}





if(experience){


query.experience=experience;


}





if(workMode){


query.workMode=workMode;


}





if(category){


query.category={

$regex:category,

$options:"i"

};


}









// ===============================
// SORT
// ===============================


let sortOption={

createdAt:-1

};



if(sort==="oldest"){


sortOption={

createdAt:1

};


}



if(sort==="latest"){


sortOption={

createdAt:-1

};


}










// ===============================
// PAGINATION
// ===============================


const pageNumber=Number(page);

const limitNumber=Number(limit);


const skip=

(pageNumber-1)*limitNumber;





const totalJobs=

await Job.countDocuments(query);







const jobs=

await Job.find(query)

.populate(

"postedBy",

"name email"

)

.sort(sortOption)

.skip(skip)

.limit(limitNumber);









res.status(200).json({


success:true,


count:jobs.length,


totalJobs,


currentPage:pageNumber,


totalPages:

Math.ceil(

totalJobs / limitNumber

),


jobs



});





}



catch(error){



console.log(

"GET ALL JOBS ERROR:",

error

);




res.status(500).json({

success:false,

message:error.message

});



}


};












// =========================================
// GET JOB BY ID
// GET /api/jobs/:id
// =========================================


export const getJobById = async(req,res)=>{


try{


const job = await Job.findOne({


_id:req.params.id,

isActive:true


})

.populate(

"postedBy",

"name email"

);






if(!job){


return res.status(404).json({

success:false,

message:"Job not found"

});


}






res.status(200).json({

success:true,

job

});



}



catch(error){



console.log(

"GET JOB ERROR:",

error

);



res.status(500).json({

success:false,

message:error.message

});


}



};












// =========================================
// UPDATE JOB
// PUT /api/jobs/:id
// =========================================


export const updateJob = async(req,res)=>{


try{


const job = await Job.findById(

req.params.id

);






if(!job){


return res.status(404).json({

success:false,

message:"Job not found"

});


}







if(

job.postedBy.toString()

!==

req.user._id.toString()

){


return res.status(403).json({

success:false,

message:"Not authorized"

});


}







Object.assign(

job,

req.body

);



const updatedJob=

await job.save();







res.status(200).json({

success:true,

message:"Job updated successfully",

job:updatedJob

});



}



catch(error){



console.log(

"UPDATE JOB ERROR:",

error

);



res.status(500).json({

success:false,

message:error.message

});


}



};












// =========================================
// DELETE JOB
// DELETE /api/jobs/:id
// =========================================


export const deleteJob = async(req,res)=>{


try{


const job=

await Job.findById(

req.params.id

);






if(!job){


return res.status(404).json({

success:false,

message:"Job not found"

});


}







if(

job.postedBy.toString()

!==

req.user._id.toString()

){


return res.status(403).json({

success:false,

message:"Not authorized"

});


}







await job.deleteOne();







res.status(200).json({

success:true,

message:"Job deleted successfully"

});



}



catch(error){



console.log(

"DELETE JOB ERROR:",

error

);



res.status(500).json({

success:false,

message:error.message

});


}



};