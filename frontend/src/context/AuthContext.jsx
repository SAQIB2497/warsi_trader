import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCart, clearCart } from "../redux/cartSlice";
import axios from "axios";
axios.defaults.withCredentials = true;

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Axios interceptor for auth token
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/current`,
          { withCredentials: true }
        );

        if (data?.id) {
          setUser(data);
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
        }
      } catch (error) {
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
      // Ensure credentials are sent for cookie handling
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        { email, password },
        { withCredentials: true }
      );

      // Save token if you still plan to use it for Authorization header in other requests.
      // Alternatively, you can rely on cookies alone.
      localStorage.setItem("authToken", data.token);
      setUser(data.user);

      // Cart merging logic: Merge local cart if it exists
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

      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
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
