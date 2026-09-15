import { useEffect, useState } from "react";

import {
  Briefcase,
  Bookmark,
  FileText,
  UserCheck,
  User,
  ArrowRight,
  AlertCircle,
  Search,
  MapPin,
  IndianRupee,
  CheckCircle,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import api from "../services/api";

import { useAuth } from "../context/authcontext.jsx";

function Dashboard() {
  // ============================================================
  // AUTH USER
  // ============================================================

  const { user } = useAuth();

  // ============================================================
  // STATE
  // ============================================================

  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(true);

  // ============================================================
  // USER NAME
  // ============================================================

  const userName =
    user?.name ||
    user?.fullName ||
    user?.firstName ||
    "Job Seeker";

  // ============================================================
  // FETCH DASHBOARD
  // ============================================================

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");

      setDashboard(res.data.dashboard || {});
    } catch (error) {
      console.log(
        "DASHBOARD ERROR",
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-500">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // STATS
  // ============================================================

  const stats = [
    {
      title: "Applied Jobs",
      value: dashboard.totalApplications || 0,
      icon: <FileText size={24} />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },

    {
      title: "Saved Jobs",
      value: dashboard.savedJobs || 0,
      icon: <Bookmark size={24} />,
      bg: "bg-orange-100",
      text: "text-orange-600",
    },

    {
      title: "Interviews",
      value: dashboard.interviews || 0,
      icon: <UserCheck size={24} />,
      bg: "bg-green-100",
      text: "text-green-600",
    },

    {
      title: "Recommended",
      value: dashboard.recommendedJobs?.length || 0,
      icon: <Briefcase size={24} />,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
  ];

  // ============================================================
  // CHART DATA
  // ============================================================

  const chartData = [
    {
      name: "Applied",
      value: dashboard.totalApplications || 0,
    },

    {
      name: "Saved",
      value: dashboard.savedJobs || 0,
    },

    {
      name: "Interviews",
      value: dashboard.interviews || 0,
    },
  ];

  // ============================================================
  // COMPANY NAME
  // ============================================================

  const getCompany = (job) => {
    if (typeof job?.company === "object") {
      return job.company?.name || "Company";
    }

    return job?.company || "Company";
  };

  // ============================================================
  // APPLICATION STATUS STYLE
  // ============================================================

  const getStatusStyle = (status) => {
    const currentStatus = status?.toLowerCase();

    if (currentStatus === "shortlisted") {
      return "bg-green-100 text-green-700";
    }

    if (currentStatus === "interview") {
      return "bg-purple-100 text-purple-700";
    }

    if (currentStatus === "rejected") {
      return "bg-red-100 text-red-700";
    }

    if (currentStatus === "hired") {
      return "bg-emerald-100 text-emerald-700";
    }

    return "bg-blue-100 text-blue-700";
  };

  // ============================================================
  // PROFILE COMPLETION
  // ============================================================

  const profileCompletion =
    dashboard.profileCompletion || 0;

  // ============================================================
  // MAIN UI
  // ============================================================

  return (
    <div className="min-h-screen bg-gray-50 py-8">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            WELCOME HEADER
        ===================================================== */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 md:p-8 text-white shadow-lg mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>

              <p className="text-blue-100 text-sm mb-2">
                CareerHub Dashboard
              </p>

              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome back, {userName} 👋
              </h1>

              <p className="text-blue-100 mt-2 max-w-xl">
                Track your applications, manage your saved jobs,
                and discover your next career opportunity.
              </p>

            </div>

            <Link
              to="/jobs"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-5 py-3 rounded-xl font-semibold hover:bg-blue-50 transition shadow"
            >
              <Search size={18} />
              Find Jobs
            </Link>

          </div>

        </div>

        {/* =====================================================
            STAT CARDS
        ===================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          {stats.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold text-gray-900 mt-2">
                    {item.value}
                  </h2>

                </div>

                <div
                  className={`
                    ${item.bg}
                    ${item.text}
                    w-12
                    h-12
                    rounded-xl
                    flex
                    items-center
                    justify-center
                  `}
                >
                  {item.icon}
                </div>

              </div>

            </div>
          ))}

        </div>

        {/* =====================================================
            PROFILE + QUICK ACTIONS
        ===================================================== */}

        <div className="grid lg:grid-cols-3 gap-6 mb-8">

          {/* PROFILE COMPLETION */}

          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

            <div className="flex justify-between items-center mb-4">

              <div>

                <h2 className="text-lg font-bold text-gray-900">
                  Profile Completion
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Complete your profile to improve your job
                  recommendations.
                </p>

              </div>

              <span className="text-xl font-bold text-blue-600">
                {profileCompletion}%
              </span>

            </div>

            <div className="bg-gray-200 h-3 rounded-full overflow-hidden">

              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${profileCompletion}%`,
                }}
              />

            </div>

            {profileCompletion < 70 && (
              <div className="mt-5 bg-yellow-50 border border-yellow-100 text-yellow-700 p-4 rounded-xl flex items-start gap-3">

                <AlertCircle
                  size={20}
                  className="mt-0.5 flex-shrink-0"
                />

                <div>

                  <p className="font-medium">
                    Your profile is incomplete.
                  </p>

                  <Link
                    to="/profile"
                    className="text-sm underline mt-1 inline-block"
                  >
                    Complete your profile →
                  </Link>

                </div>

              </div>
            )}

            {profileCompletion >= 70 && (
              <div className="mt-5 bg-green-50 border border-green-100 text-green-700 p-4 rounded-xl flex items-center gap-3">

                <CheckCircle size={20} />

                <p>
                  Great! Your profile is looking good.
                </p>

              </div>
            )}

          </div>

          {/* QUICK ACTIONS */}

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Quick Actions
            </h2>

            <div className="space-y-3">

              <Link
                to="/jobs"
                className="flex items-center justify-between p-3 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
              >

                <span className="flex items-center gap-3 font-medium">
                  <Search size={18} />
                  Find Jobs
                </span>

                <ArrowRight size={18} />

              </Link>

              <Link
                to="/saved-jobs"
                className="flex items-center justify-between p-3 rounded-xl bg-orange-50 text-orange-700 hover:bg-orange-100 transition"
              >

                <span className="flex items-center gap-3 font-medium">
                  <Bookmark size={18} />
                  Saved Jobs
                </span>

                <ArrowRight size={18} />

              </Link>

              <Link
                to="/my-applications"
                className="flex items-center justify-between p-3 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 transition"
              >

                <span className="flex items-center gap-3 font-medium">
                  <FileText size={18} />
                  Applications
                </span>

                <ArrowRight size={18} />

              </Link>

              <Link
                to="/profile"
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 transition"
              >

                <span className="flex items-center gap-3 font-medium">
                  <User size={18} />
                  My Profile
                </span>

                <ArrowRight size={18} />

              </Link>

            </div>

          </div>

        </div>

        {/* =====================================================
            APPLICATION OVERVIEW + RECENT APPLICATIONS
        ===================================================== */}

        <div className="grid lg:grid-cols-2 gap-6 mb-8">

          {/* APPLICATION CHART */}

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

            <h2 className="text-xl font-bold text-gray-900">
              Application Overview
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your current job search activity
            </p>

            {chartData.some(
              (item) => item.value > 0
            ) ? (
              <div className="h-72 mt-4">

                <ResponsiveContainer width="100%" height="100%">

                  <PieChart>

                    <Pie
                      data={chartData}
                      dataKey="value"
                      outerRadius={100}
                      innerRadius={55}
                      paddingAngle={4}
                      label
                    >

                      {chartData.map(
                        (item, index) => (
                          <Cell key={index} />
                        )
                      )}

                    </Pie>

                    <Tooltip />

                  </PieChart>

                </ResponsiveContainer>

              </div>
            ) : (
              <div className="h-72 flex flex-col items-center justify-center text-gray-400">

                <FileText size={40} />

                <p className="mt-3">
                  No activity yet
                </p>

                <Link
                  to="/jobs"
                  className="text-blue-600 text-sm mt-2"
                >
                  Start applying →
                </Link>

              </div>
            )}

          </div>

          {/* RECENT APPLICATIONS */}

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

            <div className="flex justify-between items-center mb-5">

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  Recent Applications
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Your latest job applications
                </p>

              </div>

              <Link
                to="/my-applications"
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                View All
              </Link>

            </div>

            {dashboard.recentApplications?.length > 0 ? (

              <div className="space-y-3">

                {dashboard.recentApplications
                  .slice(0, 5)
                  .map((app) => (

                    <div
                      key={app._id}
                      className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                    >

                      <div className="min-w-0">

                        <h3 className="font-semibold text-gray-900 truncate">
                          {app.job?.title || "Job"}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          {getCompany(app.job)}
                        </p>

                      </div>

                      <span
                        className={`
                          ${getStatusStyle(app.status)}
                          px-3
                          py-1.5
                          rounded-full
                          text-xs
                          font-semibold
                          whitespace-nowrap
                        `}
                      >
                        {app.status || "Applied"}
                      </span>

                    </div>

                  ))}

              </div>

            ) : (

              <div className="py-12 text-center text-gray-400">

                <FileText
                  size={40}
                  className="mx-auto"
                />

                <p className="mt-3">
                  No applications yet.
                </p>

                <Link
                  to="/jobs"
                  className="text-blue-600 text-sm mt-2 inline-block"
                >
                  Browse Jobs →
                </Link>

              </div>

            )}

          </div>

        </div>

        {/* =====================================================
            RECOMMENDED JOBS
        ===================================================== */}

        <div className="mb-8">

          <div className="flex justify-between items-center mb-5">

            <div>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Recommended Jobs
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Opportunities selected for you
              </p>

            </div>

            <Link
              to="/jobs"
              className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1"
            >
              View All
              <ArrowRight size={16} />
            </Link>

          </div>

          {dashboard.recommendedJobs?.length > 0 ? (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              {dashboard.recommendedJobs
                .slice(0, 6)
                .map((job) => (

                  <div
                    key={job._id}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <h3 className="font-bold text-lg text-gray-900">
                          {job.title}
                        </h3>

                        <p className="text-gray-500 mt-1">
                          {getCompany(job)}
                        </p>

                      </div>

                      <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">

                        <Briefcase size={19} />

                      </div>

                    </div>

                    <div className="mt-5 space-y-2 text-sm text-gray-500">

                      <p className="flex items-center gap-2">
                        <MapPin size={16} />
                        {job.location || "Location not specified"}
                      </p>

                      <p className="flex items-center gap-2">
                        <IndianRupee size={16} />
                        {job.salary || "Salary not disclosed"}
                      </p>

                    </div>

                    <Link
                      to={`/jobs/${job._id}`}
                      className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl font-medium hover:bg-blue-700 transition"
                    >
                      View Job
                      <ArrowRight size={17} />
                    </Link>

                  </div>

                ))}

            </div>

          ) : (

            <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">

              <Briefcase
                size={45}
                className="mx-auto text-gray-300"
              />

              <h3 className="mt-4 font-semibold text-gray-700">
                No recommended jobs yet
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Complete your profile and browse jobs to get
                recommendations.
              </p>

              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 mt-5 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition"
              >
                Browse Jobs
                <ArrowRight size={17} />
              </Link>

            </div>

          )}

        </div>

        {/* =====================================================
            BOTTOM PROFILE CTA
        ===================================================== */}

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div>

            <h2 className="text-lg font-bold text-gray-900">
              Ready for your next opportunity?
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Keep your profile updated and apply to jobs that
              match your skills.
            </p>

          </div>

          <Link
            to="/profile"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition whitespace-nowrap"
          >
            <User size={18} />
            Update Profile
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;