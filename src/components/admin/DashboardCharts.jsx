import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

import "../../styles/adminDashboard.css";

function DashboardCharts({ statusSummary }) {
  const barData = [
    {
      name: "Applied",
      value: statusSummary.applied,
    },
    {
      name: "Reviewed",
      value: statusSummary.reviewed,
    },
    {
      name: "Shortlisted",
      value: statusSummary.shortlisted,
    },
    {
      name: "Rejected",
      value: statusSummary.rejected,
    },
    {
      name: "Hired",
      value: statusSummary.hired,
    },
  ];

  const pieData = [
    {
      name: "Applied",
      value: statusSummary.applied,
    },
    {
      name: "Reviewed",
      value: statusSummary.reviewed,
    },
    {
      name: "Shortlisted",
      value: statusSummary.shortlisted,
    },
    {
      name: "Rejected",
      value: statusSummary.rejected,
    },
    {
      name: "Hired",
      value: statusSummary.hired,
    },
  ];

  const COLORS = [
    "#2563EB",
    "#0EA5E9",
    "#F59E0B",
    "#EF4444",
    "#16A34A",
  ];

  return (
    <div className="chart-grid">

      <div className="chart-card">

        <h2>Applications Overview</h2>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="value"
              fill="#2563EB"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

      </div>

      <div className="chart-card">

        <h2>Application Distribution</h2>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <PieChart>

            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={110}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default DashboardCharts;