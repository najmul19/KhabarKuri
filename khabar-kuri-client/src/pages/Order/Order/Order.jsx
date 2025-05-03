import { Helmet } from "react-helmet-async";
import orderCover from "../../../assets/shop/banner2.jpg";
import Cover from "../../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {  useState } from "react";
import useMenu from "../../../Hooks/useMenu";
import OrderTab from "../OrderTab/OrderTab";
import { useParams } from "react-router-dom";
const Order = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [menu] = useMenu();
  const {category} = useParams()
  console.log(category)
  const dessert = menu.filter((item) => item.category == "dessert");
  const soup = menu.filter((item) => item.category == "soup");
  const salad = menu.filter((item) => item.category == "salad");
  const pizza = menu.filter((item) => item.category == "pizza");
  const drinks = menu.filter((item) => item.category == "drinks");
  return (
    <div>
      <Helmet>
        <title>KhabarKuri | Order</title>
      </Helmet>
      <Cover img={orderCover} title="Order Food"></Cover>
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soup</Tab>
          <Tab>Dessert</Tab>
          <Tab>Drinks</Tab>
        </TabList>
        <TabPanel>
           
            <OrderTab
            items={salad}
            ></OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab
            items={pizza}
            ></OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab
            items={soup}
            ></OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab
            items={dessert}
            ></OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab
            items={drinks}
            ></OrderTab>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
