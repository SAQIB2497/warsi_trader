import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setCart,
} from "../redux/cartSlice";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleRemove = async (productId) => {
    if (user) {
      try {
        const response = await axios.delete(
          `http://localhost:5001/api/cart/remove/${productId}`,
          { withCredentials: true }
        );

        const cartItems = response.data.items.map((item) => ({
          ...item.productId,
          quantity: item.quantity,
          _id: item.productId._id,
        }));

        dispatch(setCart(cartItems));
      } catch (error) {
        console.error("Error removing item:", error);
      }
    } else {
      dispatch(removeFromCart(productId));
    }
  };

  // Add similar logic for quantity changes
  const handleQuantityChange = async (productId, newQuantity) => {
    if (user) {
      try {
        const response = await axios.put(
          "http://localhost:5001/api/cart/update",
          { productId, quantity: newQuantity },
          { withCredentials: true }
        );

        const cartItems = response.data.items.map((item) => ({
          ...item.productId,
          quantity: item.quantity,
          _id: item.productId._id,
        }));

        dispatch(setCart(cartItems));
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    } else {
      // Handle local storage update
    }
  };

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-600 text-lg">Your cart is empty.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 min-w-[600px]">
              <thead className="bg-gray-100">
                <tr className="text-left text-gray-700 text-sm sm:text-base">
                  <th className="p-2 sm:p-3 border">Product</th>
                  <th className="p-2 sm:p-3 border">Price</th>
                  <th className="p-2 sm:p-3 border">Quantity</th>
                  <th className="p-2 sm:p-3 border">Total</th>
                  <th className="p-2 sm:p-3 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr
                    key={item._id}
                    className="border text-gray-800 text-sm sm:text-base"
                  >
                    <td className="p-2 sm:p-3 flex items-center gap-2 sm:gap-4 border">
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md"
                      />
                      <span className="font-medium">{item.name}</span>
                    </td>
                    <td className="p-2 sm:p-3 border text-sm sm:text-lg font-semibold">
                      Rs. {item.price}
                    </td>
                    <td className="p-2 sm:p-3 border">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity - 1)
                          }
                          className="px-2 py-1 bg-gray-300 text-gray-700 rounded-md"
                        >
                          -
                        </button>
                        <span className="px-3 sm:px-4">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity + 1)
                          }
                          className="px-2 py-1 bg-gray-300 text-gray-700 rounded-md"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-2 sm:p-3 border text-sm sm:text-lg font-semibold">
                      Rs. {(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="p-2 sm:p-3 border">
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 sm:px-4 rounded-md transition"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {cart.length > 0 && (
          <div className="mt-4 sm:mt-6 flex justify-center sm:justify-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-md transition">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
