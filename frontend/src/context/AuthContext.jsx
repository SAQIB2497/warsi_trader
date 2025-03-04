import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCart, clearCart } from "../redux/cartSlice";
import axios from "axios";

export const AuthContext = createContext(null); // ✅ Create and export AuthContext

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch(); // ✅ Use dispatch for Redux

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/users/current", {
          withCredentials: true,
        });
        setUser(res.data);

        // ✅ Fetch user cart after login
        if (res.data && res.data._id) {
          const cartRes = await axios.get(
            `http://localhost:5001/api/cart/${res.data._id}`
          );
          dispatch(setCart(cartRes.data.cart));
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "http://localhost:5001/api/users/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data && res.data.user) {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);

        // ✅ Fetch cart for the logged-in user
        if (res.data.user._id) {
          const cartRes = await axios.get(
            `http://localhost:5001/api/cart/${res.data.user._id}`
          );
          dispatch(setCart(cartRes.data.cart));
        }
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login failed", error.response?.data);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5001/api/users/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      dispatch(clearCart()); // ✅ Clear cart when user logs out
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
