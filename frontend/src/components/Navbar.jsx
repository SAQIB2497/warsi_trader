import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi"; // Mobile menu icons
import { IoIosArrowDown } from "react-icons/io"; // Dropdown icon

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [lightsDropdownOpen, setLightsDropdownOpen] = useState(false);

  // Custom dropdown items for Tools
  const toolsItems = [
    "All tools",
    "Hand Tools",
    "Power Tools",
    "Tool Sets",
    "Measuring Tools",
    "Cutting Tools",
    "Gardening Tools",
  ];

  // Custom dropdown items for Lights
  const lightsItems = [
    "All Lights",
    "LED Lights",
    "Ceiling Lights",
    "Outdoor Lights",
    "Decorative Lights",
    "Emergency Lights",
    "Solar Lights",
  ];

  return (
    <nav className="bg-gray-100 shadow-md">
      {/* Shipping Banner */}
      <div className="bg-gray-900 text-white text-center py-2 text-xs sm:text-sm z-40">
        Free shipping across Pakistan for orders over Rs 4999
      </div>

      {/* Main Navbar */}
      <div className="flex items-center justify-between px-6 sm:px-8 py-2">
        {/* Mobile Menu Toggle */}
        <button
          className="sm:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiOutlineMenu />}
        </button>

        {/* Logo & Brand Name */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden border border-gray-300 shadow-sm">
            <img
              src="/public/Logo.jpg"
              alt="Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-gray-800">
            <div className="text-lg sm:text-xl font-bold tracking-wide">
              Warsi <span className="text-blue-600">Trader</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              Electric & Hardware
            </div>
          </div>
        </div>

        {/* Centered Search Bar */}
        <div className="hidden sm:flex flex-grow items-center justify-center">
          <div className="relative w-full max-w-lg">
            <input
              type="search"
              placeholder="Search products..."
              className="w-full px-4 sm:px-5 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-blue-600 text-lg">
              <CiSearch />
            </div>
          </div>
        </div>

        {/* Profile and Cart Icons */}
        <div className="hidden sm:flex items-center gap-6 text-gray-700 text-lg">
          <div className="cursor-pointer hover:text-blue-600 flex items-center gap-1">
            👤 <span className="hidden md:inline text-base">Profile</span>
          </div>
          <div className="cursor-pointer hover:text-blue-600 flex items-center gap-1">
            🛒 <span className="hidden md:inline text-base">Cart</span>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="flex sm:hidden px-4 pb-3">
        <div className="relative w-full">
          <input
            type="search"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-blue-600 text-lg">
            <CiSearch />
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="hidden sm:flex justify-center space-x-8 text-gray-700 font-medium py-2 border-t">
        {/* Tools Dropdown */}
        <div
          className="cursor-pointer hover:text-blue-600 transition relative flex items-center gap-1"
          onMouseEnter={() => setToolsDropdownOpen(true)}
          onMouseLeave={() => setToolsDropdownOpen(false)}
        >
          Tools <IoIosArrowDown className="text-sm" />
          {toolsDropdownOpen && (
            <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg mt-2 py-2 w-48 z-50">
              {toolsItems.map((item, index) => (
                <div key={index} className="px-4 py-2 hover:bg-gray-100">
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lights Dropdown */}
        <div
          className="cursor-pointer hover:text-blue-600 transition relative flex items-center gap-1"
          onMouseEnter={() => setLightsDropdownOpen(true)}
          onMouseLeave={() => setLightsDropdownOpen(false)}
        >
          Lights <IoIosArrowDown className="text-sm" />
          {lightsDropdownOpen && (
            <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg mt-2 py-2 w-48 z-50">
              {lightsItems.map((item, index) => (
                <div key={index} className="px-4 py-2 hover:bg-gray-100">
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="cursor-pointer hover:text-blue-600 transition">
          Sale
        </div>
        <div className="cursor-pointer hover:text-blue-600 transition">
          Contact Us
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="sm:hidden flex flex-col items-center py-4 border-t bg-gray-50">
          <div
            className="py-2 cursor-pointer hover:text-blue-600 transition"
            onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
          >
            <div className="flex items-center gap-1">
              Tools <IoIosArrowDown className="text-sm" />
            </div>
            {toolsDropdownOpen && (
              <div className="pl-4">
                {toolsItems.map((item, index) => (
                  <div key={index} className="py-1">
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div
            className="py-2 cursor-pointer hover:text-blue-600 transition"
            onClick={() => setLightsDropdownOpen(!lightsDropdownOpen)}
          >
            <div className="flex items-center gap-1">
              Lights <IoIosArrowDown className="text-sm" />
            </div>
            {lightsDropdownOpen && (
              <div className="pl-4">
                {lightsItems.map((item, index) => (
                  <div key={index} className="py-1">
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="py-2 cursor-pointer hover:text-blue-600 transition">
            Sale
          </div>
          <div className="py-2 cursor-pointer hover:text-blue-600 transition">
            Contact Us
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
