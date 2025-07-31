import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import "./menuCat.css";

const MenuCategory = ({ items, title, img, description }) => {
  return (
    <section className={`glass-menu-category ${title ? "with-cover" : ""}`}>
      {title && (
        <Cover
          img={img}
          title={title}
          description={description}
          glassStyle={true}
        />
      )}

      <div className="glass-items-container">
        <div className="glass-items-grid">
          {items.map((item, index) => (
            <MenuItem key={item._id} item={item} animationDelay={index * 0.1} />
          ))}
        </div>

        {title && (
          <div className="glass-view-all">
            <Link
              to={`/order/${title.toLowerCase()}`}
              className="glass-view-link"
            >
              <span>Explore All {title.toLowerCase()}</span>
              <div className="glass-view-arrow">→</div>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuCategory;
