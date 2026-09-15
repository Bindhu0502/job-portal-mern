import mongoose from "mongoose";



const jobSchema = new mongoose.Schema(


{


// ===============================
// BASIC DETAILS
// ===============================


title:{


type:String,

required:true,

trim:true


},




company:{


type:String,

required:true,

trim:true


},





category:{


type:String,

default:"",

trim:true


},





location:{


type:String,

required:true,

trim:true


},





// ===============================
// JOB TYPE
// ===============================


jobType:{


type:String,


enum:[

"Full Time",

"Part Time",

"Internship",

"Contract"

],


default:"Full Time"


},





workMode:{


type:String,


enum:[

"On-site",

"Remote",

"Hybrid"

],


default:"On-site"


},





experience:{


type:String,

default:""


},






salary:{


type:String,

default:""


},






openings:{


type:Number,

default:1


},






deadline:{


type:Date,

default:null


},





skills:{


type:String,

default:""


},






description:{


type:String,

required:true


},






// ===============================
// RECRUITER
// ===============================


postedBy:{


type:mongoose.Schema.Types.ObjectId,

ref:"User",

required:true


},






// ===============================
// JOB STATUS
// ===============================


isActive:{


type:Boolean,

default:true


}



},


{


timestamps:true


}

);






// =================================
// SEARCH INDEX
// =================================


jobSchema.index({

title:"text",

company:"text",

skills:"text",

location:"text",

category:"text"

});



// Faster latest jobs sorting

jobSchema.index({

createdAt:-1

});






const Job = mongoose.model(

"Job",

jobSchema

);



export default Job;