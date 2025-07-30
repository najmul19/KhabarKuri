import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import { Link } from "react-router-dom";
import "./popular.css";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popular = menu.filter((item) => item.category === "popular");
  
  return (
    <section className="glass-popular-section">
      {/* Matching Background Elements */}
      <div className="glass-bg-gradient"></div>
      
      {/* Consistent Header */}
      <div className="glass-header-wrapper">
        <SectionTitle
          heading="Popular Delicacies"
          subHeading="Customer Favorites"
          glassStyle={true}
        />
        <p className="glass-description">
          Discover the dishes our guests can't get enough of - each one a testament to culinary excellence
        </p>
      </div>
      
      {/* Unified Grid Layout */}
      <div className="glass-items-grid">
        {popular.map((item, index) => (
          <div 
            className="glass-item-card" 
            key={item._id}
            style={{ '--delay': index * 0.1 + 's' }}
          >
            <div className="glass-item-media">
              <img 
                src={item.image} 
                alt={item.name} 
                className="glass-item-image"
                loading="lazy"
              />
              <div className="glass-item-badge">${item.price.toFixed(2)}</div>
            </div>
            
            <div className="glass-item-content">
              <h3 className="glass-item-title">{item.name}</h3>
              <p className="glass-item-desc">{item.recipe}</p>
              
              {/* <div className="glass-item-actions">
                <button className="glass-action-btn glass-add-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path d="M12 6V12M12 12V18M12 12H18M12 12H6" 
                      stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Add
                </button>
                
                <button className="glass-action-btn glass-details-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"/>
                    <path d="M12 5C7.58172 5 4 8.58172 4 12C4 15.4183 7.58172 19 12 19C16.4183 19 20 15.4183 20 12C20 8.58172 16.4183 5 12 5Z"/>
                  </svg>
                  Details
                </button>
              </div> */}
            </div>
          </div>
        ))}
      </div>
      
      {/* Matching CTA */}
      <div className="glass-view-all">
        <Link to="/menu" className="glass-view-link">
          Explore Full Menu Selection
          <span className="glass-view-arrow">→</span>
        </Link>
      </div>
    </section>
  );
};

export default PopularMenu;