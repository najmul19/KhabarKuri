import { useEffect, useState } from "react";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";


const PopularMenue = () => {
    const [menue,setMenue] = useState([])
    useEffect(()=>{
        fetch('menue.json')
        .then(res=> res.json())
        .then(data=> {
            const popularItems = data.filter(item=> item.category==="popular")
            setMenue(popularItems)
        })
    },[])
    return (
        <section className="mb-12">
            <SectionTitle
            heading="From Our Menue"
            subHeading="Popular Items"
            ></SectionTitle>
            <div className="grid md:grid-cols-2 gap-12">
                {
                    menue.map(item=> <MenuItem 
                    key={item._id}
                    item={item}
                    ></MenuItem> )
                }
            </div>
        </section>
    );
};

export default PopularMenue;