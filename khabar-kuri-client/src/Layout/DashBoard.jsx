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
  FaBell,
  FaClipboardList,
  FaReceipt,
  FaTruck,
  FaStore,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";
import { useTheme } from "../Hooks/ThemeContext/ThemeContext";
import { motion } from "framer-motion";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";

const DashBoard = () => {
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  const { theme } = useTheme();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  // Glowing purple/rose theme colors
  const themeColors = {
    light: {
      sidebarBg: "#0C6C84", // Teal
      sidebarText: "#ffffff",
      activeLinkBg: "rgba(255, 255, 255, 0.2)",
      activeLinkText: "#ffffff",
      activeLinkGlow: "0 0 10px rgba(255, 255, 255, 0.5)",
      divider: "rgba(255,255,255,0.2)",
      contentBg: "#f8fafc",
      badgeBg: "rgba(255, 255, 255, 0.3)",
    },
    dark: {
      sidebarBg: "#1E0B36", // Deep purple
      sidebarText: "#E9D5FF",
      activeLinkBg: "rgba(168, 85, 247, 0.2)", // Purple-500 with opacity
      activeLinkText: "#F0ABFC", // Rose glow
      activeLinkGlow: "0 0 15px rgba(240, 171, 252, 0.7)", // Rose glow
      divider: "rgba(233, 213, 255, 0.1)",
      contentBg: "#0F0A1A",
      badgeBg: "rgba(168, 85, 247, 0.3)",
    },
  };

  const { data: notifications = [], refetch } = useQuery({
    queryKey: ["notifications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/notifications?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
    onSuccess: (data) => {
      setHasUnread(data.some((n) => !n.read));
    },
  });

  const unreadCount = notifications.filter((n) => !n.read).length;
  console.log(unreadCount);

  const colors = themeColors[theme];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Full-height Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-64 h-screen fixed flex flex-col"
        style={{
          backgroundColor: colors.sidebarBg,
          boxShadow: "4px 0 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="p-4 flex flex-col h-full">
          <h2
            className="text-2xl font-bold mb-8 px-4"
            style={{ color: colors.sidebarText }}
          >
            {isAdmin ? "Admin Panel" : "My Dashboard"}
          </h2>

          {/* Scrollable Menu Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <ul className="menu space-y-1">
              {isAdmin ? (
                <>
                  <NavItem
                    to="/dashboard/adminHome"
                    icon={<FaHome />}
                    colors={colors}
                  >
                    Admin Home
                  </NavItem>
                  <NavItem
                    to="/dashboard/addItems"
                    icon={<FaUtensils />}
                    colors={colors}
                  >
                    Add Items
                  </NavItem>
                  <NavItem
                    to="/dashboard/manageItems"
                    icon={<FaStore />}
                    colors={colors}
                  >
                    Manage Items
                  </NavItem>
                  <NavItem
                    to="/dashboard/adminOrders"
                    icon={<FaTruck />}
                    colors={colors}
                  >
                    Manage Orders
                  </NavItem>
                  <NavItem
                    to="/dashboard/manageBookings"
                    icon={<FaAd />}
                    colors={colors}
                  >
                    Manage Bookings
                  </NavItem>
                  <NavItem
                    to="/dashboard/allUsers"
                    icon={<FaUsers />}
                    colors={colors}
                  >
                    All Users
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem
                    to="/dashboard/userHome"
                    icon={<FaHome />}
                    colors={colors}
                  >
                    User Home
                  </NavItem>
                  <NavItem
                    to="/dashboard/paymentHistory"
                    icon={<FaCalendar />}
                    colors={colors}
                  >
                    Payment History
                  </NavItem>
                  <NavItem
                    to="/dashboard/cart"
                    icon={<FaShoppingCart />}
                    colors={colors}
                  >
                    My Cart{" "}
                    <span
                      className="badge"
                      style={{ backgroundColor: colors.badgeBg }}
                    >
                      {cart.length}
                    </span>
                  </NavItem>
                  <NavItem
                    to="/dashboard/review"
                    icon={<FaAd />}
                    colors={colors}
                  >
                    Review
                  </NavItem>
                  <NavItem
                    to="/dashboard/bookings"
                    icon={<FaReceipt />}
                    colors={colors}
                  >
                    Add Bookings
                  </NavItem>
                  <NavItem
                    to="/dashboard/myBookings"
                    icon={<FaClipboardList />}
                    colors={colors}
                  >
                    My Bookings
                  </NavItem>

                  {/* <NavItem
                    to="/dashboard/notificationBell"
                    icon={<FaList />}
                    colors={colors}
                  >
                    Notification
                  </NavItem> */}
                  <li className="relative">
                    <NavLink
                      to="/dashboard/notificationBell"
                      className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-lg mx-2 transition-all ${
                          isActive
                            ? "font-medium"
                            : "opacity-80 hover:opacity-100"
                        }`
                      }
                      style={({ isActive }) => ({
                        color: isActive
                          ? colors.activeLinkText
                          : colors.sidebarText,
                        backgroundColor: isActive
                          ? colors.activeLinkBg
                          : "transparent",
                        boxShadow: isActive ? colors.activeLinkGlow : "none",
                      })}
                    >
                      <span className="text-lg mr-3">
                        <FaBell />
                      </span>
                      <span className="flex-1">Notifications</span>
                      {unreadCount > 0 && (
                        <motion.span
                          className="absolute right-4 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        >
                          {unreadCount}
                        </motion.span>
                      )}
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Fixed Bottom Navigation */}
          <div
            className="mt-auto pt-4 border-t"
            style={{ borderColor: colors.divider }}
          >
            <ul className="menu space-y-1">
              <NavItem to="/" icon={<FaHome />} colors={colors}>
                Home
              </NavItem>
              <NavItem to="/order/salad" icon={<FaSearch />} colors={colors}>
                Menu
              </NavItem>
              <NavItem
                to="/order/contact"
                icon={<FaEnvelope />}
                colors={colors}
              >
                Contact
              </NavItem>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Content Area */}
      <div
        className="flex-1 overflow-y-auto ml-64"
        style={{ backgroundColor: colors.contentBg }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-6 md:p-8 min-h-full"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

// Custom NavItem Component with Glow Effect
const NavItem = ({ to, icon, colors, children }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center px-4 py-3 rounded-lg mx-2 transition-all ${
            isActive ? "font-medium" : "opacity-80 hover:opacity-100"
          }`
        }
        style={({ isActive }) => ({
          color: isActive ? colors.activeLinkText : colors.sidebarText,
          backgroundColor: isActive ? colors.activeLinkBg : "transparent",
          boxShadow: isActive ? colors.activeLinkGlow : "none",
        })}
      >
        <span className="text-lg mr-3">{icon}</span>
        <span className="flex-1">{children}</span>
      </NavLink>
    </li>
  );
};

export default DashBoard;
