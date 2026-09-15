import { Link } from "react-router-dom";
import { MapPin, Briefcase, Star } from "lucide-react";

function CompanyCard({ company }) {
  return (
    <div className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      {/* Company Logo & Name */}
      <div className="flex items-center gap-4">

        <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-2">
          <img
            src={company.logo}
            alt={company.name}
            className="w-12 h-12 object-contain"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {company.name}
          </h3>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            {company.industry}
          </p>
        </div>

      </div>

      {/* Company Details */}
      <div className="mt-6 space-y-3">

        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Star
            size={18}
            className="text-yellow-500 fill-yellow-500"
          />
          <span>{company.rating} Rating</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <MapPin size={18} />
          <span>{company.location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Briefcase size={18} />
          <span>{company.jobs} Open Jobs</span>
        </div>

      </div>

      {/* View Jobs Button */}
      <Link
        to={`/companies/${company._id || company.id}`}
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        View Jobs
      </Link>

    </div>
  );
}

export default CompanyCard;