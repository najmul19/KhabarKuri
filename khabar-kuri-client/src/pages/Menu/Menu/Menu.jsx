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

const Menu = () => {
  const [menu] = useMenu();
  const dessert = menu.filter((item) => item.category == "dessert");
  const soup = menu.filter((item) => item.category == "soup");
  const salad = menu.filter((item) => item.category == "salad");
  const pizza = menu.filter((item) => item.category == "pizza");
  const offered = menu.filter((item) => item.category == "offered");
  return (
    <div>
      <Helmet>
        <title>KhabarKuri | Menu</title>
      </Helmet>

      {/* main cover */}
      <Cover img={menuImg} title="Our Menu"></Cover>
      <SectionTitle
        subHeading="Don't Miss "
        heading="Todays Offer"
      ></SectionTitle>
      {/* offered menu items */}
      <MenuCategory items={offered}></MenuCategory>
      {/* dessert menu items */}
      <MenuCategory
        items={dessert}
        title={"desert"}
        img={dessertImg}
      ></MenuCategory>
      <MenuCategory
        items={pizza}
        title={"pizza"}
        img={pizzatImg}
      ></MenuCategory>
      <MenuCategory
        items={salad}
        title={"salad"}
        img={saladtImg}
      ></MenuCategory>
      <MenuCategory items={soup} title={"soup"} img={souptImg}></MenuCategory>
    </div>
  );
};

export default Menu;
