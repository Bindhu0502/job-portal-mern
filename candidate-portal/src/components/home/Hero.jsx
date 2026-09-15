import { Link } from "react-router-dom";
import HeroStats from "./HeroStats";

function Hero() {
  return (
    <section className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}
          <div>

            <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium">
              🚀 Connecting Talent With Opportunity
            </span>

            <h1 className="mt-8 text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
              Find Your Dream
              <br />
              Job <span className="text-blue-600">Faster</span>
            </h1>

            <p className="mt-6 text-lg text-slate-600 leading-8 max-w-xl">
              Discover thousands of verified jobs from top companies,
              connect with recruiters, and build your career with confidence.
            </p>

            {/* Search Box */}
            <div className="mt-10 bg-white rounded-2xl shadow-lg p-4 flex flex-col md:flex-row gap-4">

              <input
                type="text"
                placeholder="Job title"
                className="flex-1 border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="Location"
                className="flex-1 border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-3 font-semibold transition">
                Search Jobs
              </button>

            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-4">

              <Link
                to="/jobs"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
              >
                Find Jobs
              </Link>

              <Link
                to="/companies"
                className="border border-gray-300 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                Explore Companies
              </Link>

            </div>

          </div>

          {/* Right Side Placeholder */}
          <div className="flex justify-center">

            <div className="w-full max-w-lg h-[450px] rounded-3xl bg-blue-100 flex flex-col items-center justify-center shadow-lg">

              <div className="text-7xl mb-4">
                💼
              </div>

              <h2 className="text-3xl font-bold text-blue-700">
                CareerHub
              </h2>

              <p className="mt-2 text-gray-600 text-center px-6">
                Professional Illustration will be added here.
              </p>

            </div>

          </div>

        </div>

        {/* Stats */}
        <HeroStats />

      </div>
    </section>
  );
}

export default Hero;