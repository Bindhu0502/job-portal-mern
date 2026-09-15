function DashboardStats({ stats }) {
  const cards = [
    {
      title: "Applied Jobs",
      value: stats?.appliedJobs || 0,
      color: "bg-blue-500",
      icon: "📄",
    },
    {
      title: "Saved Jobs",
      value: stats?.savedJobs || 0,
      color: "bg-pink-500",
      icon: "❤️",
    },
    {
      title: "Profile",
      value: `${stats?.profileCompletion || 0}%`,
      color: "bg-green-500",
      icon: "👤",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-10">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.color} text-white rounded-xl p-6 shadow-lg`}
        >
          <div className="text-4xl mb-3">
            {card.icon}
          </div>

          <h3 className="text-lg font-semibold">
            {card.title}
          </h3>

          <p className="text-3xl font-bold mt-2">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;