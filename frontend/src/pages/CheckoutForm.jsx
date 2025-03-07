import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();

    // Fake payment process
    setTimeout(() => {
      toast.success("Payment Done!");
      navigate("/"); // Redirect to home
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Left Side - Cart Items */}
        <div className="md:w-2/3 bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
            Order Summary
          </h1>
          {cart.length === 0 ? (
            <p className="text-gray-600 text-lg">Your cart is empty.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 min-w-[600px]">
                <thead className="bg-gray-100">
                  <tr className="text-left text-gray-700 text-sm sm:text-base">
                    <th className="p-2 sm:p-3 border">Product</th>
                    <th className="p-2 sm:p-3 border">Quantity</th>
                    <th className="p-2 sm:p-3 border">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item._id} className="border text-gray-800">
                      <td className="p-2 sm:p-3 border flex items-center gap-2">
                        <img
                          src={item.image?.[0] || "/placeholder-image.jpg"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <span>{item.name}</span>
                      </td>
                      <td className="p-2 sm:p-3 border text-center">
                        {item.quantity}
                      </td>
                      <td className="p-2 sm:p-3 border">
                        Rs. {(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-right font-bold text-lg mt-4">
                Total: Rs.{" "}
                {cart
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Payment Form */}
        <div className="md:w-1/3 bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Payment Details
          </h2>
          <form onSubmit={handlePayment}>
            <div className="mb-3">
              <label className="block text-gray-700 font-medium mb-1">
                Card Number
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>

            <div className="mb-3 flex gap-2">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="123"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-2 px-4 rounded-md transition"
            >
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
