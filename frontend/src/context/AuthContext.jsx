import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCart, clearCart } from "../redux/cartSlice";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Check authentication status on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In checkAuth function
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/current`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              // Add this to force credentials
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Directly use data if user object isn't nested
        setUser(data);

        // Fetch user's cart
        const cartRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/cart`,
          { withCredentials: true }
        );

        dispatch(
          setCart(
            cartRes.data.items.map((item) => ({
              ...item.productId,
              quantity: item.quantity,
              image: item.productId.image || [],
            }))
          )
        );
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [dispatch]);

  // Login function
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        { email, password },
        { withCredentials: true }
      );

      // Set user data directly from response
      setUser(data);

      // Handle cart merging
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      if (localCart.length > 0) {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/cart/merge`,
          {
            items: localCart.map((item) => ({
              productId: item._id,
              quantity: item.quantity,
            })),
          },
          { withCredentials: true }
        );
        localStorage.removeItem("cart");
      }

      // Fetch updated cart
      const cartRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/cart`,
        { withCredentials: true }
      );

      dispatch(
        setCart(
          cartRes.data.items.map((item) => ({
            ...item.productId,
            quantity: item.quantity,
            image: item.productId.image || [],
          }))
        )
      );

      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      dispatch(clearCart());
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
