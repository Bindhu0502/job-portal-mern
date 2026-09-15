import Application from "../models/Application.js";



// GET ALL APPLICATIONS

export const getAllApplications = async(req,res)=>{

try{


const applications =
await Application.find()

.populate(
 "job",
 "title company location"
)

.populate(
 "candidate",
 "name email"
)

.sort({
 createdAt:-1
});



res.status(200).json({

applications

});


}
catch(error){


res.status(500).json({

message:error.message

});


}

};







// UPDATE STATUS

export const updateApplicationStatus =
async(req,res)=>{


try{


const application =
await Application.findById(
req.params.id
);



if(!application){

return res.status(404).json({

message:"Application not found"

});

}



application.status =
req.body.status;



await application.save();



res.json({

message:
"Application status updated"

});


}
catch(error){


res.status(500).json({

message:error.message

});


}

};







// DELETE APPLICATION

export const deleteApplication =
async(req,res)=>{


try{


await Application.findByIdAndDelete(
req.params.id
);



res.json({

message:
"Application deleted"

});


}
catch(error){


res.status(500).json({

message:error.message

});


}


};