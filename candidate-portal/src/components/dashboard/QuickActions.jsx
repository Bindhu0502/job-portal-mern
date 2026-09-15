import { Link } from "react-router-dom";

function QuickActions() {
  const actions = [
    {
      name: "Browse Jobs",
      path: "/jobs",
      color: "bg-blue-600",
    },
    {
      name: "Saved Jobs",
      path: "/saved-jobs",
      color: "bg-pink-600",
    },
    {
      name: "My Applications",
      path: "/my-applications",
      color: "bg-green-600",
    },
    {
      name: "Profile",
      path: "/profile",
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-5">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <Link
            key={action.name}
            to={action.path}
            className={`${action.color} text-white rounded-lg py-4 text-center font-semibold hover:opacity-90`}
          >
            {action.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;