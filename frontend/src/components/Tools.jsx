const Tools = ({ tool }) => {
  const fakeOriginalPrice = Math.round(tool.price * 1.4);

  return (
    <div className="relative bg-white shadow-lg rounded-xl overflow-hidden p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-gray-200 w-64">
      {/* Discount Badge */}
      <span className="absolute top-2 left-2 bg-gradient-to-r from-red-600 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
        🔥 Limited Offer
      </span>

      {/* Product Image */}
      <div className="flex justify-center">
        <img
          src={tool.image}
          alt={tool.name}
          className="w-24 h-24 object-contain rounded-lg"
        />
      </div>

      {/* Product Name */}
      <h3 className="font-semibold text-gray-800 text-sm mt-3">{tool.name}</h3>

      {/* Pricing */}
      <div className="flex items-center space-x-2 mt-1">
        <span className="text-red-600 font-bold text-lg">Rs. {tool.price}</span>
        <span className="text-gray-500 line-through text-sm">
          Rs. {fakeOriginalPrice}
        </span>
      </div>

      {/* Star Ratings */}
      <div className="flex items-center mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`text-yellow-400 ${
              i < tool.rating ? "fas fa-star" : "far fa-star"
            }`}
          />
        ))}
        <span className="text-gray-500 text-xs ml-2">
          {tool.reviews} reviews
        </span>
      </div>

      {/* CTA Button */}
      <button className="mt-3 w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-1.5 rounded-md font-semibold text-sm shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-300">
        Add to Cart 🛒
      </button>
    </div>
  );
};

export default Tools;
