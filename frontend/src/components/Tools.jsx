import { useDispatch } from "react-redux";
import { addToCart, setCart } from "../redux/cartSlice";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Tools = ({ tool }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleAddToCart = async () => {
    if (user) {
      try {
        const response = await axios.post(
          "http://localhost:5001/api/cart/add",
          { productId: tool._id, quantity: 1 },
          { withCredentials: true }
        );

        const cartItems = response.data.items.map((item) => ({
          ...item.productId,
          quantity: item.quantity,
          image: item.productId.image || [], // Ensure image array
          _id: item.productId._id,
        }));

        dispatch(setCart(cartItems));
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      dispatch(
        addToCart({
          ...tool,
          image: Array.isArray(tool.image) ? tool.image : [tool.image],
        })
      );
    }
  };

  return (
    <div className="relative bg-white shadow-lg rounded-xl overflow-hidden p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-gray-200 w-64">
      <span className="absolute top-2 left-2 bg-gradient-to-r from-red-600 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
        🔥 Limited Offer
      </span>

      <div className="flex justify-center">
        <img
          src={tool.image?.[0] || "/placeholder-image.jpg"}
          alt={tool.name}
          className="w-24 h-24 object-contain rounded-lg"
        />
      </div>

      <h3 className="font-semibold text-gray-800 text-sm mt-3">{tool.name}</h3>

      <div className="flex items-center space-x-2 mt-1">
        <span className="text-red-600 font-bold text-lg">Rs. {tool.price}</span>
        <span className="text-gray-500 line-through text-sm">
          Rs. {Math.round(tool.price * 1.4)}
        </span>
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-3 w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-1.5 rounded-md font-semibold text-sm shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-300"
      >
        Add to Cart 🛒
      </button>
    </div>
  );
};

export default Tools;
