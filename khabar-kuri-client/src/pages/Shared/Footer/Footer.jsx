import { useTheme } from "../../../Hooks/ThemeContext/ThemeContext";
import "./footer.css";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`glass-footer ${theme}`}>
      <div className="footer-bg-shapes">
        <div className="shape-1"></div>
        <div className="shape-2"></div>
      </div>
      
      <div className="footer-content-container">
        {/* Brand Column */}
        <div className="footer-brand-column">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-orb">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="logo-icon"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3>KhabarKuri</h3>
            </div>
            <p className="footer-description">
              Bringing authentic flavors to your table since 2023
            </p>
          </div>
          
          <div className="footer-newsletter">
            <h4 className="newsletter-title">Stay Updated</h4>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button className="newsletter-btn">
                Subscribe
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Links Columns */}
        <div className="footer-links-columns">
          <div className="links-column">
            <h4 className="links-title">Navigation</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/menu">Our Menu</a></li>
              <li><a href="/order">Order Online</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="links-column">
            <h4 className="links-title">Contact Info</h4>
            <ul className="contact-info">
              <li>
                <svg className="contact-icon" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>123 Food Street, City</span>
              </li>
              <li>
                <svg className="contact-icon" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span>info@khabarkuri.com</span>
              </li>
              <li>
                <svg className="contact-icon" viewBox="0 0 24 24">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                </svg>
                <span>+123 456 7890</span>
              </li>
            </ul>
          </div>

          <div className="links-column">
            <h4 className="links-title">Opening Hours</h4>
            <ul className="opening-hours">
              <li>
                <span className="day">Monday - Friday</span>
                <span className="hours">11am - 10pm</span>
              </li>
              <li>
                <span className="day">Saturday</span>
                <span className="hours">10am - 11pm</span>
              </li>
              <li>
                <span className="day">Sunday</span>
                <span className="hours">10am - 9pm</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-content">
          <p className="copyright">&copy; {new Date().getFullYear()} KhabarKuri. All rights reserved.</p>
          
          <div className="footer-social">
            <a href="#" aria-label="Facebook" className="social-icon">
              <svg viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="social-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className="social-icon">
              <svg viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
          </div>
          
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;