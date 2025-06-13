// Banner.js
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../../assets/home/01.jpg";
import img2 from "../../assets/home/02.jpg";
import img3 from "../../assets/home/03.png";
import img4 from "../../assets/home/04.jpg";
import img5 from "../../assets/home/05.png";
import img6 from "../../assets/home/06.png";
import "./banner.css";

const Banner = () => {
  return (
    <div className="banner-container">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={5000}
        transitionTime={1000}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        stopOnHover={false}
        swipeable={true}
        emulateTouch={true}
        className="banner-carousel"
      >
        <div className="banner-slide">
          <img src={img1} alt="Banner 1" />
          <div className="banner-overlay">
            <div className="banner-content">
              <h2 className="banner-title">Delicious Food</h2>
              <p className="banner-subtitle">Experience the taste of perfection</p>
            </div>
          </div>
        </div>
        <div className="banner-slide">
          <img src={img2} alt="Banner 2" />
          <div className="banner-overlay">
            <div className="banner-content">
              <h2 className="banner-title">Fresh Ingredients</h2>
              <p className="banner-subtitle">Only the finest for our customers</p>
            </div>
          </div>
        </div>
        <div className="banner-slide">
          <img src={img3} alt="Banner 3" />
          <div className="banner-overlay">
            <div className="banner-content">
              <h2 className="banner-title">Exquisite Flavors</h2>
              <p className="banner-subtitle">A culinary journey awaits you</p>
            </div>
          </div>
        </div>
        <div className="banner-slide">
          <img src={img4} alt="Banner 4" />
          <div className="banner-overlay">
            <div className="banner-content">
              <h2 className="banner-title">Perfect Ambience</h2>
              <p className="banner-subtitle">Dine in comfort and style</p>
            </div>
          </div>
        </div>
        <div className="banner-slide">
          <img src={img5} alt="Banner 5" />
          <div className="banner-overlay">
            <div className="banner-content">
              <h2 className="banner-title">Crafted With Love</h2>
              <p className="banner-subtitle">Every dish tells a story</p>
            </div>
          </div>
        </div>
        <div className="banner-slide">
          <img src={img6} alt="Banner 6" />
          <div className="banner-overlay">
            <div className="banner-content">
              <h2 className="banner-title">Memorable Experiences</h2>
              <p className="banner-subtitle">Create moments with every bite</p>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;