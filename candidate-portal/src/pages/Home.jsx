import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../services/api";

import {
  Search,
  Briefcase,
  Users,
  Building2,
  ArrowRight,
  MapPin,
  IndianRupee,
} from "lucide-react";



function Home() {


  const [featuredJobs, setFeaturedJobs] = useState([]);

  const [loading, setLoading] = useState(true);




  const categories = [
    "Software Development",
    "Data Science",
    "UI/UX Design",
    "Cloud & DevOps",
    "Testing",
    "Mobile Development",
  ];




  const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "TCS",
    "Infosys",
    "Deloitte",
  ];





  useEffect(() => {

    fetchFeaturedJobs();

  }, []);





  const fetchFeaturedJobs = async () => {

    try {

      const res = await api.get("/jobs");


      setFeaturedJobs(
        res.data.jobs?.slice(0, 3) || []
      );


    } catch (error) {

      console.log(
        "Featured Jobs Error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };







  return (


    <div
      className="
      min-h-screen
      bg-white
      "
    >






      {/* HERO SECTION */}



      <section
        className="
        bg-gradient-to-r
        from-blue-600
        to-blue-500
        text-white
        "
      >


        <div
          className="
          max-w-7xl
          mx-auto
          px-6
          py-20
          grid
          md:grid-cols-2
          gap-10
          items-center
          "
        >



          <div>


            <h1
              className="
              text-5xl
              font-bold
              leading-tight
              "
            >

              Find Your Dream Job
              <br />
              With CareerHub

            </h1>



            <p
              className="
              mt-6
              text-lg
              text-blue-100
              "
            >

              Discover thousands of job opportunities
              from top companies and build your career.

            </p>





            <div
              className="
              flex
              gap-4
              mt-8
              "
            >


              <Link

                to="/jobs"

                className="
                bg-white
                text-blue-600
                px-6
                py-3
                rounded-lg
                font-semibold
                flex
                items-center
                gap-2
                "
              >

                <Search size={20}/>

                Search Jobs

              </Link>




              <Link

                to="/register"

                className="
                border
                border-white
                px-6
                py-3
                rounded-lg
                font-semibold
                "
              >

                Get Started

              </Link>



            </div>


          </div>






          <div
            className="
            bg-white
            rounded-3xl
            p-8
            shadow-xl
            text-gray-900
            "
          >


            <h2
              className="
              text-2xl
              font-bold
              "
            >

              Career Opportunities

            </h2>



            <div className="mt-6 space-y-4">



              <div
                className="
                bg-gray-100
                rounded-xl
                p-4
                flex
                gap-4
                items-center
                "
              >

                <Briefcase
                  className="text-blue-600"
                />


                <div>

                  <h3 className="font-bold">
                    1000+ Jobs
                  </h3>


                  <p className="text-gray-500">
                    Across categories
                  </p>

                </div>


              </div>





              <div
                className="
                bg-gray-100
                rounded-xl
                p-4
                flex
                gap-4
                items-center
                "
              >

                <Building2
                  className="text-blue-600"
                />


                <div>

                  <h3 className="font-bold">
                    Top Companies
                  </h3>


                  <p className="text-gray-500">
                    Best opportunities
                  </p>


                </div>


              </div>



            </div>


          </div>


        </div>


      </section>










      {/* FEATURED JOBS */}



      <section
        className="
        max-w-7xl
        mx-auto
        px-6
        py-16
        "
      >


        <div
          className="
          flex
          justify-between
          mb-8
          "
        >


          <h2
            className="
            text-3xl
            font-bold
            "
          >

            Featured Jobs

          </h2>



          <Link
            to="/jobs"
            className="
            text-blue-600
            font-semibold
            "
          >

            View All

          </Link>


        </div>





        {

          loading ?


          <p className="text-gray-500">

            Loading jobs...

          </p>



          :



          <div
            className="
            grid
            md:grid-cols-3
            gap-6
            "
          >


          {


            featuredJobs.map((job)=>(


              <div

                key={job._id}

                className="
                border
                rounded-2xl
                p-6
                shadow-sm
                hover:shadow-xl
                transition
                "
              >


                <Briefcase
                  className="text-blue-600 mb-4"
                />



                <h3
                  className="
                  text-xl
                  font-bold
                  "
                >

                  {job.title}

                </h3>



                <p
                  className="
                  text-blue-600
                  mt-2
                  font-semibold
                  "
                >

                  {
                    typeof job.company === "object"
                    ?
                    job.company?.name
                    :
                    job.company
                  }

                </p>





                <div
                  className="
                  mt-4
                  space-y-3
                  text-gray-600
                  "
                >


                  <p className="flex gap-2">

                    <MapPin size={18}/>

                    {job.location || "Not Specified"}

                  </p>



                  <p
                    className="
                    flex
                    gap-2
                    text-green-600
                    font-semibold
                    "
                  >

                    <IndianRupee size={18}/>

                    {job.salary || "Not Disclosed"}

                  </p>


                </div>





                <Link

                  to={`/jobs/${job._id}`}

                  className="
                  block
                  mt-6
                  bg-blue-600
                  text-white
                  text-center
                  py-3
                  rounded-lg
                  hover:bg-blue-700
                  "
                >

                  View Details

                </Link>



              </div>



            ))


          }


          </div>


        }



      </section>









      {/* CATEGORIES */}



      <section
        className="
        bg-gray-50
        py-16
        "
      >


        <div
          className="
          max-w-7xl
          mx-auto
          px-6
          "
        >


          <h2
            className="
            text-3xl
            font-bold
            text-center
            "
          >

            Popular Categories

          </h2>




          <div
            className="
            grid
            md:grid-cols-3
            lg:grid-cols-6
            gap-5
            mt-10
            "
          >


          {

            categories.map((category)=>(


              <Link

                key={category}

                to={`/jobs?category=${category}`}

                className="
                bg-white
                border
                rounded-xl
                p-5
                text-center
                hover:shadow-lg
                "
              >


                <Briefcase
                  className="
                  mx-auto
                  text-blue-600
                  mb-3
                  "
                />


                {category}


              </Link>


            ))

          }


          </div>


        </div>


      </section>










      {/* COMPANIES */}



      <section
        className="
        max-w-7xl
        mx-auto
        px-6
        py-16
        "
      >


        <h2
          className="
          text-3xl
          font-bold
          text-center
          "
        >

          Top Companies Hiring

        </h2>




        <div
          className="
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-6
          gap-5
          mt-10
          "
        >


        {

          companies.map((company)=>(


            <Link

              key={company}

              to={`/jobs?company=${company}`}

              className="
              border
              rounded-xl
              p-6
              text-center
              hover:shadow-lg
              "
            >


              <Building2
                className="
                mx-auto
                text-blue-600
                mb-3
                "
              />


              {company}


            </Link>


          ))

        }


        </div>


      </section>









      {/* WHY CHOOSE */}



      <section
        className="
        max-w-7xl
        mx-auto
        px-6
        py-16
        "
      >


        <h2
          className="
          text-3xl
          font-bold
          text-center
          "
        >

          Why Choose CareerHub?

        </h2>



        <div
          className="
          grid
          md:grid-cols-3
          gap-6
          mt-10
          "
        >


          <FeatureCard
            icon={<Search/>}
            title="Easy Job Search"
            text="Search jobs easily."
          />


          <FeatureCard
            icon={<Users/>}
            title="Candidate Friendly"
            text="Apply and track jobs."
          />


          <FeatureCard
            icon={<Building2/>}
            title="Trusted Companies"
            text="Connect with companies."
          />


        </div>


      </section>









      {/* CTA */}



      <section
        className="
        bg-blue-600
        py-16
        text-center
        text-white
        "
      >


        <h2
          className="
          text-3xl
          font-bold
          "
        >

          Ready to start your career?

        </h2>



        <Link

          to="/jobs"

          className="
          inline-flex
          items-center
          gap-2
          mt-6
          bg-white
          text-blue-600
          px-8
          py-3
          rounded-lg
          "
        >

          Explore Jobs

          <ArrowRight size={20}/>

        </Link>



      </section>




    </div>


  );


}







function FeatureCard({
icon,
title,
text
}){


return (

<div
className="
border
rounded-2xl
p-6
shadow-sm
"
>


<div className="text-blue-600 mb-4">

{icon}

</div>


<h3 className="text-xl font-bold">

{title}

</h3>


<p className="text-gray-500 mt-3">

{text}

</p>


</div>

);


}



export default Home;