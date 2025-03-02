import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added to prevent unnecessary renders

  // Check if user is logged in when the app loads
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/users/current", {
          withCredentials: true,
        });
        console.log("User found in session:", res.data);
        setUser(res.data);
      } catch (error) {
        console.log("No user found or session expired");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  // Login function
const login = async (email, password) => {
  try {
    const res = await axios.post(
      "http://localhost:5001/api/users/login",
      { email, password },
      { withCredentials: true }
    );

    console.log("Login Response:", res.data);

    if (res.data && res.data.user) {
      // Save token to localStorage
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user); // Ensure correct object structure
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    console.error("Login failed", error.response?.data);
    throw error;
  }
};
  // Logout function
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5001/api/users/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error.response?.data);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
