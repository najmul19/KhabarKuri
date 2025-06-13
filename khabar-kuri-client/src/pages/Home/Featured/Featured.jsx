// Featured.js
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImage from "../../../assets/home/featured.jpg";
import "./Feature.css";

const Featured = () => {
  return (
    <div className="featured-section featured-item bg-fixed">
      <SectionTitle heading="Featured Item" subHeading="Check It Out" />
      
      <div className="featured-container">
        <div className="featured-image">
          <img src={featuredImage} alt="Featured Dish" />
        </div>
        <div className="featured-content">
          <div className="featured-meta">
            <span className="featured-date">Aug 12, 2027</span>
            <h3 className="featured-title">Where Can I Get Some</h3>
          </div>
          <p className="featured-description">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae amet
            provident perspiciatis reiciendis! Excepturi, eum consequuntur sunt
            illum nam aut, veritatis quam maiores in laudantium, vero voluptas
            perspiciatis recusandae rerum enim sequi? A aperiam nihil eveniet
            quisquam itaque iure quia perspiciatis aliquam aut laboriosam magni
            veniam sequi, accusamus temporibus possimus.
          </p>
          <button className="featured-button">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;