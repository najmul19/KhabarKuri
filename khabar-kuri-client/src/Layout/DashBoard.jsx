import {
  FaAd,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";

const DashBoard = () => {
  const [cart] = useCart();
  // TODO: get isAdmin value from the databse
  // const isAdmin = true;
  const [isAdmin] = useAdmin();//5/15/2025
  return (
    <div className="flex">
      {/* dahsboard sidebar */}
      <div className="w-56 min-h-screen bg-orange-400">
        <ul className="menu">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome className=""></FaHome>
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItems">
                  <FaUtensils className=""></FaUtensils>
                  Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItems">
                  <FaList className=""></FaList>
                  Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageBookings">
                  <FaAd className=""></FaAd>
                  Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allUsers">
                  <FaUsers className=""></FaUsers>
                  All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userHome">
                  <FaHome className=""></FaHome>
                  User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reservation">
                  <FaCalendar className=""></FaCalendar>
                  Reservation
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/cart">
                  <FaShoppingCart className=""></FaShoppingCart>
                  My Cart: ({cart.length})
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/review">
                  <FaAd className=""></FaAd>
                  Review
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/bookings">
                  <FaList className=""></FaList>
                  My Bookings
                </NavLink>
              </li>
            </>
          )}
          {/* shared navlinks */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome className=""></FaHome>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <FaSearch className=""></FaSearch>
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/contact">
              <FaEnvelope></FaEnvelope>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dahsboard content */}
      <div className="flex-1 p-8 w-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;
