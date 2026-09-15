import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const Applicants = () => {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const res = await api.get(`/applications/job/${jobId}`);

      setApplications(res.data.applications || []);
    } catch (err) {
      toast.error("Failed to load applicants");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading Applicants...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold mb-8">
        Job Applicants
      </h1>

      {applications.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <h2 className="text-2xl font-semibold">
            No Applicants Yet
          </h2>
        </div>
      ) : (
        <div className="grid gap-6">

          {applications.map((app) => (

            <div
              key={app._id}
              className="bg-white rounded-xl shadow-md p-6"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="text-2xl font-bold">
                    {app.fullName}
                  </h2>

                  <p className="text-gray-600">
                    {app.email}
                  </p>

                  <p className="mt-2">
                    📞 {app.phone}
                  </p>

                  <p>
                    📍 {app.location}
                  </p>

                  <p>
                    💼 Experience : {app.experience} Years
                  </p>

                  <p>
                    💰 Current CTC : ₹{app.currentCTC}
                  </p>

                  <p>
                    🎯 Expected CTC : ₹{app.expectedCTC}
                  </p>

                  <p>
                    ⏳ Notice Period : {app.noticePeriod}
                  </p>

                </div>

                <div className="text-right">

                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                    {app.status}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default Applicants;