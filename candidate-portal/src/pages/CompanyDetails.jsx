import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaGlobe,
  FaBuilding,
} from "react-icons/fa";

import api from "../services/api";
import Loader from "../components/common/Loader";

function CompanyDetails() {
  const { id } = useParams();

  const [company, setCompany] = useState(null);
  const [loading, setLoading] =useState(true);

  useEffect(() => {
    fetchCompany();
  }, [id]);

  const fetchCompany = async () => {
    try {
      const res = await api.get(`/companies/${id}`);
      setCompany(res.data.company);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (!company)
    return (
      <h2 className="text-center text-2xl mt-20">
        Company not found
      </h2>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 h-44 flex items-center justify-center">

          <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center text-5xl font-bold text-blue-700 shadow-lg">
            {company.name.charAt(0)}
          </div>

        </div>

        <div className="p-10">

          <h1 className="text-4xl font-bold">
            {company.name}
          </h1>

          <div className="flex flex-wrap gap-6 mt-5 text-gray-600">

            <span className="flex items-center gap-2">
              <FaMapMarkerAlt />
              {company.location}
            </span>

            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:underline"
              >
                <FaGlobe />
                {company.website}
              </a>
            )}

          </div>

          <div className="mt-10">

            <h2 className="text-2xl font-bold flex items-center gap-3 mb-4">
              <FaBuilding />
              About Company
            </h2>

            <p className="text-gray-700 leading-8">
              {company.description}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CompanyDetails;