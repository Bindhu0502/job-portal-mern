import mongoose from "mongoose";
import bcrypt from "bcryptjs";



const userSchema = new mongoose.Schema(

{

// ===============================
// BASIC USER DETAILS
// ===============================


name:{

type:String,

required:true,

trim:true

},






email:{

type:String,

required:true,

unique:true,

lowercase:true,

trim:true

},






password:{

type:String,

required:true,

minlength:6

},










// ===============================
// USER ROLE
// ===============================


role:{

type:String,


enum:[

"candidate",

"recruiter",

"admin"

],


default:"candidate"

},









// ===============================
// ACCOUNT STATUS
// ===============================


accountStatus:{

type:String,


enum:[

"pending",

"approved",

"rejected"

],


default:"approved"

},









// ===============================
// RECRUITER COMPANY PROFILE
// ===============================


company:{

type:String,

default:"",

trim:true

},





companyLogo:{

type:String,

default:"",

trim:true

},





companyWebsite:{

type:String,

default:"",

trim:true

},





companyLocation:{

type:String,

default:"",

trim:true

},





companyDescription:{

type:String,

default:"",

trim:true

},











// ===============================
// CANDIDATE PROFILE DETAILS
// ===============================


phone:{

type:String,

default:""

},






location:{

type:String,

default:""

},






skills:[

{

type:String

}

],






experience:{

type:String,

default:""

},






education:{

type:String,

default:""

},






jobPreference:{

type:String,

default:""

},






expectedSalary:{

type:String,

default:""

},






linkedin:{

type:String,

default:""

},






github:{

type:String,

default:""

},






portfolio:{

type:String,

default:""

},











// ===============================
// UPLOADS
// ===============================


profileImage:{

type:String,

default:""

},







// Resume Upload Details

resume:{


url:{

type:String,

default:""

},



publicId:{

type:String,

default:""

},



uploadedAt:{

type:Date,

default:null

}



}







},


{


timestamps:true


}

);











// ===============================
// HASH PASSWORD BEFORE SAVE
// ===============================


userSchema.pre(

"save",

async function(next){



if(!this.isModified("password")){


return next();


}





const salt = await bcrypt.genSalt(10);



this.password = await bcrypt.hash(

this.password,

salt

);




next();



}

);









// ===============================
// COMPARE PASSWORD
// ===============================


userSchema.methods.matchPassword = async function(password){


return await bcrypt.compare(

password,

this.password

);


};









const User = mongoose.model(

"User",

userSchema

);



export default User;