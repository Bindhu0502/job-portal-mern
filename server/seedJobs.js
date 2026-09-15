import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "./models/Job.js";

dotenv.config();

// ============================================================
// RECRUITER ID
// ============================================================

const recruiterId = new mongoose.Types.ObjectId(
  "6a7177af98757d24655aee80"
);

// ============================================================
// 50 JOBS
// ============================================================

const jobs = [

  // 1
  {
    title: "Frontend Developer",
    company: "TechNova Solutions",
    category: "Frontend",
    location: "Hyderabad",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "Fresher",
    salary: "4-6 LPA",
    openings: 3,
    skills: "React, JavaScript, HTML, CSS",
    description: "Build responsive and modern web applications using React and JavaScript."
  },

  // 2
  {
    title: "React JS Developer",
    company: "CareerHub Technologies",
    category: "Frontend",
    location: "Bangalore",
    jobType: "Full Time",
    workMode: "On-site",
    experience: "1-2 Years",
    salary: "6-8 LPA",
    openings: 2,
    skills: "React, Redux, JavaScript, Tailwind CSS",
    description: "Develop scalable and reusable React applications."
  },

  // 3
  {
    title: "Data Analyst",
    company: "AnalyticsPro",
    category: "Data Analytics",
    location: "Pune",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "0-2 Years",
    salary: "5-7 LPA",
    openings: 3,
    skills: "SQL, Excel, Power BI, Python",
    description: "Analyze business data and create meaningful reports and dashboards."
  },

  // 4
  {
    title: "Power BI Developer",
    company: "Analytics Hub",
    category: "Business Intelligence",
    location: "Hyderabad",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "0-2 Years",
    salary: "5-8 LPA",
    openings: 2,
    skills: "Power BI, DAX, SQL, Excel",
    description: "Create interactive Power BI dashboards and business intelligence reports."
  },

  // 5
  {
    title: "Backend Developer",
    company: "CodeWave Technologies",
    category: "Backend",
    location: "Hyderabad",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "1-3 Years",
    salary: "7-10 LPA",
    openings: 2,
    skills: "Node.js, Express, MongoDB, REST API",
    description: "Develop secure and scalable backend APIs."
  },

  // 6
  {
    title: "Full Stack Developer",
    company: "InnovateTech",
    category: "Full Stack",
    location: "Bangalore",
    jobType: "Full Time",
    workMode: "Remote",
    experience: "1-3 Years",
    salary: "8-12 LPA",
    openings: 3,
    skills: "React, Node.js, MongoDB, Express",
    description: "Work on complete web applications using modern full stack technologies."
  },

  // 7
  {
    title: "Python Developer",
    company: "CloudSphere",
    category: "Backend",
    location: "Remote",
    jobType: "Full Time",
    workMode: "Remote",
    experience: "1-3 Years",
    salary: "7-10 LPA",
    openings: 2,
    skills: "Python, Django, REST API, PostgreSQL",
    description: "Develop reliable backend services using Python."
  },

  // 8
  {
    title: "Java Developer",
    company: "Infospark Pvt Ltd",
    category: "Backend",
    location: "Chennai",
    jobType: "Full Time",
    workMode: "On-site",
    experience: "Fresher",
    salary: "4-6 LPA",
    openings: 3,
    skills: "Java, Spring Boot, MySQL, REST API",
    description: "Develop enterprise applications using Java and Spring Boot."
  },

  // 9
  {
    title: "UI UX Designer",
    company: "PixelCraft Studio",
    category: "Design",
    location: "Hyderabad",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "Fresher",
    salary: "3-5 LPA",
    openings: 2,
    skills: "Figma, Wireframes, UX, UI Design",
    description: "Design attractive and user-friendly digital experiences."
  },

  // 10
  {
    title: "QA Engineer",
    company: "QualitySoft",
    category: "Testing",
    location: "Hyderabad",
    jobType: "Full Time",
    workMode: "On-site",
    experience: "Fresher",
    salary: "4-6 LPA",
    openings: 3,
    skills: "Manual Testing, Selenium, API Testing",
    description: "Test applications and identify software defects."
  },

  // 11
  {
    title: "DevOps Engineer",
    company: "CloudStack",
    category: "DevOps",
    location: "Bangalore",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "2-4 Years",
    salary: "8-14 LPA",
    openings: 2,
    skills: "AWS, Docker, Jenkins, CI/CD",
    description: "Manage cloud infrastructure and deployment pipelines."
  },

  // 12
  {
    title: "HR Recruiter",
    company: "TalentConnect",
    category: "Human Resources",
    location: "Hyderabad",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "Fresher",
    salary: "3-5 LPA",
    openings: 4,
    skills: "Recruitment, Communication, HR",
    description: "Identify and recruit talented candidates for technology roles."
  },

  // 13
  {
    title: "Business Analyst",
    company: "FinTech Solutions",
    category: "Business",
    location: "Mumbai",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "1-2 Years",
    salary: "6-9 LPA",
    openings: 2,
    skills: "SQL, Excel, Power BI, Communication",
    description: "Analyze business requirements and provide data-driven insights."
  },

  // 14
  {
    title: "Cloud Engineer",
    company: "CloudNova",
    category: "Cloud",
    location: "Hyderabad",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "1-3 Years",
    salary: "7-12 LPA",
    openings: 2,
    skills: "AWS, Azure, Linux, Networking",
    description: "Manage and maintain cloud infrastructure."
  },

  // 15
  {
    title: "Mobile App Developer",
    company: "AppVision",
    category: "Mobile Development",
    location: "Bangalore",
    jobType: "Full Time",
    workMode: "On-site",
    experience: "1-3 Years",
    salary: "6-10 LPA",
    openings: 2,
    skills: "Android, Kotlin, Java",
    description: "Develop and maintain modern Android applications."
  },

  // 16
  {
    title: "MERN Stack Developer",
    company: "WebSphere Technologies",
    category: "Full Stack",
    location: "Hyderabad",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "1-3 Years",
    salary: "7-12 LPA",
    openings: 3,
    skills: "MongoDB, Express, React, Node.js",
    description: "Build complete web applications using the MERN stack."
  },

  // 17
  {
    title: "Angular Developer",
    company: "TechBridge Solutions",
    category: "Frontend",
    location: "Bangalore",
    jobType: "Full Time",
    workMode: "On-site",
    experience: "1-2 Years",
    salary: "6-9 LPA",
    openings: 2,
    skills: "Angular, TypeScript, HTML, CSS",
    description: "Develop enterprise web applications using Angular."
  },

  // 18
  {
    title: "SQL Developer",
    company: "DataWorks India",
    category: "Database",
    location: "Chennai",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "0-2 Years",
    salary: "5-8 LPA",
    openings: 3,
    skills: "SQL, MySQL, Database, PL/SQL",
    description: "Create and optimize database queries and stored procedures."
  },

  // 19
  {
    title: "Machine Learning Intern",
    company: "AI Labs",
    category: "Artificial Intelligence",
    location: "Remote",
    jobType: "Internship",
    workMode: "Remote",
    experience: "Fresher",
    salary: "25K/month",
    openings: 5,
    skills: "Python, Machine Learning, Pandas, NumPy",
    description: "Work with the AI team on machine learning projects."
  },

  // 20
  {
    title: "Content Writer",
    company: "MediaSphere",
    category: "Content",
    location: "Hyderabad",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "Fresher",
    salary: "3-5 LPA",
    openings: 2,
    skills: "SEO, Writing, Research, Communication",
    description: "Create high-quality technical and marketing content."
  },

  // 21
  {
    title: "Product Manager",
    company: "StartupX",
    category: "Product",
    location: "Bangalore",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "3-5 Years",
    salary: "12-18 LPA",
    openings: 1,
    skills: "Agile, Product Strategy, Jira, Communication",
    description: "Manage product strategy, roadmap and delivery."
  },

  // 22
  {
    title: "Cyber Security Analyst",
    company: "SecureNet",
    category: "Cyber Security",
    location: "Pune",
    jobType: "Full Time",
    workMode: "On-site",
    experience: "1-3 Years",
    salary: "8-12 LPA",
    openings: 2,
    skills: "Cyber Security, Networking, SIEM, Linux",
    description: "Monitor systems and identify potential security threats."
  },

  // 23
  {
    title: "AWS Cloud Engineer",
    company: "CloudMatrix",
    category: "Cloud",
    location: "Hyderabad",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "2-4 Years",
    salary: "10-15 LPA",
    openings: 2,
    skills: "AWS, EC2, S3, IAM, CloudFormation",
    description: "Manage AWS infrastructure and cloud services."
  },

  // 24
  {
    title: "Automation Tester",
    company: "QualityLabs",
    category: "Testing",
    location: "Hyderabad",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "1-2 Years",
    salary: "5-8 LPA",
    openings: 2,
    skills: "Selenium, Java, TestNG, Automation Testing",
    description: "Build automated testing frameworks and test applications."
  },

  // 25
  {
    title: "Technical Support Engineer",
    company: "SupportPro",
    category: "Technical Support",
    location: "Hyderabad",
    jobType: "Full Time",
    workMode: "On-site",
    experience: "Fresher",
    salary: "3-5 LPA",
    openings: 5,
    skills: "Linux, Networking, Troubleshooting, Communication",
    description: "Provide technical assistance and resolve customer issues."
  },

  // 26
  {
    title: "Business Development Executive",
    company: "GrowthPoint",
    category: "Sales",
    location: "Hyderabad",
    jobType: "Full Time",
    workMode: "On-site",
    experience: "Fresher",
    salary: "3-6 LPA",
    openings: 4,
    skills: "Sales, Communication, Negotiation",
    description: "Generate new business opportunities and maintain client relationships."
  },

  // 27
  {
    title: "UI Developer",
    company: "DesignTech",
    category: "Frontend",
    location: "Remote",
    jobType: "Full Time",
    workMode: "Remote",
    experience: "0-2 Years",
    salary: "5-8 LPA",
    openings: 2,
    skills: "HTML, CSS, JavaScript, React",
    description: "Create responsive and accessible user interfaces."
  },

  // 28
  {
    title: "React Native Developer",
    company: "MobileFirst",
    category: "Mobile Development",
    location: "Bangalore",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "1-3 Years",
    salary: "8-12 LPA",
    openings: 2,
    skills: "React Native, JavaScript, Redux",
    description: "Develop cross-platform mobile applications."
  },

  // 29
  {
    title: "DevOps Intern",
    company: "NextCloud",
    category: "DevOps",
    location: "Remote",
    jobType: "Internship",
    workMode: "Remote",
    experience: "Fresher",
    salary: "20K/month",
    openings: 3,
    skills: "Git, AWS, Linux, Docker",
    description: "Learn DevOps tools and cloud deployment practices."
  },

  // 30
  {
    title: "Data Science Intern",
    company: "InsightAI",
    category: "Data Science",
    location: "Pune",
    jobType: "Internship",
    workMode: "Hybrid",
    experience: "Fresher",
    salary: "25K/month",
    openings: 3,
    skills: "Python, Statistics, Pandas, Machine Learning",
    description: "Work with the data science team on analytical projects."
  },

  // 31
  {
    title: "Software Engineer",
    company: "GoogleTech Labs",
    category: "Software Development",
    location: "Bangalore",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "1-3 Years",
    salary: "10-18 LPA",
    openings: 4,
    skills: "Java, Python, JavaScript, Data Structures",
    description: "Develop scalable software solutions using modern technologies."
  },

  // 32
  {
    title: "Frontend Engineer",
    company: "Microsoft Solutions",
    category: "Frontend",
    location: "Hyderabad",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "1-3 Years",
    salary: "8-14 LPA",
    openings: 3,
    skills: "React, TypeScript, JavaScript, CSS",
    description: "Build high-quality frontend applications and user interfaces."
  },

  // 33
  {
    title: "Data Engineer",
    company: "Amazon Data Services",
    category: "Data Engineering",
    location: "Chennai",
    jobType: "Full Time",
    workMode: "On-site",
    experience: "2-4 Years",
    salary: "10-16 LPA",
    openings: 2,
    skills: "Python, SQL, AWS, ETL",
    description: "Build data pipelines and scalable data processing systems."
  },

  // 34
  {
    title: "Java Spring Boot Developer",
    company: "Accenture Technologies",
    category: "Backend",
    location: "Bangalore",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "1-3 Years",
    salary: "6-10 LPA",
    openings: 3,
    skills: "Java, Spring Boot, REST API, MySQL",
    description: "Develop backend services using Java and Spring Boot."
  },

  // 35
  {
    title: "Python Django Developer",
    company: "Wipro Digital",
    category: "Backend",
    location: "Hyderabad",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "1-3 Years",
    salary: "6-10 LPA",
    openings: 2,
    skills: "Python, Django, REST API, PostgreSQL",
    description: "Develop scalable backend applications using Python and Django."
  },

  // 36
  {
    title: "Power BI Analyst",
    company: "Deloitte Analytics",
    category: "Business Intelligence",
    location: "Hyderabad",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "0-2 Years",
    salary: "5-8 LPA",
    openings: 3,
    skills: "Power BI, DAX, SQL, Excel",
    description: "Create dashboards and analyze business performance data."
  },

  // 37
  {
    title: "Excel Data Analyst",
    company: "FinData Solutions",
    category: "Data Analytics",
    location: "Mumbai",
    jobType: "Full Time",
    workMode: "On-site",
    experience: "Fresher",
    salary: "3-5 LPA",
    openings: 2,
    skills: "Excel, SQL, Power Query, Power BI",
    description: "Analyze datasets and prepare business reports using Excel."
  },

  // 38
  {
    title: "Junior Web Developer",
    company: "WebWorks India",
    category: "Web Development",
    location: "Hyderabad",
    jobType: "Full Time",
    workMode: "On-site",
    experience: "Fresher",
    salary: "3-5 LPA",
    openings: 4,
    skills: "HTML, CSS, JavaScript, Bootstrap",
    description: "Develop and maintain responsive websites."
  },

  // 39
  {
    title: "Graduate Software Trainee",
    company: "HCL Technologies",
    category: "Software Development",
    location: "Noida",
    jobType: "Full Time",
    workMode: "On-site",
    experience: "Fresher",
    salary: "4-6 LPA",
    openings: 10,
    skills: "Java, SQL, JavaScript, Problem Solving",
    description: "Join our graduate technology program and develop software solutions."
  },

  // 40
  {
    title: "Associate Software Engineer",
    company: "Cognizant",
    category: "Software Development",
    location: "Pune",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "Fresher",
    salary: "4-6 LPA",
    openings: 8,
    skills: "Java, SQL, Python, Git",
    description: "Work with development teams to build enterprise applications."
  },

  // 41
  {
    title: "IT Support Associate",
    company: "TechSupport India",
    category: "Technical Support",
    location: "Hyderabad",
    jobType: "Full Time",
    workMode: "On-site",
    experience: "Fresher",
    salary: "3-5 LPA",
    openings: 6,
    skills: "Windows, Networking, Troubleshooting, MS Office",
    description: "Provide IT support and troubleshoot technical issues."
  },

  // 42
  {
    title: "Cloud Support Associate",
    company: "AWS Partner Solutions",
    category: "Cloud",
    location: "Bangalore",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "Fresher",
    salary: "4-7 LPA",
    openings: 5,
    skills: "AWS, Linux, Networking, Cloud",
    description: "Assist customers with cloud infrastructure and technical issues."
  },

  // 43
  {
    title: "Cyber Security Intern",
    company: "SecureTech Labs",
    category: "Cyber Security",
    location: "Hyderabad",
    jobType: "Internship",
    workMode: "Hybrid",
    experience: "Fresher",
    salary: "15K/month",
    openings: 4,
    skills: "Networking, Linux, Cyber Security, SIEM",
    description: "Assist the security team with monitoring and security analysis."
  },

  // 44
  {
    title: "Machine Learning Engineer",
    company: "AI Innovations",
    category: "Artificial Intelligence",
    location: "Bangalore",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "2-4 Years",
    salary: "12-20 LPA",
    openings: 2,
    skills: "Python, TensorFlow, Machine Learning, SQL",
    description: "Build and deploy machine learning models for business applications."
  },

  // 45
  {
    title: "Business Intelligence Analyst",
    company: "Insight Consulting",
    category: "Business Intelligence",
    location: "Pune",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "1-3 Years",
    salary: "6-10 LPA",
    openings: 2,
    skills: "Power BI, SQL, Excel, DAX",
    description: "Transform business data into actionable insights."
  },

  // 46
  {
    title: "Technical Chat Support Associate",
    company: "CustomerFirst Technologies",
    category: "Customer Support",
    location: "Hyderabad",
    jobType: "Full Time",
    workMode: "On-site",
    experience: "Fresher",
    salary: "3-5 LPA",
    openings: 10,
    skills: "Communication, MS Office, Troubleshooting",
    description: "Assist customers through technical chat support and resolve issues."
  },

  // 47
  {
    title: "Digital Marketing Executive",
    company: "MarketGrow",
    category: "Marketing",
    location: "Hyderabad",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "Fresher",
    salary: "3-5 LPA",
    openings: 3,
    skills: "SEO, Social Media, Google Analytics, Content",
    description: "Support digital marketing campaigns and online growth initiatives."
  },

  // 48
  {
    title: "Project Coordinator",
    company: "Enterprise Solutions India",
    category: "Project Management",
    location: "Mumbai",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "1-2 Years",
    salary: "5-8 LPA",
    openings: 2,
    skills: "MS Excel, Communication, Jira, Project Management",
    description: "Coordinate project activities and support project delivery teams."
  },

  // 49
  {
    title: "Recruitment Coordinator",
    company: "TalentBridge",
    category: "Human Resources",
    location: "Bangalore",
    jobType: "Full Time",
    workMode: "Hybrid",
    experience: "Fresher",
    salary: "3-5 LPA",
    openings: 3,
    skills: "Recruitment, Communication, Excel, HR",
    description: "Support recruitment operations and candidate coordination."
  },

  // 50
  {
    title: "Software Testing Intern",
    company: "TestPro Technologies",
    category: "Testing",
    location: "Chennai",
    jobType: "Internship",
    workMode: "On-site",
    experience: "Fresher",
    salary: "15K/month",
    openings: 5,
    skills: "Manual Testing, Selenium, SQL, API Testing",
    description: "Learn software testing processes and assist QA engineers."
  }

];

// ============================================================
// ADD RECRUITER ID TO EVERY JOB
// ============================================================

const jobsWithRecruiter = jobs.map((job) => ({
  ...job,
  postedBy: recruiterId,
  isActive: true
}));

// ============================================================
// SEED DATABASE
// ============================================================

const seedJobs = async () => {

  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("=================================");
    console.log("MongoDB Connected Successfully ✅");
    console.log("=================================");

    // Remove existing jobs
    await Job.deleteMany({});

    console.log("Existing jobs deleted 🗑️");

    // Insert 50 jobs
    await Job.insertMany(jobsWithRecruiter);

    console.log("=================================");
    console.log(`${jobsWithRecruiter.length} JOBS ADDED SUCCESSFULLY ✅`);
    console.log("=================================");

    await mongoose.connection.close();

    console.log("MongoDB connection closed.");

    process.exit(0);

  } catch (error) {

    console.error("=================================");
    console.error("SEED JOB ERROR ❌");
    console.error(error);
    console.error("=================================");

    try {
      await mongoose.connection.close();
    } catch (closeError) {
      console.log("Database close error:", closeError.message);
    }

    process.exit(1);

  }

};

seedJobs();