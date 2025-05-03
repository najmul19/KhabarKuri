import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import featuredImage from "../../../assets/home/featured.jpg";
import './Feature.css'
const Featured = () => {
  return (
    <div className="featured-item text-white pt-8  my-20">
      <SectionTitle
        heading="Featured Item"
        subHeading="Check It Out"
      ></SectionTitle>
      <div className="md:flex justify-center items-center pb-20 pt-12 px-36  ">
        <div>
          <img src={featuredImage} alt="" />
        </div>
        <div className="md: ml-10">
          <p>Aug 12,2027</p>
          <p className="uppercase">Where Can I get Some</p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae amet
            provident perspiciatis reiciendis! Excepturi, eum consequuntur sunt
            illum nam aut, veritatis quam maiores in laudantium, vero voluptas
            perspiciatis recusandae rerum enim sequi? A aperiam nihil eveniet
            quisquam itaque iure quia perspiciatis aliquam aut laboriosam magni
            veniam sequi, accusamus temporibus possimus.
          </p>
          <button className="btn btn-outline uppercase">Order Now</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
