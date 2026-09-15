import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="py-24 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="bg-blue-600 rounded-[40px] px-10 py-16 md:px-20 text-center text-white shadow-xl">

          <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
            🚀 Join CareerHub Today
          </span>

          <h2 className="mt-6 text-5xl font-bold">
            Find Your Dream Job Today
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-blue-100 text-lg leading-8">
            Join thousands of professionals who trust CareerHub to
            discover exciting career opportunities from top companies.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">

            <Link
              to="/jobs"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Browse Jobs
            </Link>

            <Link
              to="/register"
              className="border border-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition flex items-center justify-center gap-2"
            >
              Get Started

              <ArrowRight size={20} />

            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}

export default CTA;