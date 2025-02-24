import { Link } from "react-router-dom";

const Category = () => {
  // Category Data
  const categories = [
    { id: 1, name: "Hardware Tools", image: "public/HardwareTool.jpg" },
    { id: 2, name: "Electric Tools", image: "public/ElectricTool.jpg" },
    { id: 3, name: "Plumbing Tools", image: "public/PlumberingTools.webp" },
    { id: 4, name: "Power Tools", image: "public/powerTool.jpg" },
    { id: 5, name: "Safety Equipment", image: "public/Logo.jpg" },
  ];

  return (
    <div className="p-10">
      {/* Heading */}
      <div className="flex justify-between px-10">
        <h2 className="text-xl font-semibold">Shop by Category</h2>
        <Link
          to="/alltools"
          className="text-blue-600 hover:underline cursor-pointer"
        >
          View All
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="flex flex-wrap cursor-pointer justify-center gap-10 mt-8">
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col items-center">
            {/* Category Circle with Hover Scale Effect */}
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border border-gray-300 shadow-md flex items-center justify-center bg-white overflow-hidden transition-transform duration-300 hover:scale-110">
              <img
                src={category.image}
                alt={category.name}
                className="w-3/4 h-3/4 object-contain"
              />
            </div>

            {/* Category Name */}
            <p className="mt-6 text-center text-sm font-bold text-gray-700">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
