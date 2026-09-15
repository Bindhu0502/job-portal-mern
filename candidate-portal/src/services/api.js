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
    // GET TOKEN
    // --------------------------------------------------------

    const token =
      localStorage.getItem("token");

    // --------------------------------------------------------
    // ADD AUTHORIZATION
    // --------------------------------------------------------

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    // --------------------------------------------------------
    // IMPORTANT
    // --------------------------------------------------------
    // DO NOT manually set Content-Type here.
    //
    // For JSON requests, Axios will automatically use:
    // application/json
    //
    // For FormData requests, Axios/browser will automatically
    // set:
    // multipart/form-data; boundary=...
    //
    // This is required for Multer to receive profileImage.
    // --------------------------------------------------------

    if (
      config.data instanceof FormData
    ) {
      // Remove any previously configured JSON header
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
    // Log API errors during development
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