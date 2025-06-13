// NavBar.js
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProviders";
import { FaCartPlus, FaSun, FaMoon } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";
import useAdmin from "../../../Hooks/useAdmin";
import { useTheme } from "../../../Hooks/ThemeContext/ThemeContext";
import "./navbar.css";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [cart] = useCart();
  const { theme, toggleTheme } = useTheme();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("LogOut Successfully!");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const Links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Our Menu</Link>
      </li>
      <li>
        <Link to="/order/salad">Order Food</Link>
      </li>
      {user && isAdmin && (
        <li>
          <Link to="/dashboard/adminHome">Dashboard</Link>
        </li>
      )}
      {user && !isAdmin && (
        <li>
          <Link to="/dashboard/userHome">Dashboard</Link>
        </li>
      )}

      <li>
        <Link to={"/dashboard/cart"}>
          <div className="cart-indicator">
            <FaCartPlus className="cart-icon" />
            <span className="cart-badge">{cart.length}</span>
          </div>
        </Link>
      </li>

      {user ? (
        <>
          <li>
            <button onClick={handleLogOut} className="logout-btn">
              LogOut
            </button>
          </li>
        </>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </>
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="logo">
            KhabarKuri
          </Link>
        </div>

        <div className="navbar-links">
          <ul className="nav-menu">{Links}</ul>
        </div>

        <div className="navbar-actions">
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
          <div className="mobile-menu-toggle">
            <input type="checkbox" id="menu-toggle" />
            <label htmlFor="menu-toggle">
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;