import { useRef } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Seemab Akbar",
    product: "Total mini grinder and sander",
    review: "Great products, reached on time, satisfactory results",
    rating: 5,
    image: "/powerTool.jpg",
  },
  {
    id: 2,
    name: "Waseem Alam",
    product: "Harden 3pcs step drill bit set",
    review: "",
    rating: 5,
    image: "/Logo.jpg",
  },
  {
    id: 3,
    name: "Khurram Ashraf",
    product: "Harden Double End Ring Spanner 1pc",
    review: "",
    rating: 5,
    image: "/ElectricTool.jpg",
  },
  {
    id: 4,
    name: "Seemab Akbar",
    product: "Total mini grinder and sander",
    review: "Great products, reached on time, satisfactory results",
    rating: 5,
    image: "/powerTool.jpg",
  },
  {
    id: 5,
    name: "Waseem Alam",
    product: "Harden 3pcs step drill bit set",
    review: "",
    rating: 5,
    image: "/Logo.jpg",
  },
  {
    id: 6,
    name: "Khurram Ashraf",
    product: "Harden Double End Ring Spanner 1pc",
    review: "",
    rating: 5,
    image: "/ElectricTool.jpg",
  },
];

const Reviews = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="mt-10 px-10 text-center">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-700">
        Let customers speak for us
      </h2>
      <div className="flex justify-center items-center gap-2 mt-2">
        <div className="flex text-yellow-500 text-lg">
          {Array(5)
            .fill()
            .map((_, i) => (
              <FaStar key={i} />
            ))}
        </div>
        <p className="text-gray-600 text-sm">from 156 reviews</p>
      </div>

      {/* Reviews Section */}
      <div className="relative mt-8 px-[32px]">
        {/* Left Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-gray-700 hover:bg-gray-200"
        >
          <FaChevronLeft size={20} />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-4"
          style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="w-64 flex-shrink-0 bg-white p-4 rounded-lg shadow-md text-center"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="flex justify-center text-yellow-500 text-lg">
                {Array(review.rating)
                  .fill()
                  .map((_, i) => (
                    <FaStar key={i} />
                  ))}
              </div>
              <h3 className="mt-2 font-semibold">{review.product}</h3>
              {review.review && (
                <p className="text-gray-600 text-sm mt-1">{review.review}</p>
              )}
              <p className="text-gray-500 text-sm mt-2">{review.name}</p>
              <div className="flex justify-center mt-2">
                <img
                  src={review.image}
                  alt={review.product}
                  className="w-16 h-16 object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-gray-700 hover:bg-gray-200"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Reviews;
