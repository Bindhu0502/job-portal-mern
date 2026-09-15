import mongoose from "mongoose";


const connectDB = async()=>{

try{


console.log(
"Mongo URI Loaded:",
process.env.MONGO_URI
);



const conn = await mongoose.connect(

process.env.MONGO_URI

);



console.log(

`MongoDB Connected Successfully ✅ : ${conn.connection.host}`

);



}

catch(error){


console.log(

"MongoDB Connection Failed"

);


console.log(

error.message

);


process.exit(1);


}



};



export default connectDB;