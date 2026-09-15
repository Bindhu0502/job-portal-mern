import {
  MapPin,
  Briefcase,
  IndianRupee,
  Clock,
} from "lucide-react";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google",
    location: "Hyderabad",
    salary: "8-12 LPA",
    type: "Full Time",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Microsoft",
    location: "Bangalore",
    salary: "7-10 LPA",
    type: "Remote",
  },
  {
    id: 3,
    title: "React Developer",
    company: "Amazon",
    location: "Chennai",
    salary: "10-15 LPA",
    type: "Full Time",
  },
];

function FeaturedJobs() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900">
            Featured Jobs
          </h2>

          <p className="mt-4 text-gray-500">
            Explore the latest opportunities from top companies.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                {job.company[0]}
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                {job.title}
              </h3>

              <p className="text-blue-600 font-medium mt-1">
                {job.company}
              </p>

              <div className="mt-6 space-y-3 text-gray-600">

                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  {job.location}
                </div>

                <div className="flex items-center gap-2">
                  <IndianRupee size={18} />
                  {job.salary}
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  {job.type}
                </div>

              </div>

              <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
                Apply Now
              </button>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default FeaturedJobs;