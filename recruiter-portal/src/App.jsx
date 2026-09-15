import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ============================================================
// RECRUITER PAGES
// ============================================================

import RecruiterLogin from "./pages/recruiter/RecruiterLogin";
import RecruiterRegister from "./pages/recruiter/Register";
import Dashboard from "./pages/recruiter/Dashboard";
import CreateJob from "./pages/recruiter/CreateJob";
import MyJobs from "./pages/recruiter/MyJobs";
import EditJob from "./pages/recruiter/EditJob";
import Applications from "./pages/recruiter/Applications";
import RecruiterProfile from "./pages/recruiter/Profile";


// ============================================================
// PROTECTED ROUTE
// ============================================================

function ProtectedRoute({ children }) {

  const token =
    localStorage.getItem("recruiterToken");

  const storedUser =
    localStorage.getItem("recruiterUser");


  // ----------------------------------------------------------
  // NO TOKEN / NO USER
  // ----------------------------------------------------------

  if (!token || !storedUser) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  // ----------------------------------------------------------
  // CHECK USER
  // ----------------------------------------------------------

  try {

    const user =
      JSON.parse(storedUser);


    // --------------------------------------------------------
    // ONLY RECRUITER CAN ACCESS THESE PAGES
    // --------------------------------------------------------

    if (user?.role !== "recruiter") {

      return (
        <Navigate
          to="/login"
          replace
        />
      );

    }

  } catch (error) {

    console.error(
      "ProtectedRoute User Error:",
      error
    );


    // --------------------------------------------------------
    // INVALID LOCAL STORAGE USER
    // --------------------------------------------------------

    localStorage.removeItem(
      "recruiterUser"
    );

    localStorage.removeItem(
      "recruiterToken"
    );


    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  // ----------------------------------------------------------
  // AUTHENTICATED RECRUITER
  // ----------------------------------------------------------

  return children;

}


// ============================================================
// APP
// ============================================================

function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* ==================================================
            RECRUITER AUTH
        ================================================== */}

        <Route
          path="/login"
          element={
            <RecruiterLogin />
          }
        />


        <Route
          path="/register"
          element={
            <RecruiterRegister />
          }
        />


        {/* ==================================================
            RECRUITER DASHBOARD
        ================================================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        {/* ==================================================
            CREATE JOB
        ================================================== */}

        <Route
          path="/create-job"
          element={
            <ProtectedRoute>
              <CreateJob />
            </ProtectedRoute>
          }
        />


        {/* ==================================================
            MY JOBS
        ================================================== */}

        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <MyJobs />
            </ProtectedRoute>
          }
        />


        {/* ==================================================
            EDIT JOB
        ================================================== */}

        <Route
          path="/edit-job/:id"
          element={
            <ProtectedRoute>
              <EditJob />
            </ProtectedRoute>
          }
        />


        {/* ==================================================
            APPLICATIONS
        ================================================== */}

        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />


        {/* ==================================================
            RECRUITER PROFILE
        ================================================== */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <RecruiterProfile />
            </ProtectedRoute>
          }
        />


        {/* ==================================================
            ROOT
        ================================================== */}

        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />


        {/* ==================================================
            UNKNOWN ROUTE
        ================================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>

  );

}


export default App;