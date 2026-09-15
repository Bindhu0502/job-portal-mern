import mongoose from "mongoose";


const companySchema = new mongoose.Schema(

{

name:{


type:String,

required:true,

trim:true

},



description:{


type:String,

default:""

},



industry:{


type:String,

default:""

},



location:{


type:String,

default:""

},



website:{


type:String,

default:""

},



logo:{


type:String,

default:""

},



isActive:{


type:Boolean,

default:true

}


},

{
timestamps:true
}


);



export default mongoose.model(
"Company",
companySchema
);