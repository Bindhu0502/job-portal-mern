import mongoose from "mongoose";
import dotenv from "dotenv";

import Company from "./models/Company.js";


dotenv.config();



const companies = [

{
name:"Google",
industry:"Technology",
location:"Hyderabad",
website:"https://google.com",
logo:""
},


{
name:"Amazon",
industry:"E-Commerce",
location:"Bangalore",
website:"https://amazon.com",
logo:""
},


{
name:"Microsoft",
industry:"Software",
location:"Hyderabad",
website:"https://microsoft.com",
logo:""
},


{
name:"Infosys",
industry:"IT Services",
location:"Pune",
website:"https://infosys.com",
logo:""
},


{
name:"TCS",
industry:"IT Services",
location:"Mumbai",
website:"https://tcs.com",
logo:""
},


{
name:"Deloitte",
industry:"Consulting",
location:"Hyderabad",
website:"https://deloitte.com",
logo:""
}

];





const seedCompanies = async()=>{


try{


await mongoose.connect(
process.env.MONGO_URI
);



console.log(
"MongoDB Connected"
);



await Company.deleteMany();



await Company.insertMany(
companies
);



console.log(
"Companies Added Successfully"
);



process.exit();



}
catch(error){


console.log(error);

process.exit(1);


}


};



seedCompanies();