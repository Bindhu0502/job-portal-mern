import axios from "axios";

const API_URL = "http://localhost:5000/api/jobs";

export const fetchJobs = async () => {
  try {
    const { data } = await axios.get(API_URL);
    return data.jobs || [];
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

export const fetchJobById = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/${id}`);
    return data.job || null;
  } catch (error) {
    console.error("Error fetching job:", error);
    return null;
  }
};