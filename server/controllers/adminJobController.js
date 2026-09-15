import Job from "../models/Job.js";



// Get all jobs

export const getAllJobs = async(req,res)=>{

try{


const jobs =
await Job.find()

.populate(
 "recruiter",
 "name email"
)

.populate(
 "company",
 "name"
)

.sort({
 createdAt:-1
});



res.json({

jobs

});



}
catch(error){

res.status(500).json({

message:error.message

});

}

};






// Update job status

export const updateJobStatus =
async(req,res)=>{


try{


const job =
await Job.findById(
 req.params.id
);



if(!job){

return res.status(404).json({

message:"Job not found"

});

}




job.status =
req.body.status;



await job.save();



res.json({

message:"Job status updated"

});



}
catch(error){


res.status(500).json({

message:error.message

});


}

};






// Delete Job


export const deleteJob =
async(req,res)=>{


try{


await Job.findByIdAndDelete(
 req.params.id
);



res.json({

message:"Job deleted"

});


}
catch(error){


res.status(500).json({

message:error.message

});


}


};