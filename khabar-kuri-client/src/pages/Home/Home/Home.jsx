import { Helmet } from "react-helmet-async";
import Banner from "../Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopularMenue from "../PopularMenue/PopularMenue";
import Testimoniasls from "../Testimoniasls/Testimoniasls";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>KhabarKuri | Home</title>
      </Helmet>
      <Banner></Banner>
      <Category></Category>
      <PopularMenue></PopularMenue>
      <Featured></Featured>
      <Testimoniasls></Testimoniasls>
    </div>
  );
};

export default Home;
