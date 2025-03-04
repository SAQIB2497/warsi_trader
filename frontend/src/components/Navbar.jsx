import { useContext, useState } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { FaTools, FaHome } from "react-icons/fa";
import { MdSms } from "react-icons/md";
import { useSelector } from "react-redux";


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Get cart items from Redux
  const cartItems = useSelector((state) => state.cart.cart || []);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

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

      <div className="flex items-center justify-between px-6 sm:px-8 py-2 relative">
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

        {/* Navigation Links */}
        <div className="hidden sm:flex items-center gap-6 text-gray-700 text-lg">
          <Link
            to="/"
            className="cursor-pointer hover:text-blue-600 flex items-center gap-1"
          >
            <FaHome /> <span className="hidden md:inline text-base">Home</span>
          </Link>

          <a
            href="#contact"
            className="cursor-pointer hover:text-blue-600 flex items-center gap-1"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#contact")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            <MdSms />{" "}
            <span className="hidden md:inline text-base">Contact Us</span>
          </a>

          <Link
            to="/alltools"
            className="cursor-pointer hover:text-blue-600 flex items-center gap-1"
          >
            <FaTools />{" "}
            <span className="hidden md:inline text-base">Tools</span>
          </Link>

          {/* Cart Button with Item Count */}
          <Link
            to="/cart"
            className="cursor-pointer hover:text-blue-600 flex items-center gap-1 relative"
          >
            🛒 <span className="hidden md:inline text-base">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/adminDashboard"
              className="text-blue-500 font-semibold hover:text-blue-700 transition"
            >
              Admin
            </Link>
          )}

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

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-white shadow-md flex flex-col items-center py-4 sm:hidden transition-all duration-300 z-50">
            <button
              className="absolute top-4 left-4 text-2xl text-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              <HiX />
            </button>

            <Link
              to="/"
              className="py-3 text-gray-700 hover:text-blue-600 text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            <a
              href="#contact"
              className="py-3 text-gray-700 hover:text-blue-600 text-lg"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#contact")
                  .scrollIntoView({ behavior: "smooth" });
                setMenuOpen(false);
              }}
            >
              Contact Us
            </a>

            <Link
              to="/alltools"
              className="py-3 text-gray-700 hover:text-blue-600 text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Tools
            </Link>

            <Link
              to="/cart"
              className="py-3 text-gray-700 hover:text-blue-600 text-lg relative"
              onClick={() => setMenuOpen(false)}
            >
              Cart
              {cartCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {user?.role === "admin" && (
              <Link
                to="/adminDashboard"
                className="py-3 text-blue-500 font-semibold hover:text-blue-700 transition"
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </Link>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="py-3 text-red-500 font-semibold hover:text-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="py-3 text-blue-500 font-semibold hover:text-blue-700 transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
