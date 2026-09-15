import {
  Code2,
  Database,
  Smartphone,
  Palette,
  BarChart3,
  Briefcase,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    title: "Frontend Development",
    jobs: "1,245 Jobs",
    icon: Code2,
  },
  {
    title: "Backend Development",
    jobs: "980 Jobs",
    icon: Database,
  },
  {
    title: "Mobile Development",
    jobs: "756 Jobs",
    icon: Smartphone,
  },
  {
    title: "UI / UX Design",
    jobs: "512 Jobs",
    icon: Palette,
  },
  {
    title: "Data Analytics",
    jobs: "860 Jobs",
    icon: BarChart3,
  },
  {
    title: "Marketing",
    jobs: "640 Jobs",
    icon: Briefcase,
  },
];

function Categories() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center">

          <span className="text-blue-600 font-semibold uppercase tracking-widest">
            Categories
          </span>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Browse Popular Categories
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Discover jobs from the most popular industries and
            find the perfect opportunity for your career.
          </p>

        </div>

        {/* Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {categories.map((category) => {

            const Icon = category.icon;

            return (

              <div
                key={category.title}
                className="group bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300 cursor-pointer"
              >

                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">

                  <Icon
                    size={30}
                    className="text-blue-600"
                  />

                </div>

                <h3 className="mt-6 text-2xl font-semibold text-slate-900">

                  {category.title}

                </h3>

                <p className="mt-2 text-gray-500">

                  {category.jobs}

                </p>

                <button className="mt-8 flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all">

                  Explore

                  <ArrowRight size={18} />

                </button>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}

export default Categories;