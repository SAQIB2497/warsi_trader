const Brand = () => {
  // Sample brand data with image paths
  const brands = [
    { id: 1, name: "Plasco", logo: "/public/Plasco.jpeg" },
    { id: 2, name: "Adamjee DuraBuilt", logo: "/public/Adamjee.jpeg" },
    { id: 3, name: "Popular Pipes", logo: "/public/PEL.jpg" },
    { id: 4, name: "Sonex", logo: "/public/sonex.png" },
    { id: 5, name: "Master Sanitary Fittings", logo: "/public/master.png" },
    { id: 6, name: "PEL", logo: "/public/PEL.jpg" },
    {
      id: 7,
      name: "Schneider Electric Pakistan",
      logo: "/public/schneider-electric.webp",
    },
    { id: 8, name: "GFC Fans", logo: "/public/GFC.png" },
    { id: 9, name: "Pak Fan", logo: "/public/PEL.jpg" },
    { id: 10, name: "Khawaja Electric", logo: "/public/khawaja.jpeg" },
  ];

  return (
    <div className="p-10 bg-gray-200">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Brands We Offer
      </h2>

      {/* Brand Grid */}
      <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow-md p-4 h-32 
  transition-transform duration-300 ease-in-out hover:scale-110"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brand;
