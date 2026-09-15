import {
  ShieldCheck,
  BriefcaseBusiness,
  Users,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: BriefcaseBusiness,
    title: "Verified Jobs",
    description:
      "Every job is verified to help you apply with confidence.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Companies",
    description:
      "Connect with top companies and trusted recruiters.",
  },
  {
    icon: Users,
    title: "Career Support",
    description:
      "Resume tips, interview preparation and career guidance.",
  },
  {
    icon: TrendingUp,
    title: "Fast Growth",
    description:
      "Discover opportunities that help you grow your career.",
  },
];

function WhyChooseUs() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-16">

          <span className="text-blue-600 uppercase tracking-widest font-semibold">
            Why CareerHub
          </span>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Why Choose CareerHub?
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Everything you need to find your dream job in one place.
          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <Icon size={30} className="text-blue-600" />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-gray-500 leading-7">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;