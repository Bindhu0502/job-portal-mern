import { useEffect, useState } from "react";

import api from "../services/api";

import StatCard from "../../components/admin/StatCard";

import {
  FaUsers,
  FaBriefcase,
  FaBuilding,
  FaFileAlt,
} from "react-icons/fa";


function AdminDashboard() {

  const [dashboard, setDashboard] = useState({
    stats: {
      totalUsers: 0,
      totalJobs: 0,
      totalCompanies: 0,
      totalApplications: 0,
    },
    recentJobs: [],
    recentApplications: [],
  });


  const [loading, setLoading] = useState(true);


  const [error, setError] = useState("");



  useEffect(() => {

    fetchDashboard();

  }, []);



  const fetchDashboard = async () => {

    try {

      setLoading(true);

      const res = await api.get(
        "/admin/dashboard"
      );


      setDashboard(res.data);


    } catch (err) {

      console.log(err);

      setError(
        "Unable to load dashboard data."
      );

    } finally {

      setLoading(false);

    }

  };



  if (loading) {

    return (

      <div className="text-center py-20 text-xl">

        Loading Dashboard...

      </div>

    );

  }



  if (error) {

    return (

      <div className="text-center py-20 text-red-500 text-xl">

        {error}

      </div>

    );

  }



  const stats = [

    {
      title: "Total Users",
      value:
        dashboard.stats.totalUsers || 0,
      icon: <FaUsers />,
      color: "bg-blue-600",
      percentage: 12,
    },


    {
      title: "Total Jobs",
      value:
        dashboard.stats.totalJobs || 0,
      icon: <FaBriefcase />,
      color: "bg-green-600",
      percentage: 8,
    },


    {
      title: "Companies",
      value:
        dashboard.stats.totalCompanies || 0,
      icon: <FaBuilding />,
      color: "bg-purple-600",
      percentage: 5,
    },


    {
      title: "Applications",
      value:
        dashboard.stats.totalApplications || 0,
      icon: <FaFileAlt />,
      color: "bg-orange-600",
      percentage: 15,
    },

  ];



  return (

    <div>


      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">

          Dashboard

        </h1>


        <p className="text-gray-500 mt-2">

          Welcome to CareerNest Admin Panel

        </p>

      </div>




      {/* Stats Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">


        {stats.map((item) => (

          <StatCard

            key={item.title}

            title={item.title}

            value={item.value}

            icon={item.icon}

            color={item.color}

            percentage={item.percentage}

          />

        ))}


      </div>





      {/* Recent Data */}

      <div className="grid lg:grid-cols-2 gap-6 mt-10">



        {/* Recent Jobs */}

        <div className="bg-white rounded-2xl shadow p-6">


          <h2 className="text-xl font-bold mb-5">

            Recent Jobs

          </h2>



          {

            dashboard.recentJobs?.length === 0 ?

            (

              <p className="text-gray-500">

                No jobs found

              </p>

            )

            :

            (

              <div className="space-y-4">


                {dashboard.recentJobs?.map((job)=>(

                  <div

                    key={job._id}

                    className="border-b pb-3"

                  >

                    <h3 className="font-semibold">

                      {job.title}

                    </h3>


                    <p className="text-sm text-gray-500">

                      {job.company?.name ||
                       job.company}

                    </p>


                  </div>

                ))}


              </div>

            )

          }


        </div>





        {/* Recent Applications */}


        <div className="bg-white rounded-2xl shadow p-6">


          <h2 className="text-xl font-bold mb-5">

            Recent Applications

          </h2>



          {

            dashboard.recentApplications?.length === 0 ?

            (

              <p className="text-gray-500">

                No applications found

              </p>

            )

            :

            (

              <div className="space-y-4">


                {dashboard.recentApplications?.map(
                  (application)=>(

                  <div

                    key={application._id}

                    className="border-b pb-3"

                  >

                    <h3 className="font-semibold">

                      {
                        application.fullName ||
                        application.user?.name
                      }

                    </h3>


                    <p className="text-sm text-gray-500">

                      Applied for{" "}

                      {
                        application.job?.title
                      }

                    </p>


                  </div>


                ))}


              </div>

            )

          }


        </div>


      </div>


    </div>

  );

}


export default AdminDashboard;