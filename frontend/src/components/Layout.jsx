import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ContactUs from "../components/ContactUs";


const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* This renders the current page content */}
      <ContactUs/>
      <Footer />
    </div>
  );
};

export default Layout;
