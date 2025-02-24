import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi"; // Mobile menu icons
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-100 shadow-md sticky top-0 z-50">
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
          <Link
            to={"/"}
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden border border-gray-300 shadow-sm"
          >
            <img
              src="/public/Logo.jpg"
              alt="Logo"
              className="h-full w-full object-cover"
            />
          </Link>
          <div className="text-gray-800">
            <Link
              to={"/"}
              className="text-lg sm:text-xl font-bold tracking-wide"
            >
              Warsi <span className="text-blue-600">Trader</span>
            </Link>
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
        {/* Link to All Tools */}
        <Link
          to="/alltools"
          className="cursor-pointer hover:text-blue-600 transition"
        >
          All Tools
        </Link>

        <div className="cursor-pointer hover:text-blue-600 transition">
          Sale
        </div>
        <ScrollLink
          to="contact"
          smooth={true}
          duration={1000}
          className="cursor-pointer hover:text-blue-600 transition"
        >
          Contact Us
        </ScrollLink>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="sm:hidden flex flex-col items-center py-4 border-t bg-gray-50">
          <Link
            to="/alltools"
            className="py-2 cursor-pointer hover:text-blue-600 transition"
          >
            All Tools
          </Link>
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
