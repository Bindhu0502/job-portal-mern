import axios from "axios";

// ============================================================
// AXIOS API INSTANCE
// ============================================================

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// ============================================================
// REQUEST INTERCEPTOR
// ============================================================

api.interceptors.request.use(
  (config) => {

    // --------------------------------------------------------
    // GET RECRUITER TOKEN
    // --------------------------------------------------------

    const token =
      localStorage.getItem("recruiterToken");

    // --------------------------------------------------------
    // ADD AUTHORIZATION HEADER
    // --------------------------------------------------------

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    // --------------------------------------------------------
    // FORM DATA
    // --------------------------------------------------------

    if (
      config.data instanceof FormData
    ) {

      delete config.headers["Content-Type"];

    }

    return config;
  },

  (error) => {

    return Promise.reject(error);

  }
);

// ============================================================
// RESPONSE INTERCEPTOR
// ============================================================

api.interceptors.response.use(

  (response) => {

    return response;

  },

  (error) => {

    console.error(
      "API ERROR:",
      error.response?.data ||
      error.message
    );

    return Promise.reject(error);

  }

);

// ============================================================
// EXPORT
// ============================================================

export default api;