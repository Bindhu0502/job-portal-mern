import mongoose from "mongoose";


const applicationSchema = new mongoose.Schema(

{

user:{

type:mongoose.Schema.Types.ObjectId,

ref:"User",

required:true

},



job:{

type:mongoose.Schema.Types.ObjectId,

ref:"Job",

required:true

},




fullName:{

type:String,

required:true

},



email:{

type:String,

required:true

},



phone:{

type:String,

default:""

},




experience:{

type:String,

default:"Fresher"

},




skills:{

type:String,

default:""

},





coverLetter:{

type:String,

default:""

},





resume:{

type:String,

required:true

},





status:{

type:String,

enum:[

"Applied",

"Reviewed",

"Shortlisted",

"Selected",

"Rejected"

],

default:"Applied"

}



},

{

timestamps:true

}



);





export default mongoose.model(

"Application",

applicationSchema

);