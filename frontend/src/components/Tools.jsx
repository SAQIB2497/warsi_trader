const Tools = ({ tool }) => {
  return (
    <div className="border border-gray-300 rounded-lg shadow-md p-4 relative bg-white">
      {/* Discount Badge */}
      {tool.discount > 0 && (
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md">
          Save {tool.discount}%
        </span>
      )}

      {/* Product Image */}
      <img
        src={tool.image}
        alt={tool.name}
        className="w-full h-40 object-contain mb-4"
      />

      {/* Price Section */}
      <div className="text-red-600 font-bold text-lg">
        {tool.price
          ? `From Rs.${tool.discountPrice}`
          : `Rs.${tool.discountPrice}`}
        {tool.price && (
          <span className="text-gray-500 line-through text-sm ml-2">
            Rs.{tool.price}
          </span>
        )}
      </div>

      {/* Product Name */}
      <p className="font-medium text-gray-700 mt-1">{tool.name}</p>

      {/* Star Ratings */}
      <div className="flex items-center mt-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`text-yellow-400 ${
              i < tool.rating ? "fas fa-star" : "far fa-star"
            }`}
          />
        ))}
        <span className="text-gray-500 text-sm ml-2">
          {tool.reviews} reviews
        </span>
      </div>

      {/* CTA Button */}
      <button className="mt-3 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition">
        {(tool.price = "Add to cart")}
      </button>
    </div>
  );
};

export default Tools;
