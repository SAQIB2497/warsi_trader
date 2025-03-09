const Featured = () => {
  return (
    <div className="mt-10 px-6 md:px-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl md:text-2xl font-bold">Featured Product</h1>
        <span className="text-red-500 cursor-pointer hover:underline">
          View Details
        </span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-white p-6 border border-gray-200 rounded-lg shadow-lg">
        {/* Left Side - Image with Zoom Effect */}
        <div className="w-full md:w-1/2 flex justify-center overflow-hidden group">
          <img
            src="/Multifunctional.avif"
            alt="Product"
            className="w-full max-w-xs md:max-w-sm object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        </div>

        {/* Right Side - Details */}
        <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
          <h2 className="text-lg md:text-2xl font-semibold leading-tight">
            Multi-Functional Set 33 Pieces Hardware Toolbox for Household Tools
          </h2>
          <p className="text-gray-800 text-base md:text-lg">
            Rs. 3,080{" "}
            <span className="line-through text-gray-500 text-sm">
              Rs. 3,420
            </span>
          </p>

          {/* Quantity Selector */}
          <div className="flex justify-center md:justify-start items-center space-x-4">
            <p className="text-lg font-medium">Quantity:</p>
            <div className="flex items-center border rounded-lg">
              <button className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-l">
                -
              </button>
              <span className="px-4">1</span>
              <button className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-r">
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 mt-3">
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md transition w-full md:w-auto">
              Add to Cart
            </button>
            <button className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md transition w-full md:w-auto">
              Buy It Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
