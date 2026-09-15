import { Briefcase, Building2, Users, Target } from "lucide-react";

const stats = [
  {
    icon: Briefcase,
    value: "10K+",
    label: "Jobs",
  },
  {
    icon: Building2,
    value: "5K+",
    label: "Companies",
  },
  {
    icon: Users,
    value: "50K+",
    label: "Candidates",
  },
  {
    icon: Target,
    value: "95%",
    label: "Success Rate",
  },
];

function HeroStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20">

      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition"
          >
            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
              <Icon className="text-blue-600" size={28} />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                {item.value}
              </h3>

              <p className="text-slate-500">
                {item.label}
              </p>
            </div>
          </div>
        );
      })}

    </div>
  );
}

export default HeroStats;