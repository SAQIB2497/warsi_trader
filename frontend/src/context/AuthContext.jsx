import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCart, clearCart } from "../redux/cartSlice";
import axios from "axios";

// Create Auth Context
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Function to check user authentication on page reload
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/users/current", {
          withCredentials: true,
        });

        console.log("🔵 User data from backend:", res.data); // Debugging

        if (res.data) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error.response?.data || error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [dispatch]);

  //Login
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "http://localhost:5001/api/users/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data && res.data.user) {
        setUser(res.data.user); // Set the user state
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error);
      throw error;
    }
  };

  //Logout
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5001/api/users/logout",
        {},
        { withCredentials: true }
      );

      setUser(null); // Clear the user state
      dispatch(clearCart());
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
