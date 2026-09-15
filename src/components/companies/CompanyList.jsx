import CompanyCard from "./CompanyCard";

function CompanyList({ companies = [] }) {
  if (!companies.length) {
    return (
      <div className="py-16 text-center">
        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">
          No Companies Found
        </h3>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Try changing your search or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {companies.map((company) => (
        <CompanyCard
          key={company._id || company.id}
          company={company}
        />
      ))}
    </div>
  );
}

export default CompanyList;