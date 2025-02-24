import Tools from "../components/Tools";

const AllTools = () => {
  const allToolsData = [
    {
      id: 1,
      name: "Harden Pump Oiler",
      image: "/HardwareTool.jpg",
      price: 1020,
      discountPrice: 880,
      discount: 14,
      reviews: 3,
      rating: 3.5,
    },
    {
      id: 2,
      name: "Polyurethane Foam Spray",
      image: "/ElectricTool.jpg",
      price: null,
      discountPrice: 1230,
      discount: 0,
      reviews: 1,
      rating: 5,
    },
    {
      id: 3,
      name: "Air Duster 400ML",
      image: "/PlumberingTools.webp",
      price: null,
      discountPrice: 1510,
      discount: 0,
      reviews: 1,
      rating: 5,
    },
    {
      id: 4,
      name: "Harden 18pcs Repairing Tools Set",
      image: "/powerTool.jpg",
      price: 7580,
      discountPrice: 6900,
      discount: 9,
      reviews: 1,
      rating: 5,
    },
    {
      id: 5,
      name: "Harden 18pcs Repairing Tools Set",
      image: "/powerTool.jpg",
      price: 7580,
      discountPrice: 6900,
      discount: 9,
      reviews: 1,
      rating: 5,
    },
    {
      id: 6,
      name: "Air Duster 400ML",
      image: "/PlumberingTools.webp",
      price: null,
      discountPrice: 1510,
      discount: 0,
      reviews: 1,
      rating: 5,
    },
    {
      id: 7,
      name: "Harden Pump Oiler",
      image: "/HardwareTool.jpg",
      price: 1020,
      discountPrice: 880,
      discount: 14,
      reviews: 3,
      rating: 3.5,
    },
    {
      id: 4,
      name: "Harden 18pcs Repairing Tools Set",
      image: "/powerTool.jpg",
      price: 7580,
      discountPrice: 6900,
      discount: 9,
      reviews: 1,
      rating: 5,
    },
    {
      id: 1,
      name: "Harden Pump Oiler",
      image: "/HardwareTool.jpg",
      price: 1020,
      discountPrice: 880,
      discount: 14,
      reviews: 3,
      rating: 3.5,
    },
    {
      id: 2,
      name: "Polyurethane Foam Spray",
      image: "/ElectricTool.jpg",
      price: null,
      discountPrice: 1230,
      discount: 0,
      reviews: 1,
      rating: 5,
    },
    {
      id: 3,
      name: "Air Duster 400ML",
      image: "/PlumberingTools.webp",
      price: null,
      discountPrice: 1510,
      discount: 0,
      reviews: 1,
      rating: 5,
    },
    {
      id: 4,
      name: "Harden 18pcs Repairing Tools Set",
      image: "/powerTool.jpg",
      price: 7580,
      discountPrice: 6900,
      discount: 9,
      reviews: 1,
      rating: 5,
    },
    {
      id: 5,
      name: "Harden 18pcs Repairing Tools Set",
      image: "/powerTool.jpg",
      price: 7580,
      discountPrice: 6900,
      discount: 9,
      reviews: 1,
      rating: 5,
    },
    {
      id: 6,
      name: "Air Duster 400ML",
      image: "/PlumberingTools.webp",
      price: null,
      discountPrice: 1510,
      discount: 0,
      reviews: 1,
      rating: 5,
    },
    {
      id: 7,
      name: "Harden Pump Oiler",
      image: "/HardwareTool.jpg",
      price: 1020,
      discountPrice: 880,
      discount: 14,
      reviews: 3,
      rating: 3.5,
    },
    {
      id: 4,
      name: "Harden 18pcs Repairing Tools Set",
      image: "/powerTool.jpg",
      price: 7580,
      discountPrice: 6900,
      discount: 9,
      reviews: 1,
      rating: 5,
    },
  ];

  return (
    <div className="w-full min-h-screen p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Premium Tools Collection
      </h1>

      {/* Description */}
      <p className="text-gray-700 text-lg max-w-7xl text-justify leading-relaxed">
        Discover a high-quality selection of tools built for professionals and
        DIY enthusiasts alike. Our collection includes a variety of durable and
        efficient tools designed to handle all types of tasks, from home
        improvements to heavy-duty construction projects. Whether you're working
        on automotive repairs, woodworking, plumbing, or electrical work, we
        have the perfect tools for the job.
        <br />
        <br />
        Our range features hand tools such as wrenches, pliers, and
        screwdrivers, as well as power tools that bring precision and speed to
        your workflow. We also offer specialty tools to ensure that every task
        is completed with efficiency. Each tool is crafted with high-quality
        materials, providing long-lasting performance and reliability.
        <br />
        <br />
        Browse our selection to find the right tools for your needs, whether
        it's for a small repair, a large-scale project, or professional use.
        Equip yourself with the best tools in the market and get the job done
        with confidence!
      </p>

      {/* Space between description and products */}
      <div className="mt-10"></div>

      {/* Tool Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allToolsData.map((tool) => (
          <Tools key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
};

export default AllTools;
