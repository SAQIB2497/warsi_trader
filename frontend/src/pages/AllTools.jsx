import { useEffect, useState } from "react";
import Tools from "../components/Tools";
import { getProducts } from "../services/productService.js";

const AllTools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch tools from the backend
    const fetchTools = async () => {
      try {
        const response = await getProducts();
        const products = response.data || []; // Handle new response structure

        const updatedTools = products.map((tool) => ({
          ...tool,
          discount:
            tool.price && tool.discountPrice
              ? Math.round(
                  ((tool.price - tool.discountPrice) / tool.price) * 100
                )
              : null,
        }));

        setTools(updatedTools);
        setLoading(false);
      } catch (err) {
        setError(err?.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  if (loading)
    return <p className="text-center text-gray-600">Loading products...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="w-full min-h-screen p-4">
      {/* Heading and Paragraph with same margin as cards */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Explore Top-Quality Tools for Every Task
        </h1>
        <p className="text-gray-700 text-base md:text-lg mb-8 text-justify">
          Whether you're a seasoned professional tackling complex projects or a
          dedicated DIY enthusiast working on creative home improvements, our
          extensive and carefully curated collection of premium tools guarantees
          unmatched durability, exceptional precision, and outstanding
          efficiency. Designed to meet the highest standards, our tools are
          built to withstand the toughest challenges while delivering
          consistent, reliable performance. Upgrade and enhance your toolkit
          with our top-rated, high-quality products, meticulously crafted and
          engineered for every task, every hand, and every skill level. From
          heavy-duty construction tools to delicate precision instruments, we
          offer a wide range of solutions tailored to your specific needs. We
          proudly provide reliable, durable, and long-lasting tools that empower
          you to work smarter, faster, and more efficiently, transforming every
          job into a simpler, smoother, and more enjoyable experience. With our
          tools, you can tackle any project with confidence, knowing that you
          have the best equipment to achieve professional-grade results every
          time.
        </p>

        {/* Responsive Grid with Centered Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-4">
          {tools.map((tool) => (
            <div key={tool._id}>
              <Tools tool={tool} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTools;
