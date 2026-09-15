import api from "../services/api";

// Apply for a job
export const applyForJob = async (jobId, coverLetter = "") => {
  const response = await api.post(
    `/applications/${jobId}`,
    { coverLetter }
  );

  return response.data;
};

// Get my applications
export const getMyApplications = async () => {
  const response = await api.get("/applications/my");
  return response.data;
};

// Withdraw application
export const withdrawApplication = async (applicationId) => {
  const response = await api.put(
    `/applications/withdraw/${applicationId}`
  );

  return response.data;
};