import { Link } from "react-router-dom";

function RecruiterDashboard() {
  const cards = [
    {
      title: "Companies",
      value: "--",
      color: "bg-blue-500",
      path: "/recruiter/companies",
      icon: "🏢",
    },
    {
      title: "Jobs Posted",
      value: "--",
      color: "bg-green-500",
      path: "/recruiter/jobs",
      icon: "💼",
    },
    {
      title: "Applications",
      value: "--",
      color: "bg-purple-500",
      path: "/recruiter/applicants",
      icon: "📄",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8 mb-8">
        <h1 className="text-4xl font-bold">
          Recruiter Dashboard
        </h1>

        <p className="mt-2">
          Manage companies, jobs, and applicants.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.path}
            className={`${card.color} text-white rounded-xl p-6 shadow-lg hover:scale-105 transition`}
          >
            <div className="text-5xl">
              {card.icon}
            </div>

            <h2 className="mt-4 text-xl font-semibold">
              {card.title}
            </h2>

            <p className="text-3xl font-bold mt-2">
              {card.value}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecruiterDashboard;