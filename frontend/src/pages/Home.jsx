  import Banner from "../components/Banner";
  import Brand from "../components/Brand";
  import Category from "../components/Category";
  import Featured from "../components/Featured";
  import Features from "../components/Features";
  import Reviews from "../components/Reviews";
  import YouTubeVideo from "../components/youtubevideo";

  const Home = () => {
    return (
      <div>
        <Banner/>
        <Category/>
        <Brand/>
        <YouTubeVideo/>
        <Featured/>
        <Reviews/>
        <Features/>
      </div>
    );
  };

  export default Home;
