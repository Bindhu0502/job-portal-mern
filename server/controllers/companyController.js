import Company from "../models/Company.js";



// ===============================
// Get All Companies
// ===============================

export const getCompanies = async(
req,
res
)=>{


try{


const companies =
await Company.find({
isActive:true
})
.sort({
createdAt:-1
});



res.status(200).json({

companies

});



}
catch(error){


res.status(500).json({

message:error.message

});


}


};






// ===============================
// Get Company By ID
// ===============================

export const getCompanyById = async(
req,
res
)=>{


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



res.json({

company

});


}
catch(error){


res.status(500).json({

message:error.message

});


}


};








// ===============================
// Create Company
// ===============================


export const createCompany = async(
req,
res
)=>{


try{


const company =
await Company.create(
req.body
);



res.status(201).json({

message:"Company created",

company

});



}
catch(error){


res.status(500).json({

message:error.message

});


}


};









// ===============================
// Update Company
// ===============================


export const updateCompany = async(
req,
res
)=>{


try{


const company =
await Company.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true
}

);



res.json({

message:"Company updated",

company

});


}
catch(error){


res.status(500).json({

message:error.message

});


}


};









// ===============================
// Delete Company
// ===============================


export const deleteCompany = async(
req,
res
)=>{


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