import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaQuoteLeft } from "react-icons/fa";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
const Testimoniasls = () => {
  const [reviws, setReviws] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => setReviws(data));
  }, []);
  return (
    <section className="my-20">
      <SectionTitle
        subHeading="What Our CLient Say"
        heading="Testimonials"
      ></SectionTitle>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviws.map((reviw) => (
          <SwiperSlide key={reviw._id}>
            <div className="my-8 mx-24  flex flex-col items-center ">
              <Rating style={{ maxWidth: 180 }} value={reviw.rating} readOnly />
              <FaQuoteLeft className="mt-5 text-5xl"></FaQuoteLeft>
              <p className="py-4">{reviw.details}</p>
              <h3 className="text-2xl text-orange-400">{reviw.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimoniasls;
