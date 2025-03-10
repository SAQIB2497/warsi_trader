import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCart, clearCart } from "../redux/cartSlice";
import axios from "axios";

// Set axios to send credentials (cookies, headers, etc.)
axios.defaults.withCredentials = true;

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Axios interceptor to attach the token to every request
  useEffect(() => {
    const interceptor = axios.interceptors.request.use((config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    return () => axios.interceptors.request.eject(interceptor);
  }, []);

  // Initial authentication check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setLoading(false);
          return;
        }
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/current`
        );
        setUser(data);
        // Fetch cart after successful auth check
        const cartRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/cart`
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
        console.error("Auth check error:", error);
        localStorage.removeItem("authToken");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [dispatch]);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        { email, password }
      );
      localStorage.setItem("authToken", data.token);
      setUser(data.user);

      // Merge local cart with server cart if available
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      if (localCart.length > 0) {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/cart/merge`, {
          items: localCart.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
        });
        localStorage.removeItem("cart");
      }

      // Fetch updated cart
      const cartRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/cart`
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
      console.error("Login error:", error);
      throw new Error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/users/logout`);
      localStorage.removeItem("authToken");
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
