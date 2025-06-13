import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../Hooks/useMenu";
import "./popular.css";
const PopularMenue = () => {
  // const [menue,setMenue] = useState([])
  // useEffect(()=>{
  //     fetch('menue.json')
  //     .then(res=> res.json())
  //     .then(data=> {
  //         const popularItems = data.filter(item=> item.category==="popular")
  //         setMenue(popularItems)
  //     })
  // },[])

  const [menu] = useMenu();
  const popular = menu.filter((item) => item.category == "popular");
  return (
    <section className="mb-12">
      <SectionTitle
        heading="From Our Menue"
        subHeading="Popular Items"
      ></SectionTitle>
      <div className="grid md:grid-cols-2 gap-12">
        {popular.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className="view-more-container">
        <button className="view-more-button">
          View Full Menu
        </button>
      </div>
    </section>
  );
};

export default PopularMenue;
