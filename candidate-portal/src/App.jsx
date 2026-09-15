import { useLocation } from "react-router-dom";

import Navbar from "./components/layouts/Navbar";
import AppRoutes from "./routes/AppRoutes";


function App() {

  const location = useLocation();


  // ============================================================
  // PORTAL DETECTION
  // ============================================================

  const isRecruiterPage =
    location.pathname.startsWith("/recruiter");


  const isAdminPage =
    location.pathname.startsWith("/admin");


  // ============================================================
  // USER AUTH PAGES
  // ============================================================

  const isUserAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register";


  // ============================================================
  // HIDE USER NAVBAR
  //
  // Recruiter pages
  // Admin pages
  // User login/register pages
  // ============================================================

  const hideUserNavbar =
    isRecruiterPage ||
    isAdminPage ||
    isUserAuthPage;


  return (

    <>

      {!hideUserNavbar && (
        <Navbar />
      )}

      <AppRoutes />

    </>

  );

}


export default App;