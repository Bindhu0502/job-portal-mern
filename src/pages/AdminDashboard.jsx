import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  FaBriefcase,
  FaUsers,
  FaClipboardList,
  FaUserCheck,
} from "react-icons/fa";

import api from "../api/api";
import Loader from "../components/common/Loader";

import DashboardHeader from "../components/admin/DashboardHeader";
import StatCard from "../components/admin/StatCard";
import RecentJobs from "../components/admin/RecentJobs";
import RecentApplications from "../components/admin/RecentApplications";
import StatusSummary from "../components/admin/StatusSummary";

import "../styles/adminDashboard.css";

function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] = useState({
    totalJobs: 0,
    totalUsers: 0,
    totalApplications: 0,
    hiredCandidates: 0,
    recentJobs: [],
    recentApplications: [],
    statusSummary: {
      applied: 0,
      reviewed: 0,
      shortlisted: 0,
      rejected: 0,
      hired: 0,
    },
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/admin/dashboard");

      setDashboard({
        totalJobs: data.totalJobs || 0,
        totalUsers: data.totalUsers || 0,
        totalApplications: data.totalApplications || 0,
        hiredCandidates: data.hiredCandidates || 0,
        recentJobs: data.recentJobs || [],
        recentApplications: data.recentApplications || [],
        statusSummary: data.statusSummary || {},
      });
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="admin-dashboard">

      <DashboardHeader />

      <div className="stats-grid">

        <StatCard
          title="Total Jobs"
          value={dashboard.totalJobs}
          subtitle="Jobs posted on platform"
          icon={<FaBriefcase />}
          color="#2563EB"
        />

        <StatCard
          title="Total Users"
          value={dashboard.totalUsers}
          subtitle="Registered candidates"
          icon={<FaUsers />}
          color="#16A34A"
        />

        <StatCard
          title="Applications"
          value={dashboard.totalApplications}
          subtitle="Applications received"
          icon={<FaClipboardList />}
          color="#EA580C"
        />

        <StatCard
          title="Hired"
          value={dashboard.hiredCandidates}
          subtitle="Successfully hired"
          icon={<FaUserCheck />}
          color="#7E22CE"
        />

      </div>

      <RecentJobs jobs={dashboard.recentJobs} />

      <RecentApplications
        applications={dashboard.recentApplications}
      />

      <StatusSummary
        statusSummary={dashboard.statusSummary}
      />

    </div>
  );
}

export default AdminDashboard;