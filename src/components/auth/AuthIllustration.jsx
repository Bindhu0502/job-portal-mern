import React from "react";
import {
  HiOutlineBriefcase,
  HiOutlineBuildingOffice2,
  HiOutlineCheckBadge,
} from "react-icons/hi2";

const features = [
  {
    icon: <HiOutlineCheckBadge size={22} />,
    title: "Verified Jobs",
    description: "Apply only to trusted and verified job listings.",
  },
  {
    icon: <HiOutlineBuildingOffice2 size={22} />,
    title: "Top Companies",
    description: "Connect with startups and leading tech companies.",
  },
  {
    icon: <HiOutlineBriefcase size={22} />,
    title: "Easy Applications",
    description: "Track and manage all your job applications in one place.",
  },
];

const AuthIllustration = () => {
  return (
    <div className="max-w-lg">

      {/* Logo */}
      <h1 className="text-4xl font-extrabold text-black dark:text-white">
        CareerHub
      </h1>

      {/* Heading */}
      <h2 className="mt-6 text-5xl font-bold leading-tight text-black dark:text-white">
        Find Your
        <br />
        Dream Job
      </h2>

      {/* Description */}
      <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
        Discover verified opportunities from startups and leading companies.
        Build your career with confidence.
      </p>

      {/* Feature Cards */}
      <div className="mt-10 space-y-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30">
              {feature.icon}
            </div>

            <div>
              <h3 className="font-semibold text-black dark:text-white">
                {feature.title}
              </h3>

              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AuthIllustration;