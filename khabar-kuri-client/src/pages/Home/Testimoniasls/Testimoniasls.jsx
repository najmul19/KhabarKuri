// Testimonials.js
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaQuoteLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import "./testimonials.css";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <section className="testimonials-section">
      <div className="glass-header-wrapper">

      <SectionTitle
        subHeading="What Our Clients Say"
        heading="Testimonials"
      />
      </div>
      
      <div className="testimonials-container">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="testimonials-swiper"
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="testimonial-card">
                <div className="testimonial-rating">
                  <Rating 
                    style={{ maxWidth: 120 }} 
                    value={review.rating} 
                    readOnly 
                  />
                </div>
                <div className="testimonial-quote">
                  <FaQuoteLeft className="quote-icon" />
                </div>
                <p className="testimonial-text">{review.details}</p>
                <div className="testimonial-author">
                  <h4>{review.name}</h4>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;