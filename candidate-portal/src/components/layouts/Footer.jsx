import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-4 gap-12">

          <div>

            <h2 className="text-3xl font-bold text-white">
              CareerHub
            </h2>

            <p className="mt-5 leading-8">
              CareerHub helps professionals connect with the world's
              best companies and discover amazing career opportunities.
            </p>

          </div>

          <div>

            <h3 className="text-xl font-semibold text-white mb-5">
              Company
            </h3>

            <ul className="space-y-3">

              <li><Link to="/">Home</Link></li>

              <li><Link to="/jobs">Jobs</Link></li>

              <li><Link to="/companies">Companies</Link></li>

              <li><Link to="/about">About</Link></li>

            </ul>

          </div>

          <div>

            <h3 className="text-xl font-semibold text-white mb-5">
              Support
            </h3>

            <ul className="space-y-3">

              <li>Help Center</li>

              <li>Privacy Policy</li>

              <li>Terms & Conditions</li>

              <li>Contact</li>

            </ul>

          </div>

          <div>

            <h3 className="text-xl font-semibold text-white mb-5">
              Contact
            </h3>

            <p>Hyderabad, India</p>

            <p className="mt-3">careerhub@gmail.com</p>

            <p className="mt-3">+91 98765 43210</p>

          </div>

        </div>

        <div className="border-t border-slate-700 mt-14 pt-8 text-center">

          © 2026 CareerHub. All Rights Reserved.

        </div>

      </div>

    </footer>
  );
}

export default Footer;