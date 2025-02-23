import {
  FaShippingFast,
  FaHeadset,
  FaShoppingCart,
  FaLock,
} from "react-icons/fa";

const Features = () => {
  return (
    <div className="py-10 px-6 md:px-44 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 text-gray-800">
        {/* Free Delivery */}
        <div className="flex items-start gap-3">
          <FaShippingFast className="text-red-500 text-2xl" />
          <div>
            <h3 className="font-semibold text-lg">Free delivery in Pakistan</h3>
            <p className="text-gray-600 text-sm">Spend Rs4999+ to qualify</p>
          </div>
        </div>

        {/* Satisfied or Refunded */}
        <div className="flex items-start gap-3">
          <FaShoppingCart className="text-red-500 text-2xl" />
          <div>
            <h3 className="font-semibold text-lg">Satisfied or refunded</h3>
            <p className="text-gray-600 text-sm">
              Genuine tools at the best prices
            </p>
          </div>
        </div>

        {/* Top-notch Support */}
        <div className="flex items-start gap-3">
          <FaHeadset className="text-red-500 text-2xl" />
          <div>
            <h3 className="font-semibold text-lg">Top-notch support</h3>
            <p className="text-gray-600 text-sm">
              Here to help you buy the right tools
            </p>
          </div>
        </div>

        {/* Secure Payments */}
        <div className="flex items-start gap-3">
          <FaLock className="text-red-500 text-2xl" />
          <div>
            <h3 className="font-semibold text-lg">Secure payments</h3>
            <p className="text-gray-600 text-sm">Pay online with confidence</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
