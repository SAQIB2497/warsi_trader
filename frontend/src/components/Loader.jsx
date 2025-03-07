import { useEffect, useState } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const Loader = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    setLoading(true); // Start loading when route changes

    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after a short delay (smooth transition)
    }, 500); // You can adjust this delay

    return () => clearTimeout(timer);
  }, [location]); // Runs when the route changes

  if (!loading) return null; // Hide loader when not loading

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="w-16 h-16 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
