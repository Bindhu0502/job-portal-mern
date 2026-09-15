import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";


const AuthContext = createContext(null);


// ============================================================
// AUTH PROVIDER
// ============================================================

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  const [loading, setLoading] = useState(true);


  // ==========================================================
  // LOAD RECRUITER SESSION
  // ==========================================================

  useEffect(() => {

    const storedUser =
      localStorage.getItem("recruiterUser");

    const storedToken =
      localStorage.getItem("recruiterToken");


    if (storedUser && storedToken) {

      try {

        const userData =
          JSON.parse(storedUser);


        // Only restore recruiter session
        if (userData?.role === "recruiter") {

          setUser(userData);

          setToken(storedToken);

        } else {

          localStorage.removeItem(
            "recruiterUser"
          );

          localStorage.removeItem(
            "recruiterToken"
          );

        }

      } catch (error) {

        console.error(
          "Recruiter session restore error:",
          error
        );

        localStorage.removeItem(
          "recruiterUser"
        );

        localStorage.removeItem(
          "recruiterToken"
        );

      }

    }


    setLoading(false);

  }, []);


  // ==========================================================
  // LOGIN
  // ==========================================================

  const login = (
    userData,
    tokenData
  ) => {

    setUser(userData);

    setToken(tokenData);


    localStorage.setItem(
      "recruiterUser",
      JSON.stringify(userData)
    );


    localStorage.setItem(
      "recruiterToken",
      tokenData
    );

  };


  // ==========================================================
  // LOGOUT
  // ==========================================================

  const logout = () => {

    setUser(null);

    setToken(null);


    localStorage.removeItem(
      "recruiterUser"
    );


    localStorage.removeItem(
      "recruiterToken"
    );

  };


  // ==========================================================
  // PROVIDER
  // ==========================================================

  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};


// ============================================================
// USE AUTH
// ============================================================

export const useAuth = () => {

  const context =
    useContext(AuthContext);


  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );

  }


  return context;

};