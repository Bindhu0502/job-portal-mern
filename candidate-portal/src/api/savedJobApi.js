import api from "../services/api";

// Save Job
export const saveJob = async (jobId) => {
  const response = await api.post(`/saved-jobs/${jobId}`);
  return response.data;
};

// Get Saved Jobs
export const getSavedJobs = async () => {
  const response = await api.get("/saved-jobs");
  return response.data;
};

// Remove Saved Job
export const removeSavedJob = async (jobId) => {
  const response = await api.delete(`/saved-jobs/${jobId}`);
  return response.data;
};