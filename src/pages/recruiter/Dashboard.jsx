import {
  useEffect,
  useState,
} from "react";

import {
  Briefcase,
  Users,
  CheckCircle,
  TrendingUp,
  Plus,
  ArrowRight,
  FileText,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  Link,
} from "react-router-dom";

import api from "../../services/api";

import RecruiterLayout from "../../components/recruiter/RecruiterLayout";


// ============================================================
// RECRUITER DASHBOARD
// ============================================================

function Dashboard() {

  // ==========================================================
  // STATE
  // ==========================================================

  const [dashboard, setDashboard] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    hiringRate: 0,
    statusCount: {},
    jobPerformance: [],
    recentApplications: [],
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ==========================================================
  // FETCH DASHBOARD
  // ==========================================================

  useEffect(() => {

    fetchDashboard();

  }, []);


  const fetchDashboard = async () => {

    try {

      setLoading(true);

      setError("");

      const res = await api.get(
        "/recruiter/dashboard"
      );

      console.log(
        "RECRUITER DASHBOARD:",
        res.data
      );

      setDashboard(
        res.data?.dashboard || {
          totalJobs: 0,
          activeJobs: 0,
          totalApplications: 0,
          hiringRate: 0,
          statusCount: {},
          jobPerformance: [],
          recentApplications: [],
        }
      );

    }

    catch (error) {

      console.error(
        "RECRUITER DASHBOARD ERROR:",
        error.response?.data || error
      );

      setError(
        error.response?.data?.message ||
        "Unable to load recruiter dashboard."
      );

    }

    finally {

      setLoading(false);

    }

  };


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {

    return (

      <RecruiterLayout>

        <div className="
          min-h-[60vh]
          flex
          items-center
          justify-center
        ">

          <div className="text-center">

            <div className="
              w-10
              h-10
              border-4
              border-blue-200
              border-t-blue-600
              rounded-full
              animate-spin
              mx-auto
            " />

            <p className="
              mt-4
              text-gray-500
              font-medium
            ">

              Loading Recruiter Dashboard...

            </p>

          </div>

        </div>

      </RecruiterLayout>

    );

  }


  // ==========================================================
  // ERROR
  // ==========================================================

  if (error) {

    return (

      <RecruiterLayout>

        <div className="
          min-h-[60vh]
          flex
          items-center
          justify-center
          px-6
        ">

          <div className="
            bg-white
            rounded-2xl
            shadow
            p-8
            max-w-md
            text-center
          ">

            <div className="
              w-14
              h-14
              bg-red-100
              text-red-600
              rounded-full
              flex
              items-center
              justify-center
              mx-auto
              mb-4
            ">

              <FileText size={25} />

            </div>

            <h2 className="
              text-xl
              font-bold
              text-gray-900
            ">

              Dashboard Error

            </h2>

            <p className="
              text-gray-500
              mt-2
            ">

              {error}

            </p>

            <button
              onClick={fetchDashboard}
              className="
                mt-5
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-5
                py-2.5
                rounded-lg
                font-medium
              "
            >

              Try Again

            </button>

          </div>

        </div>

      </RecruiterLayout>

    );

  }


  // ==========================================================
  // STAT CARDS
  // ==========================================================

  const cards = [

    {
      title: "Total Jobs",
      value: dashboard.totalJobs || 0,
      icon: <Briefcase size={25} />,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },

    {
      title: "Active Jobs",
      value: dashboard.activeJobs || 0,
      icon: <CheckCircle size={25} />,
      bg: "bg-green-100",
      color: "text-green-600",
    },

    {
      title: "Applications",
      value: dashboard.totalApplications || 0,
      icon: <Users size={25} />,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },

    {
      title: "Hiring Rate",
      value: `${dashboard.hiringRate || 0}%`,
      icon: <TrendingUp size={25} />,
      bg: "bg-orange-100",
      color: "text-orange-600",
    },

  ];


  // ==========================================================
  // APPLICATION STATUS DATA
  // ==========================================================

  const statusData = [

    {
      name: "Applied",
      value:
        dashboard.statusCount?.Applied || 0,
    },

    {
      name: "Reviewed",
      value:
        dashboard.statusCount?.Reviewed || 0,
    },

    {
      name: "Shortlisted",
      value:
        dashboard.statusCount?.Shortlisted || 0,
    },

    {
      name: "Selected",
      value:
        dashboard.statusCount?.Selected || 0,
    },

    {
      name: "Rejected",
      value:
        dashboard.statusCount?.Rejected || 0,
    },

  ];


  // ==========================================================
  // TOTAL APPLICATION STATUS
  // ==========================================================

  const totalStatusApplications =
    statusData.reduce(
      (total, item) =>
        total + item.value,
      0
    );


  // ==========================================================
  // STATUS COLORS
  // ==========================================================

  const statusColors = [
    "#3b82f6",
    "#eab308",
    "#a855f7",
    "#22c55e",
    "#ef4444",
  ];


  // ==========================================================
  // STATUS STYLE
  // ==========================================================

  const getStatusStyle = (status) => {

    switch (
      status?.toLowerCase()
    ) {

      case "selected":
        return "bg-green-100 text-green-700";

      case "shortlisted":
        return "bg-purple-100 text-purple-700";

      case "reviewed":
        return "bg-yellow-100 text-yellow-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-blue-100 text-blue-700";

    }

  };


  // ==========================================================
  // MAIN UI
  // ==========================================================

  return (

    <RecruiterLayout>

      <div className="
        min-h-screen
        bg-gray-50
        -m-6
        p-6
      ">


        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-5
          mb-8
        ">

          <div>

            <p className="
              text-sm
              text-blue-600
              font-semibold
              mb-1
            ">

              CareerHub Recruiter Portal

            </p>

            <h1 className="
              text-3xl
              font-bold
              text-gray-900
            ">

              Recruiter Dashboard

            </h1>

            <p className="
              text-gray-500
              mt-2
            ">

              Manage your job postings and
              find the right candidates.

            </p>

          </div>


          <Link
            to="/recruiter/create-job"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-5
              py-3
              rounded-xl
              font-semibold
              shadow-sm
              transition
            "
          >

            <Plus size={19} />

            Post New Job

          </Link>

        </div>


        {/* ====================================================
            STAT CARDS
        ==================================================== */}

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-5
          mb-8
        ">

          {cards.map((card) => (

            <div
              key={card.title}
              className="
                bg-white
                rounded-2xl
                p-5
                shadow-sm
                border
                border-gray-100
                hover:shadow-md
                transition
              "
            >

              <div className="
                flex
                items-center
                justify-between
              ">

                <div>

                  <p className="
                    text-sm
                    text-gray-500
                  ">

                    {card.title}

                  </p>

                  <h2 className="
                    text-3xl
                    font-bold
                    text-gray-900
                    mt-2
                  ">

                    {card.value}

                  </h2>

                </div>


                <div
                  className={`
                    ${card.bg}
                    ${card.color}
                    w-12
                    h-12
                    rounded-xl
                    flex
                    items-center
                    justify-center
                  `}
                >

                  {card.icon}

                </div>

              </div>

            </div>

          ))}

        </div>


        {/* ====================================================
            CHARTS
        ==================================================== */}

        <div className="
          grid
          lg:grid-cols-2
          gap-6
          mb-8
        ">


          {/* ==================================================
              APPLICATION STATUS
          ================================================== */}

          <div className="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-gray-100
            p-6
          ">

            <div className="mb-4">

              <h2 className="
                text-xl
                font-bold
                text-gray-900
              ">

                Application Status

              </h2>

              <p className="
                text-sm
                text-gray-500
                mt-1
              ">

                Overview of candidate applications

              </p>

            </div>


            {totalStatusApplications > 0 ? (

              <div className="h-80">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <PieChart>

                    <Pie
                      data={statusData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={105}
                      innerRadius={55}
                      paddingAngle={3}
                      label
                    >

                      {statusData.map(
                        (item, index) => (

                          <Cell
                            key={item.name}
                            fill={
                              statusColors[index]
                            }
                          />

                        )
                      )}

                    </Pie>

                    <Tooltip />

                  </PieChart>

                </ResponsiveContainer>

              </div>

            ) : (

              <div className="
                h-80
                flex
                flex-col
                items-center
                justify-center
                text-gray-400
              ">

                <Users size={45} />

                <p className="mt-3">

                  No applications yet.

                </p>

              </div>

            )}

          </div>


          {/* ==================================================
              TOP PERFORMING JOBS
          ================================================== */}

          <div className="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-gray-100
            p-6
          ">

            <div className="mb-4">

              <h2 className="
                text-xl
                font-bold
                text-gray-900
              ">

                Top Performing Jobs

              </h2>

              <p className="
                text-sm
                text-gray-500
                mt-1
              ">

                Jobs receiving the most applications

              </p>

            </div>


            {dashboard.jobPerformance?.length > 0 ? (

              <div className="h-80">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={
                      dashboard.jobPerformance
                    }
                  >

                    <XAxis
                      dataKey="title"
                      tick={{
                        fontSize: 11,
                      }}
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="applications"
                      fill="#3b82f6"
                      radius={[
                        6,
                        6,
                        0,
                        0,
                      ]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            ) : (

              <div className="
                h-80
                flex
                flex-col
                items-center
                justify-center
                text-gray-400
              ">

                <Briefcase size={45} />

                <p className="mt-3">

                  No job performance data yet.

                </p>

                <Link
                  to="/recruiter/create-job"
                  className="
                    text-blue-600
                    text-sm
                    mt-2
                  "
                >

                  Create your first job →

                </Link>

              </div>

            )}

          </div>

        </div>


        {/* ====================================================
            RECENT APPLICATIONS
        ==================================================== */}

        <div className="
          bg-white
          rounded-2xl
          shadow-sm
          border
          border-gray-100
          p-6
          mb-8
        ">

          <div className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-3
            mb-5
          ">

            <div>

              <h2 className="
                text-xl
                font-bold
                text-gray-900
              ">

                Recent Applications

              </h2>

              <p className="
                text-sm
                text-gray-500
                mt-1
              ">

                Latest candidates who applied to your jobs.

              </p>

            </div>


            <Link
              to="/recruiter/applications"
              className="
                inline-flex
                items-center
                gap-1
                text-blue-600
                text-sm
                font-semibold
                hover:underline
              "
            >

              View All

              <ArrowRight size={16} />

            </Link>

          </div>


          {dashboard.recentApplications?.length > 0 ? (

            <div className="
              overflow-x-auto
            ">

              <table className="
                w-full
                min-w-[600px]
              ">

                <thead>

                  <tr className="
                    border-b
                    bg-gray-50
                  ">

                    <th className="
                      text-left
                      p-4
                      text-sm
                      text-gray-500
                      font-semibold
                    ">

                      Candidate

                    </th>

                    <th className="
                      text-left
                      p-4
                      text-sm
                      text-gray-500
                      font-semibold
                    ">

                      Job

                    </th>

                    <th className="
                      text-left
                      p-4
                      text-sm
                      text-gray-500
                      font-semibold
                    ">

                      Status

                    </th>

                    <th className="
                      text-left
                      p-4
                      text-sm
                      text-gray-500
                      font-semibold
                    ">

                      Date

                    </th>

                  </tr>

                </thead>


                <tbody>

                  {dashboard.recentApplications
                    .slice(0, 8)
                    .map((app) => (

                      <tr
                        key={app._id}
                        className="
                          border-b
                          last:border-0
                          hover:bg-gray-50
                          transition
                        "
                      >

                        <td className="p-4">

                          <div>

                            <p className="
                              font-semibold
                              text-gray-900
                            ">

                              {
                                app.user?.name ||
                                app.fullName ||
                                "Candidate"
                              }

                            </p>

                            <p className="
                              text-xs
                              text-gray-500
                              mt-1
                            ">

                              {
                                app.user?.email ||
                                app.email ||
                                ""
                              }

                            </p>

                          </div>

                        </td>


                        <td className="p-4">

                          <p className="
                            font-medium
                            text-gray-800
                          ">

                            {
                              app.job?.title ||
                              "Job"
                            }

                          </p>

                        </td>


                        <td className="p-4">

                          <span
                            className={`
                              ${getStatusStyle(
                                app.status
                              )}
                              px-3
                              py-1.5
                              rounded-full
                              text-xs
                              font-semibold
                            `}
                          >

                            {
                              app.status ||
                              "Applied"
                            }

                          </span>

                        </td>


                        <td className="
                          p-4
                          text-sm
                          text-gray-500
                        ">

                          {
                            app.createdAt
                              ? new Date(
                                  app.createdAt
                                ).toLocaleDateString()
                              : "Recently"
                          }

                        </td>

                      </tr>

                    ))}

                </tbody>

              </table>

            </div>

          ) : (

            <div className="
              py-12
              text-center
              text-gray-400
            ">

              <Users
                size={45}
                className="mx-auto"
              />

              <p className="mt-3">

                No applications found.

              </p>

              <p className="
                text-sm
                mt-1
              ">

                Applications will appear here when
                candidates apply to your jobs.

              </p>

            </div>

          )}

        </div>


        {/* ====================================================
            QUICK ACTIONS
        ==================================================== */}

        <div className="
          grid
          md:grid-cols-3
          gap-5
        ">


          <Link
            to="/recruiter/create-job"
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              rounded-2xl
              p-6
              transition
            "
          >

            <Plus size={28} />

            <h3 className="
              text-lg
              font-bold
              mt-4
            ">

              Post a New Job

            </h3>

            <p className="
              text-blue-100
              text-sm
              mt-1
            ">

              Create a job opening and start
              receiving applications.

            </p>

          </Link>


          <Link
            to="/recruiter/jobs"
            className="
              bg-white
              hover:shadow-md
              border
              border-gray-100
              rounded-2xl
              p-6
              transition
            "
          >

            <Briefcase
              size={28}
              className="text-blue-600"
            />

            <h3 className="
              text-lg
              font-bold
              mt-4
              text-gray-900
            ">

              Manage Jobs

            </h3>

            <p className="
              text-gray-500
              text-sm
              mt-1
            ">

              View, edit and manage your
              job postings.

            </p>

          </Link>


          <Link
            to="/recruiter/applications"
            className="
              bg-white
              hover:shadow-md
              border
              border-gray-100
              rounded-2xl
              p-6
              transition
            "
          >

            <Users
              size={28}
              className="text-purple-600"
            />

            <h3 className="
              text-lg
              font-bold
              mt-4
              text-gray-900
            ">

              Review Candidates

            </h3>

            <p className="
              text-gray-500
              text-sm
              mt-1
            ">

              Review applications and update
              candidate statuses.

            </p>

          </Link>


        </div>


      </div>

    </RecruiterLayout>

  );

}


export default Dashboard;