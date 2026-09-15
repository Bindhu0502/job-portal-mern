import Card from "../common/Card";

function RecentActivity({
  applications,
  savedJobs,
}) {
  const activities = [];

  applications.forEach((app) => {
    activities.push({
      text: `Applied for ${app.job?.title}`,
      date: app.createdAt,
    });
  });

  savedJobs.forEach((job) => {
    activities.push({
      text: `Saved ${job.job?.title}`,
      date: job.createdAt,
    });
  });

  activities.sort(
    (a, b) =>
      new Date(b.date) - new Date(a.date)
  );

  return (
    <Card>
      <h2 className="text-xl font-bold mb-5">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {activities.slice(0, 8).map((activity, index) => (
          <div
            key={index}
            className="border-b pb-3"
          >
            <p>{activity.text}</p>

            <span className="text-sm text-gray-400">
              {new Date(activity.date).toLocaleString()}
            </span>
          </div>
        ))}

        {!activities.length && (
          <p className="text-gray-500">
            No recent activity.
          </p>
        )}
      </div>
    </Card>
  );
}

export default RecentActivity;