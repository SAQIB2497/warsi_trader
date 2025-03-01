import { useContext, useState } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-100 shadow-md sticky top-0 z-50">
      <div className="bg-gray-900 text-white text-center py-2 text-xs sm:text-sm">
        Free shipping across Pakistan for orders over Rs 4999
      </div>

      <div className="flex items-center justify-between px-6 sm:px-8 py-2">
        {/* Mobile Menu Toggle */}
        <button
          className="sm:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiOutlineMenu />}
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link to={"/"}>
            <img
              src="/public/Logo.jpg"
              alt="Logo"
              className="h-12 w-12 rounded-full border border-gray-300 shadow-sm"
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

        {/* Profile, Cart, Login/Logout */}
        <div className="hidden sm:flex items-center gap-6 text-gray-700 text-lg">
          <div className="cursor-pointer hover:text-blue-600 flex items-center gap-1">
            👤 <span className="hidden md:inline text-base">Profile</span>
          </div>
          <div className="cursor-pointer hover:text-blue-600 flex items-center gap-1">
            <span className="hidden md:inline text-base">Contact Us</span>
          </div>
          <div className="cursor-pointer hover:text-blue-600 flex items-center gap-1">
            🛒 <span className="hidden md:inline text-base">Cart</span>
          </div>

          {/* Show Login or Logout based on authentication status */}
          {user ? (
            <button
              onClick={handleLogout}
              className="text-red-500 font-semibold hover:text-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-blue-500 font-semibold hover:text-blue-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
