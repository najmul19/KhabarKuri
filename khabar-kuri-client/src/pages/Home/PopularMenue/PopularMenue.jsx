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
            <button className="btn btn-outline uppercase border-0 border-b-4 mt-4">View Full Menu</button>
        </section>
    );
};

export default PopularMenue;