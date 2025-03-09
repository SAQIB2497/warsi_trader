import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="relative w-full group">
      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className="w-full"
      >
        <SwiperSlide>
          <img
            className="w-full min-h-[250px] sm:min-h-[350px] md:min-h-[450px] object-cover"
            src="/Banner1.avif"
            alt="Banner1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full min-h-[250px] sm:min-h-[350px] md:min-h-[450px] object-cover"
            src="/Banner2.webp"
            alt="Banner2"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full min-h-[250px] sm:min-h-[350px] md:min-h-[450px] object-cover"
            src="/Banner3.webp"
            alt="Banner3"
          />
        </SwiperSlide>
      </Swiper>

      {/* Custom Navigation Buttons - Always Visible on Mobile */}
      <button className="swiper-button-prev absolute left-3 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full z-10 transition-opacity duration-300 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 bg-black/50 hover:bg-black">
        <FaChevronLeft size={22} />
      </button>
      <button className="swiper-button-next absolute right-3 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full z-10 transition-opacity duration-300 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 bg-black/50 hover:bg-black">
        <FaChevronRight size={22} />
      </button>
    </div>
  );
};

export default Banner;
