import SavedJob from "../models/SavedJob.js";
import Job from "../models/Job.js";





// =====================================
// SAVE JOB
// POST /api/saved-jobs/:jobId
// =====================================

export const saveJob = async(req,res)=>{


try{


const userId=req.user._id;


const jobId=req.params.jobId;





console.log("SAVE JOB USER:",userId);

console.log("SAVE JOB ID:",jobId);







if(!jobId){


return res.status(400).json({

success:false,

message:"Job id required"

});


}








const job=await Job.findById(jobId);





if(!job){


return res.status(404).json({

success:false,

message:"Job not found"

});


}







const alreadySaved = await SavedJob.findOne({

user:userId,

job:jobId

});






if(alreadySaved){


return res.status(400).json({

success:false,

message:"Job already saved"

});


}









const savedJob=await SavedJob.create({

user:userId,

job:jobId

});








res.status(201).json({

success:true,

message:"Job saved successfully",

savedJob

});




}

catch(error){



console.log(

"SAVE JOB ERROR:",

error

);





if(error.code===11000){


return res.status(400).json({

success:false,

message:"Job already saved"

});


}






res.status(500).json({

success:false,

message:error.message

});


}



};









// =====================================
// REMOVE SAVED JOB
// DELETE /api/saved-jobs/:jobId
// =====================================


export const removeSavedJob=async(req,res)=>{


try{


const deleted=await SavedJob.findOneAndDelete({


user:req.user._id,

job:req.params.jobId


});






if(!deleted){


return res.status(404).json({

success:false,

message:"Saved job not found"

});


}






res.json({

success:true,

message:"Removed from saved jobs"

});



}

catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};









// =====================================
// GET MY SAVED JOBS
// GET /api/saved-jobs/my
// =====================================


export const getSavedJobs=async(req,res)=>{


try{


const savedJobs=await SavedJob.find({

user:req.user._id

})

.populate("job")

.sort({

createdAt:-1

});







res.json({

success:true,

savedJobs

});



}

catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};