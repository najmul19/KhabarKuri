import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  FaWallet,
  FaHistory,
  FaChartLine,
  FaShoppingCart,
  FaStar,
  FaUser,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const UserHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [orderStats, setOrderStats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user stats
        const statsRes = await axiosSecure.get("/user-stats");
        setStats(statsRes.data);

        // Fetch payment history
        const paymentsRes = await axiosSecure.get(`/payments/${user?.email}`);
        setPaymentHistory(paymentsRes.data);

        // Fetch order statistics
        const orderStatsRes = await axiosSecure.get("/order-stats");
        setOrderStats(orderStatsRes.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchData();
    }
  }, [user, axiosSecure]);

  // Prepare chart data
  const prepareChartData = (payments) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Group payments by month
    const monthlyData = payments.reduce((acc, payment) => {
      const date = new Date(payment.date);
      const month = date.getMonth();
      const monthName = monthNames[month];

      if (!acc[monthName]) {
        acc[monthName] = 0;
      }
      acc[monthName] += payment.price;

      return acc;
    }, {});

    // Convert to array format for chart
    return monthNames.map((month) => ({
      name: month,
      amount: monthlyData[month] || 0,
    }));
  };

  const chartData = prepareChartData(paymentHistory);

  const COLORS = ["#0C6C84", "#85C0C6", "#06414F", "#D5EAED"];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0C6C84]"></div>
      </div>
    );
  }

  return (
    <div className="user-dashboard p-4 md:p-8">
      {/* Welcome Section */}
      <div className="welcome-section mb-8">
        <div className="welcome-card bg-gradient-to-r from-[#0C6C84] to-[#85C0C6] p-6 rounded-xl shadow-lg text-white flex flex-col md:flex-row justify-between items-center">
          <div className="welcome-content mb-4 md:mb-0">
            <h2 className="welcome-title text-3xl md:text-4xl font-bold mb-2">
              Hi, Welcome {user?.displayName || "Back"}
            </h2>
            <p className="welcome-subtitle text-lg opacity-90">
              {stats
                ? `You've spent $${stats.totalSpent.toFixed(2)} across ${
                    stats.totalOrders
                  } orders`
                : "Your food journey starts here"}
            </p>
          </div>
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="user-avatar w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white/20 object-cover"
            />
          ) : (
            <div className="default-avatar w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
              {user?.displayName?.charAt(0) || "U"}
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="stat-card bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center transition-transform hover:scale-105">
          <div className="stat-icon bg-[#0C6C84] w-12 h-12 rounded-full flex items-center justify-center text-white mr-4">
            <FaWallet className="text-xl" />
          </div>
          <div className="stat-content">
            <h3 className="text-sm text-gray-600 dark:text-gray-300">
              Total Spent
            </h3>
            <p className="text-xl font-bold dark:text-white">
              ${stats?.totalSpent.toFixed(2) || "0.00"}
            </p>
          </div>
        </div>

        <div className="stat-card bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center transition-transform hover:scale-105">
          <div className="stat-icon bg-[#85C0C6] w-12 h-12 rounded-full flex items-center justify-center text-white mr-4">
            <FaHistory className="text-xl" />
          </div>
          <div className="stat-content">
            <h3 className="text-sm text-gray-600 dark:text-gray-300">
              Total Orders
            </h3>
            <p className="text-xl font-bold dark:text-white">
              {stats?.totalOrders || 0}
            </p>
          </div>
        </div>

        <div className="stat-card bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center transition-transform hover:scale-105">
          <div className="stat-icon bg-[#06414F] w-12 h-12 rounded-full flex items-center justify-center text-white mr-4">
            <FaChartLine className="text-xl" />
          </div>
          <div className="stat-content">
            <h3 className="text-sm text-gray-600 dark:text-gray-300">
              Monthly Avg.
            </h3>
            <p className="text-xl font-bold dark:text-white">
              ${stats?.monthlyAverage.toFixed(2) || "0.00"}
            </p>
          </div>
        </div>

        <div className="stat-card bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center transition-transform hover:scale-105">
          <div className="stat-icon bg-[#D5EAED] w-12 h-12 rounded-full flex items-center justify-center text-[#06414F] mr-4">
            <FaStar className="text-xl" />
          </div>
          <div className="stat-content">
            <h3 className="text-sm text-gray-600 dark:text-gray-300">
              Favorite Item
            </h3>
            <p className="text-xl font-bold dark:text-white">
              {stats?.favoriteItem || "None"}
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="chart-container bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="chart-title text-lg font-semibold mb-4 dark:text-white">
            Monthly Spending
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="amount"
                  fill="#0C6C84"
                  name="Amount ($)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="chart-title text-lg font-semibold mb-4 dark:text-white">
            Spending by Category
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="revenue"
                  nameKey="category"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {orderStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="payment-history bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="section-title text-xl font-semibold mb-6 dark:text-white">
          Recent Transactions
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Items
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {
                // paymentHistory.slice(0, 5).map((payment) =>
                // Sort payments by date (newest first) before slicing
                paymentHistory
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, 5)
                  .map((payment) => (
                    <tr
                      key={payment._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-white">
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-2 text-[#85C0C6]" />
                          {new Date(payment.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-white">
                        <div className="flex items-center">
                          <FaMoneyBillWave className="mr-2 text-[#85C0C6]" />$
                          {payment.price.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            payment.status === "completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-white">
                        {payment.menuItemIds.length} items
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
        {paymentHistory.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No transactions found
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHome;
