import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ContactUs from "../components/ContactUs";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />{" "}
      {/* This ensures the nested pages (Home, AllTools) are rendered */}
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Layout;
