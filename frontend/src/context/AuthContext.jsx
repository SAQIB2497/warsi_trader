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

      if (res.data) {
        setUser(res.data);
        const cartRes = await axios.get("http://localhost:5001/api/cart", {
          withCredentials: true,
        });

        const cartItems = cartRes.data.items.map((item) => ({
          ...item.productId,
          quantity: item.quantity,
          image: item.productId.image || [],
        }));

        dispatch(setCart(cartItems));
      }
    } catch (error) {
      // Error handling
    }
  };
  checkUser();
}, [dispatch]);

  // Login
 const login = async (email, password) => {
   try {
     const res = await axios.post(
       "http://localhost:5001/api/users/login",
       { email, password },
       { withCredentials: true }
     );

     if (res.data?.user) {
       setUser(res.data.user);

       // Transform local cart items for merging
       const localCart = JSON.parse(localStorage.getItem("cart")) || [];
       if (localCart.length > 0) {
         const itemsToMerge = localCart.map((item) => ({
           productId: item._id,
           quantity: item.quantity,
         }));

         await axios.post(
           "http://localhost:5001/api/cart/merge",
           { items: itemsToMerge },
           { withCredentials: true }
         );
         localStorage.removeItem("cart");
       }

       // Fetch updated cart
       const cartRes = await axios.get("http://localhost:5001/api/cart", {
         withCredentials: true,
       });

       // Transform cart items
       const cartItems = cartRes.data.items.map((item) => ({
         ...item.productId,
         quantity: item.quantity,
         image: item.productId.image || [],
       }));

       dispatch(setCart(cartItems));
     }
   } catch (error) {
     console.error("Login failed:", error);
     throw new Error(error.response?.data?.message || "Login failed");
   }
 };

  // Logout
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
