import { ArrowRight } from "lucide-react";

const companies = [
  {
    name: "Google",
    jobs: "120 Open Jobs",
    logo: "G",
    color: "bg-red-100 text-red-600",
  },
  {
    name: "Microsoft",
    jobs: "95 Open Jobs",
    logo: "M",
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Amazon",
    jobs: "150 Open Jobs",
    logo: "A",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    name: "Infosys",
    jobs: "80 Open Jobs",
    logo: "I",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    name: "TCS",
    jobs: "105 Open Jobs",
    logo: "T",
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Accenture",
    jobs: "90 Open Jobs",
    logo: "A",
    color: "bg-purple-100 text-purple-600",
  },
];

function TopCompanies() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">

          <span className="text-blue-600 font-semibold uppercase tracking-wider">
            Companies
          </span>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Top Hiring Companies
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Work with the world's leading companies and build your dream career.
          </p>

        </div>

        {/* Company Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {companies.map((company) => (

            <div
              key={company.name}
              className="bg-slate-50 rounded-3xl border border-gray-200 p-8 hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >

              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold ${company.color}`}
              >
                {company.logo}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                {company.name}
              </h3>

              <p className="mt-2 text-gray-500">
                {company.jobs}
              </p>

              <button className="mt-8 flex items-center gap-2 text-blue-600 font-semibold hover:gap-4 transition-all">
                View Jobs
                <ArrowRight size={18} />
              </button>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default TopCompanies;