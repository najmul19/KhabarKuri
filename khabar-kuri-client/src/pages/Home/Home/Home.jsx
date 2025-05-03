import Banner from "../Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopularMenue from "../PopularMenue/PopularMenue";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <PopularMenue></PopularMenue>
            <Featured></Featured>
        </div>
    );
};

export default Home;