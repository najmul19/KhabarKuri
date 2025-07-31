import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaBook, FaDollarSign, FaUsers, FaShoppingCart, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer
} from "recharts";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  
  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data;
    },
  });

  // Chart colors using theme variables
  const COLORS = [
    "var(--primary)",
    "var(--primary-light)",
    "var(--secondary)",
    "var(--success)",
    "var(--warning)",
    "var(--error)",
    "var(--primary-darkr)",
    "var(--background)",
    "var(--card-bg)",
    "var(--text)",
    "var(--text-muted)",
    "var(--border)",
    "var(--glow-effect)",
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const statCardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Process data for charts
  const pieChartData = chartData.map((item) => ({
    name: item.category,
    value: item.revenue
  }));

  return (
    <div className="admin-dashboard p-6">
      {/* Welcome Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-[var(--text)] dark:text-secondary">
          <span>Welcome back, </span>
          {user?.displayName || "Admin"}
        </h2>
        <p className="text-[var(--text-muted)] mt-2">
          Here's what's happening with your restaurant today
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {/* Revenue Card */}
        <motion.div 
          variants={statCardVariants}
          className=" bg-[var(--card-bg)] border-[var(--border)]  shadow-[var(--primary-light)]  p-6 rounded-xl  border "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Total Revenue</p>
              <p className="text-2xl font-bold text-primary dark:text-secondary mt-1">
                ${stats?.revenue?.toLocaleString() || 0}
              </p>
              <p className="text-xs text-text-muted mt-2">Jan 1st - {new Date().toLocaleDateString()}</p>
            </div>
            <div className="p-3 rounded-full bg-primary/10 text-primary dark:bg-secondary/10 dark:text-secondary">
              <FaDollarSign className="text-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-success text-sm">
            <FaChartLine className="mr-1" />
            <span>22% increase</span>
          </div>
        </motion.div>

        {/* Users Card */}
        <motion.div 
          variants={statCardVariants}
          className="bg-[var(--card-bg)] border-[var(--border)]  shadow-[var(--primary-light)]  p-6 rounded-xl  border "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Total Users</p>
              <p className="text-2xl font-bold text-primary dark:text-secondary mt-1">
                {stats?.users?.toLocaleString() || 0}
              </p>
              <p className="text-xs text-text-muted mt-2">Active customers</p>
            </div>
            <div className="p-3 rounded-full bg-primary/10 text-primary dark:bg-secondary/10 dark:text-secondary">
              <FaUsers className="text-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-success text-sm">
            <FaChartLine className="mr-1" />
            <span>15% increase</span>
          </div>
        </motion.div>

        {/* Menu Items Card */}
        <motion.div 
          variants={statCardVariants}
          className="bg-[var(--card-bg)] border-[var(--border)]  shadow-[var(--primary-light)]  p-6 rounded-xl  border "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Menu Items</p>
              <p className="text-2xl font-bold text-primary dark:text-secondary mt-1">
                {stats?.menuItems?.toLocaleString() || 0}
              </p>
              <p className="text-xs text-text-muted mt-2">Available dishes</p>
            </div>
            <div className="p-3 rounded-full bg-primary/10 text-primary dark:bg-secondary/10 dark:text-secondary">
              <FaBook className="text-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-success text-sm">
            <FaChartLine className="mr-1" />
            <span>8% increase</span>
          </div>
        </motion.div>

        {/* Orders Card */}
        <motion.div 
          variants={statCardVariants}
          className=" bg-[var(--card-bg)] border-[var(--border)]  shadow-[var(--primary-light)] p-6 rounded-xl border   "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Total Orders</p>
              <p className="text-2xl font-bold text-primary dark:text-secondary mt-1">
                {stats?.orders?.toLocaleString() || 0}
              </p>
              <p className="text-xs text-text-muted mt-2">Completed today</p>
            </div>
            <div className="p-3 rounded-full bg-primary/10 text-primary dark:bg-secondary/10 dark:text-secondary">
              <FaShoppingCart className="text-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-warning text-sm">
            <FaChartLine className="mr-1" />
            <span>14% decrease</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className=" bg-[var(--card-bg)] border-[var(--border)]  shadow-[var(--primary-light)]  p-6 rounded-xl  border "
        >
          <h3 className="text-lg font-semibold text-primary dark:text-secondary mb-4">
            Order Quantities by Category
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis 
                  dataKey="category" 
                  stroke="var(--text-muted)"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="var(--text-muted)"
                  tick={{ fontSize: 12 }}
                />
                <Bar dataKey="quantity" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        className="cursor-pointer bg-[var(--card-bg)] border-[var(--border)] p-6 rounded-xl border transition-shadow duration-300 hover:shadow-[0_0_12px_var(--glow-effect)]"

          // className=" bg-[var(--card-bg)] border-[var(--border)]  shadow-[var(--primary-light)] p-6 rounded-xl  border "
        >
          <h3 className="text-lg font-semibold text-primary dark:text-secondary mb-4">
            Revenue Distribution
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend 
                  formatter={(value) => <span style={{ color: 'var(--text)' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminHome;