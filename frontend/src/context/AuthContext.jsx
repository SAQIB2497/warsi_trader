import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if user is logged in when the app loads
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/users/current", {
          withCredentials: true, // Ensure cookies are sent
        });
        console.log("User found in session:", res.data);
        setUser(res.data.user); // Ensure this matches the response structure
      } catch (error) {
        console.log("No user found or session expired");
        setUser(null);
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

      console.log("Login Response:", res.data); // Debugging

      // Set user state directly from response
      setUser(res.data.user); // Ensure this matches the response structure
    } catch (error) {
      console.error("Login failed", error.response?.data);
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
      setUser(null); // Remove user from state
    } catch (error) {
      console.error("Logout failed", error.response?.data);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
