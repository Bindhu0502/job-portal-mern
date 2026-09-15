import Company from "../models/Company.js";



// Get all companies

export const getAllCompanies = async(req,res)=>{

try{


const companies =
await Company.find()
.populate(
 "owner",
 "name email"
)
.sort({
 createdAt:-1
});



res.json({

companies

});



}
catch(error){

res.status(500).json({

message:error.message

});

}


};






// Update company status

export const updateCompanyStatus =
async(req,res)=>{


try{


const company =
await Company.findById(
 req.params.id
);



if(!company){

return res.status(404).json({

message:"Company not found"

});

}



company.status =
req.body.status;



await company.save();



res.json({

message:"Company status updated"

});



}
catch(error){


res.status(500).json({

message:error.message

});


}


};






// Delete company

export const deleteCompany =
async(req,res)=>{


try{


await Company.findByIdAndDelete(
 req.params.id
);



res.json({

message:"Company deleted"

});


}
catch(error){


res.status(500).json({

message:error.message

});


}


};