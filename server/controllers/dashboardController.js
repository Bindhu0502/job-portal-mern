import Application from "../models/Application.js";
import SavedJob from "../models/SavedJob.js";
import Job from "../models/Job.js";
import User from "../models/User.js";




// ===============================
// USER DASHBOARD
// ===============================


export const getDashboard = async(req,res)=>{


try{


const userId=req.user._id;



// ===============================
// USER
// ===============================


const user=await User.findById(userId);




// ===============================
// APPLICATION COUNTS
// ===============================


const totalApplications =
await Application.countDocuments({

user:userId

});





const shortlisted =
await Application.countDocuments({

user:userId,

status:"Shortlisted"

});





const selected =
await Application.countDocuments({

user:userId,

status:"Selected"

});





const rejected =
await Application.countDocuments({

user:userId,

status:"Rejected"

});









// ===============================
// SAVED JOBS
// ===============================


const savedJobs =
await SavedJob.countDocuments({

user:userId

});









// ===============================
// RECENT APPLICATIONS
// ===============================


const recentApplications =

await Application.find({

user:userId

})

.populate({

path:"job",

select:
"title company location salary"

})

.sort({

createdAt:-1

})

.limit(5);









// ===============================
// PROFILE COMPLETION
// ===============================


let completed=0;



const fields=[


user?.name,


user?.phone,


user?.location,


user?.skills?.length,


user?.experience,


user?.education,


user?.resume,


user?.linkedin,


user?.github,


user?.portfolio


];





fields.forEach(field=>{


if(field){

completed++;

}


});






const profileCompletion=Math.round(

(completed / fields.length) * 100

);









// ===============================
// RECOMMENDED JOBS
// ===============================



let recommendedJobs=[];





if(user?.skills && user.skills.length>0){



recommendedJobs = await Job.find({

isActive:true,


skills:{


$regex:user.skills.join("|"),


$options:"i"


}


})

.sort({

createdAt:-1

})

.limit(6);



}







// if no skill match

if(recommendedJobs.length===0){



recommendedJobs = await Job.find({

isActive:true

})

.sort({

createdAt:-1

})

.limit(6);



}












// ===============================
// STATUS SUMMARY
// ===============================


const applicationStats={


Applied:

await Application.countDocuments({

user:userId,

status:"Applied"

}),


Reviewed:

await Application.countDocuments({

user:userId,

status:"Reviewed"

}),


Shortlisted:


shortlisted,


Selected:


selected,


Rejected:


rejected


};









res.status(200).json({


success:true,


dashboard:{



totalApplications,


savedJobs,


interviews:shortlisted,


selected,


rejected,


profileCompletion,


applicationStats,


recommendedJobs,


recentApplications



}



});





}

catch(error){



console.log(

"Dashboard Error:",

error

);



res.status(500).json({

success:false,

message:error.message

});


}



};