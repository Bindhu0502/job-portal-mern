import mongoose from "mongoose";
import dotenv from "dotenv";

import Job from "../models/Job.js";

dotenv.config();


const recruiterId = new mongoose.Types.ObjectId(
"6a7177af98757d24655aee80"
);



const jobs = [

{
title:"Frontend Developer",
company:"TechNova Solutions",
category:"Software Development",
location:"Hyderabad",
jobType:"Full Time",
workMode:"Hybrid",
experience:"Fresher",
salary:"4-6 LPA",
openings:2,
skills:"React, JavaScript, HTML, CSS",
description:"Build modern responsive web applications."
},


{
title:"React JS Developer",
company:"CareerHub Technologies",
category:"Software Development",
location:"Bangalore",
jobType:"Full Time",
workMode:"On-site",
experience:"1-2 Years",
salary:"6-8 LPA",
openings:3,
skills:"React, Redux, Tailwind CSS",
description:"Develop scalable React applications."
},


{
title:"Data Analyst",
company:"AnalyticsPro",
category:"Data",
location:"Pune",
jobType:"Full Time",
workMode:"Hybrid",
experience:"0-2 Years",
salary:"5-7 LPA",
openings:2,
skills:"SQL, Excel, Power BI",
description:"Analyze business data and create dashboards."
},


{
title:"Power BI Developer",
company:"Analytics Hub",
category:"Data",
location:"Hyderabad",
jobType:"Full Time",
workMode:"Hybrid",
experience:"0-2 Years",
salary:"5-8 LPA",
openings:2,
skills:"Power BI, DAX, SQL",
description:"Create business intelligence reports."
},


{
title:"Backend Developer",
company:"CodeWave Technologies",
category:"Software Development",
location:"Hyderabad",
jobType:"Full Time",
workMode:"Hybrid",
experience:"1-3 Years",
salary:"7-10 LPA",
openings:2,
skills:"Node.js, Express, MongoDB",
description:"Develop backend APIs."
},


{
title:"Full Stack Developer",
company:"InnovateTech",
category:"Software Development",
location:"Bangalore",
jobType:"Full Time",
workMode:"Remote",
experience:"1-3 Years",
salary:"8-12 LPA",
openings:3,
skills:"React, Node.js, MongoDB",
description:"Work on complete web applications."
},


{
title:"Python Developer",
company:"CloudSphere",
category:"Software Development",
location:"Remote",
jobType:"Full Time",
workMode:"Remote",
experience:"1-3 Years",
salary:"7-10 LPA",
openings:2,
skills:"Python, Django, REST API",
description:"Develop Python backend services."
},


{
title:"Java Developer",
company:"Infospark Pvt Ltd",
category:"Software Development",
location:"Chennai",
jobType:"Full Time",
workMode:"On-site",
experience:"Fresher",
salary:"4-6 LPA",
openings:2,
skills:"Java, Spring Boot, MySQL",
description:"Develop enterprise applications."
},


{
title:"UI UX Designer",
company:"PixelCraft Studio",
category:"Design",
location:"Hyderabad",
jobType:"Full Time",
workMode:"Hybrid",
experience:"Fresher",
salary:"3-5 LPA",
openings:1,
skills:"Figma, Wireframes, UX",
description:"Design user-friendly interfaces."
},


{
title:"QA Engineer",
company:"QualitySoft",
category:"Testing",
location:"Hyderabad",
jobType:"Full Time",
workMode:"On-site",
experience:"Fresher",
salary:"4-6 LPA",
openings:3,
skills:"Testing, Selenium, API Testing",
description:"Perform software testing."
},


{
title:"DevOps Engineer",
company:"CloudStack",
category:"Cloud",
location:"Bangalore",
jobType:"Full Time",
workMode:"Hybrid",
experience:"2-4 Years",
salary:"8-14 LPA",
openings:1,
skills:"AWS, Docker, CI/CD",
description:"Manage deployment pipelines."
},


{
title:"HR Recruiter",
company:"TalentConnect",
category:"Human Resources",
location:"Hyderabad",
jobType:"Full Time",
workMode:"Hybrid",
experience:"Fresher",
salary:"3-5 LPA",
openings:3,
skills:"Recruitment, Communication",
description:"Hire talented candidates."
},


{
title:"Business Analyst",
company:"FinTech Solutions",
category:"Business",
location:"Mumbai",
jobType:"Full Time",
workMode:"Hybrid",
experience:"1-2 Years",
salary:"6-9 LPA",
openings:2,
skills:"SQL, Excel, Power BI",
description:"Analyze business requirements."
},


{
title:"Cloud Engineer",
company:"CloudNova",
category:"Cloud",
location:"Hyderabad",
jobType:"Full Time",
workMode:"Hybrid",
experience:"1-3 Years",
salary:"7-12 LPA",
openings:2,
skills:"AWS, Azure, Linux",
description:"Manage cloud infrastructure."
},


{
title:"Mobile App Developer",
company:"AppVision",
category:"Mobile Development",
location:"Bangalore",
jobType:"Full Time",
workMode:"On-site",
experience:"1-3 Years",
salary:"6-10 LPA",
openings:2,
skills:"Android, Kotlin, Java",
description:"Develop mobile applications."
},


{
title:"MERN Stack Developer",
company:"WebSphere Technologies",
category:"Software Development",
location:"Hyderabad",
jobType:"Full Time",
workMode:"Hybrid",
experience:"1-3 Years",
salary:"7-12 LPA",
openings:2,
skills:"MongoDB, Express, React, Node",
description:"Build MERN applications."
},


{
title:"Angular Developer",
company:"TechBridge Solutions",
category:"Software Development",
location:"Bangalore",
jobType:"Full Time",
workMode:"On-site",
experience:"1-2 Years",
salary:"6-9 LPA",
openings:2,
skills:"Angular, TypeScript, HTML",
description:"Develop Angular applications."
},


{
title:"SQL Developer",
company:"DataWorks India",
category:"Database",
location:"Chennai",
jobType:"Full Time",
workMode:"Hybrid",
experience:"0-2 Years",
salary:"5-8 LPA",
openings:3,
skills:"SQL, MySQL, Database",
description:"Create and optimize database queries."
},


{
title:"Machine Learning Intern",
company:"AI Labs",
category:"Artificial Intelligence",
location:"Remote",
jobType:"Internship",
workMode:"Remote",
experience:"Fresher",
salary:"25K/month",
openings:5,
skills:"Python, ML, Pandas",
description:"Work on machine learning projects."
},


{
title:"Content Writer",
company:"MediaSphere",
category:"Content",
location:"Hyderabad",
jobType:"Full Time",
workMode:"Hybrid",
experience:"Fresher",
salary:"3-5 LPA",
openings:2,
skills:"SEO, Writing, Research",
description:"Create technical content."
},


{
title:"Product Manager",
company:"StartupX",
category:"Product",
location:"Bangalore",
jobType:"Full Time",
workMode:"Hybrid",
experience:"3-5 Years",
salary:"12-18 LPA",
openings:1,
skills:"Agile, Product Strategy",
description:"Manage product roadmap."
},


{
title:"Cyber Security Analyst",
company:"SecureNet",
category:"Security",
location:"Pune",
jobType:"Full Time",
workMode:"On-site",
experience:"1-3 Years",
salary:"8-12 LPA",
openings:2,
skills:"Security, Networking",
description:"Monitor security threats."
},


{
title:"AWS Cloud Engineer",
company:"CloudMatrix",
category:"Cloud",
location:"Hyderabad",
jobType:"Full Time",
workMode:"Hybrid",
experience:"2-4 Years",
salary:"10-15 LPA",
openings:2,
skills:"AWS, EC2, S3",
description:"Manage AWS services."
},


{
title:"Automation Tester",
company:"QualityLabs",
category:"Testing",
location:"Hyderabad",
jobType:"Full Time",
workMode:"Hybrid",
experience:"1-2 Years",
salary:"5-8 LPA",
openings:2,
skills:"Selenium, Java",
description:"Automate testing workflows."
},


{
title:"Technical Support Engineer",
company:"SupportPro",
category:"Support",
location:"Hyderabad",
jobType:"Full Time",
workMode:"On-site",
experience:"Fresher",
salary:"3-5 LPA",
openings:5,
skills:"Linux, Networking",
description:"Provide technical support."
},


{
title:"Business Development Executive",
company:"GrowthPoint",
category:"Sales",
location:"Hyderabad",
jobType:"Full Time",
workMode:"On-site",
experience:"Fresher",
salary:"3-6 LPA",
openings:4,
skills:"Sales, Communication",
description:"Generate business opportunities."
},


{
title:"UI Developer",
company:"DesignTech",
category:"Design",
location:"Remote",
jobType:"Full Time",
workMode:"Remote",
experience:"0-2 Years",
salary:"5-8 LPA",
openings:2,
skills:"HTML, CSS, JavaScript",
description:"Create UI components."
},


{
title:"React Native Developer",
company:"MobileFirst",
category:"Mobile Development",
location:"Bangalore",
jobType:"Full Time",
workMode:"Hybrid",
experience:"1-3 Years",
salary:"8-12 LPA",
openings:2,
skills:"React Native, JavaScript",
description:"Develop mobile apps."
},


{
title:"DevOps Intern",
company:"NextCloud",
category:"Cloud",
location:"Remote",
jobType:"Internship",
workMode:"Remote",
experience:"Fresher",
salary:"20K/month",
openings:3,
skills:"Git, AWS, Linux",
description:"Learn DevOps practices."
},


{
title:"Data Science Intern",
company:"InsightAI",
category:"Data Science",
location:"Pune",
jobType:"Internship",
workMode:"Hybrid",
experience:"Fresher",
salary:"25K/month",
openings:3,
skills:"Python, Statistics",
description:"Work with data science team."
}


];





const seedJobs = async()=>{

try{


await mongoose.connect(
process.env.MONGO_URI
);


console.log("MongoDB Connected");



await Job.deleteMany({

postedBy: recruiterId

});



const jobsWithRecruiter = jobs.map(job=>({

...job,

postedBy: recruiterId

}));



await Job.insertMany(
jobsWithRecruiter
);



console.log(
`${jobs.length} Jobs added successfully ✅`
);



process.exit(0);


}
catch(error){


console.log(
"Seeder Error:",
error
);


process.exit(1);


}

};


seedJobs();