// NavBar.js
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProviders";
import { FaCartPlus, FaSun, FaMoon, FaUser } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";
import useAdmin from "../../../Hooks/useAdmin";
import { useTheme } from "../../../Hooks/ThemeContext/ThemeContext";
import "./navbar.css";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [cart] = useCart();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("LogOut Successfully!");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const Links = (
    <>
      <li>
        <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
      </li>
      <li>
        <Link to="/menu" className="nav-link" onClick={() => setIsMenuOpen(false)}>Our Menu</Link>
      </li>
      <li>
        <Link to="/order/salad" className="nav-link" onClick={() => setIsMenuOpen(false)}>Order Food</Link>
      </li>
      {user && isAdmin && (
        <li>
          <Link to="/dashboard/adminHome" className="nav-link" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
        </li>
      )}
      {user && !isAdmin && (
        <li>
          <Link to="/dashboard/userHome" className="nav-link" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
        </li>
      )}

      <li>
        <Link to={"/dashboard/cart"} className="nav-link cart-link" onClick={() => setIsMenuOpen(false)}>
          <div className="cart-indicator">
            <FaCartPlus className="cart-icon" />
            <span className="cart-badge">{cart.length}</span>
          </div>
        </Link>
      </li>

      {user ? (
        <>
          <li className="user-profile">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName} className="user-avatar" />
            ) : (
              <FaUser className="user-icon" />
            )}
            <button onClick={handleLogOut} className="logout-btn">
              LogOut
            </button>
          </li>
        </>
      ) : (
        <li>
          <Link to="/login" className="login-btn" onClick={() => setIsMenuOpen(false)}>Login</Link>
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

        <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <ul className="nav-menu">{Links}</ul>
        </div>

        <div className="navbar-actions">
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
          <div className="mobile-menu-toggle">
            <input 
              type="checkbox" 
              id="menu-toggle" 
              checked={isMenuOpen}
              onChange={toggleMenu}
            />
            <label htmlFor="menu-toggle" className="hamburger">
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