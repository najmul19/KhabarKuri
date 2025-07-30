import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";
import "./foodCard.css";

const FoodCard = ({ item }) => {
  const { name, image, price, recipe, _id: menuId } = item;
  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();

  const handleAddToCart = () => {
    if (user && user.email) {
      const cartItem = {
        menuId,
        email: user.email,
        name,
        image,
        price,
      };
      
      axiosSecure.post("/carts", cartItem).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} added to cart!`,
            showConfirmButton: false,
            timer: 1500,
            background: 'var(--card-bg)',
            color: 'var(--text)',
          });
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to add to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "var(--primary)",
        cancelButtonColor: "var(--secondary)",
        confirmButtonText: "Yes, login!",
        background: 'var(--card-bg)',
        color: 'var(--text)',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="glass-food-card">
      <div className="glass-food-media">
        <img src={image} alt={name} className="glass-food-image" />
        <div className="glass-food-price">${price}</div>
      </div>
      
      <div className="glass-food-content">
        <h3 className="glass-food-name">{name}</h3>
        <p className="glass-food-recipe">{recipe}</p>
        
        <div className="glass-food-actions">
          <button
            onClick={handleAddToCart}
            className="glass-food-add-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 6V12M12 12V18M12 12H18M12 12H6" 
                stroke="currentColor" strokeWidth="2"/>
            </svg>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;