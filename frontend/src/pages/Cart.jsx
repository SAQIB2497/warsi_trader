import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

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
                  <th className="p-2 sm:p-3 border">Original Price</th>
                  <th className="p-2 sm:p-3 border">Discount</th>
                  <th className="p-2 sm:p-3 border">Quantity</th>
                  <th className="p-2 sm:p-3 border">Total</th>
                  <th className="p-2 sm:p-3 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  const fakeOriginalPrice = Math.round(item.price * 1.4);
                  const discountPercentage = Math.round(
                    ((fakeOriginalPrice - item.price) / fakeOriginalPrice) * 100
                  );

                  return (
                    <tr
                      key={item._id}
                      className="border text-gray-800 text-sm sm:text-base"
                    >
                      <td className="p-2 sm:p-3 flex items-center gap-2 sm:gap-4 border">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md"
                        />
                        <span className="font-medium">{item.name}</span>
                      </td>
                      <td className="p-2 sm:p-3 border text-sm sm:text-lg font-semibold">
                        Rs. {item.price}
                      </td>
                      <td className="p-2 sm:p-3 border text-gray-500 line-through">
                        Rs. {fakeOriginalPrice}
                      </td>
                      <td className="p-2 sm:p-3 border text-red-500 font-medium">
                        {discountPercentage}% Off
                      </td>
                      <td className="p-2 sm:p-3 border">
                        <div className="flex items-center">
                          <button
                            onClick={() => dispatch(decreaseQuantity(item._id))}
                            className="px-2 py-1 bg-gray-300 text-gray-700 rounded-md"
                          >
                            -
                          </button>
                          <span className="px-3 sm:px-4">{item.quantity}</span>
                          <button
                            onClick={() => dispatch(increaseQuantity(item._id))}
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
                          onClick={() => dispatch(removeFromCart(item._id))}
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 sm:px-4 rounded-md transition"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
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
