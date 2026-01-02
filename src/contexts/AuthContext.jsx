import { createContext, useContext, useEffect, useState } from "react";
import { FetchUser } from "../api/Auth";
import Loader from "../components/Loader";
import LandingPage from "../pages/LandingPage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await FetchUser();
        if (user?.id) {
          setUser(user);
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  if (loading) return <Loader />;

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {user ? children : <LandingPage />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
