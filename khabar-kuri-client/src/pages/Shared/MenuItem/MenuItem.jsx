const MenuItem = ({ item, animationDelay = 0 }) => {
  const { name, image, price, recipe } = item;
  
  return (
    <div 
      className="glass-item-card"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="glass-item-media">
        <div className="glass-item-badge">${price.toFixed(2)}</div>
        <img 
          src={image} 
          alt={name} 
          className="glass-item-image"
          loading="lazy"
        />
      </div>
      
      <div className="glass-item-content">
        <h3 className="glass-item-title">{name}</h3>
        <p className="glass-item-desc">{recipe}</p>
        
        {/* <div className="glass-item-actions">
          <button className="glass-action-btn glass-add-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 6V12M12 12V18M12 12H18M12 12H6" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Add
          </button>
          
          <button className="glass-action-btn glass-details-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"/>
              <path d="M12 5C7.58172 5 4 8.58172 4 12C4 15.4183 7.58172 19 12 19C16.4183 19 20 15.4183 20 12C20 8.58172 16.4183 5 12 5Z"/>
            </svg>
            Details
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default MenuItem;