import React from "react";
import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "../../../assets/menu/banner3.jpg";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import pizzatImg from "../../../assets/menu/pizza-bg.jpg";
import saladtImg from "../../../assets/menu/salad-bg.jpg";
import souptImg from "../../../assets/menu/soup-bg.jpg";
import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";
import "./MenuPage.css";

const Menu = () => {
  const [menu] = useMenu();
  const dessert = menu.filter((item) => item.category == "dessert");
  const soup = menu.filter((item) => item.category == "soup");
  const salad = menu.filter((item) => item.category == "salad");
  const pizza = menu.filter((item) => item.category == "pizza");
  const offered = menu.filter((item) => item.category == "offered");

  return (
    <div className="menu-page">
      <Helmet>
        <title>KhabarKuri | Menu</title>
      </Helmet>

      {/* Main Cover */}
      <Cover 
        img={menuImg} 
        title="Our Menu"
        description="Explore our delicious offerings"
      />

      {/* Today's Offer Section */}
      <section className="today-offer-section">
        <div className="glass-header-wrapper">
        <SectionTitle
          subHeading="Don't Miss"
          heading="Today's Offer"
        />

        </div>
        <MenuCategory items={offered} />
      </section>

      {/* Menu Categories */}
      <div className="menu-categories-container">
        <MenuCategory
          items={dessert}
          title="Dessert"
          img={dessertImg}
          description="Sweet endings to perfect your meal"
        />
        <MenuCategory
          items={pizza}
          title="Pizza"
          img={pizzatImg}
          description="Authentic flavors with every slice"
        />
        <MenuCategory
          items={salad}
          title="Salad"
          img={saladtImg}
          description="Fresh and healthy choices"
        />
        <MenuCategory
          items={soup}
          title="Soup"
          img={souptImg}
          description="Comfort in every bowl"
        />
      </div>
    </div>
  );
};

export default Menu;