import Banner from "../components/Banner";
import Brand from "../components/Brand";
import Category from "../components/Category";
import ContactUs from "../components/ContactUs";
import Featured from "../components/Featured";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Reviews from "../components/Reviews";
import YouTubeVideo from "../components/youtubevideo";

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <Category/>
      <Brand/>
      <YouTubeVideo/>
      <Featured/>
      <Reviews/>
      <Features/>
      <ContactUs/>
      <Footer/>
    </div>
  );
}

export default Home;
