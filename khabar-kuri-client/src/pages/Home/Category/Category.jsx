// Category.js
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import slide1 from "../../../assets/home/slide1.jpg";
import slide2 from "../../../assets/home/slide2.jpg";
import slide3 from "../../../assets/home/slide3.jpg";
import slide4 from "../../../assets/home/slide4.jpg";
import slide5 from "../../../assets/home/slide5.jpg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import "./category.css";

const Category = () => {
  return (
    <section className="category-section">
      <SectionTitle
        heading={"Order Online"}
        subHeading={"From 11.00am to 10.00pm"}
      />

      <div className="category-slider-container">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          centeredSlides={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          speed={1200}
          loop={true}
          modules={[Autoplay, Pagination]}
          className="category-swiper"
        >
          <SwiperSlide>
            <div className="slide-content">
              <img src={slide1} alt="Salad" className="slide-image" />
              <h3 className="slide-title">Salad</h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-content">
              <img src={slide2} alt="Pizza" className="slide-image" />
              <h3 className="slide-title">Pizza</h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-content">
              <img src={slide3} alt="Soups" className="slide-image" />
              <h3 className="slide-title">Soups</h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-content">
              <img src={slide4} alt="Desserts" className="slide-image" />
              <h3 className="slide-title">Desserts</h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-content">
              <img src={slide5} alt="Salad" className="slide-image" />
              <h3 className="slide-title">Salad</h3>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Category;