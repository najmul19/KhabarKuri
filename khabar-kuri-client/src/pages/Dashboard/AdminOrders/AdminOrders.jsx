import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaMoneyBillWave, FaHistory } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const AdminOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [expandedOrder, setExpandedOrder] = useState(null);

  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await axiosSecure.put(`/payments/${orderId}`, {
        status: newStatus,
      });
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Status updated successfully!", {
          position: "top-right",
          theme: document.documentElement.getAttribute("data-theme") || "light",
        });
      }
    } catch (err) {
      toast.error("Failed to update status", {
        position: "top-right",
        theme: document.documentElement.getAttribute("data-theme") || "light",
      });
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-600",
    processing: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-600",
    shipped: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-600",
    delivered: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-600",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-600",
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          {/* <h2 className="text-3xl font-bold text-text dark:text-text">
            Order Management
          </h2> */}
           <SectionTitle 
        heading={"Order Management"}
        subHeading={"Explore Orders Tracking"}
      />
          <div className="flex items-center gap-2 text-text-muted dark:text-text-muted">
            <FaHistory className="text-lg" />
            <span>{orders.length} total orders</span>
          </div>
        </div>

        <div className="bg-[var(--card-bg)]  rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border dark:border-border">
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-muted dark:text-text-muted">
                    Order
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-muted dark:text-text-muted">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-muted dark:text-text-muted">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-muted dark:text-text-muted">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-muted dark:text-text-muted">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-text-muted dark:text-text-muted">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-border">
                {orders.map((order) => (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-secondary/20 dark:hover:bg-secondary/10"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                          <FaMoneyBillWave className="text-primary dark:text-primary-light" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-text dark:text-text">
                            #{order.transactionId.slice(0, 8)}...
                          </div>
                          <div className="text-sm text-text-muted dark:text-text-muted">
                            {order.menuItemIds?.length || 0} items
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-text dark:text-text">
                        {order.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-text dark:text-text">
                        ${order.price.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-text-muted dark:text-text-muted">
                        {new Date(order.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`text-sm px-3 py-1 rounded-full ${statusColors[order.status]} focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => toggleOrderDetails(order._id)}
                        className="text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-secondary mr-4"
                      >
                        {expandedOrder === order._id ? "Hide" : "View"} Details
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <AnimatePresence>
          {expandedOrder && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 bg-card-bg dark:bg-card-bg rounded-xl shadow dark:shadow-lg overflow-hidden"
            >
              {orders
                .filter((order) => order._id === expandedOrder)
                .map((order) => (
                  <div key={order._id} className="p-6">
                    <h3 className="text-lg font-medium text-text dark:text-text mb-4">
                      Order Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-text-muted dark:text-text-muted mb-2">
                          Customer Information
                        </h4>
                        <div className="space-y-2">
                          <p className="text-sm text-text dark:text-text">
                            Email: {order.email}
                          </p>
                          <p className="text-sm text-text dark:text-text">
                            Transaction ID: {order.transactionId}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-text-muted dark:text-text-muted mb-2">
                          Order Summary
                        </h4>
                        <div className="space-y-2">
                          <p className="text-sm text-text dark:text-text">
                            Date: {new Date(order.date).toLocaleString()}
                          </p>
                          <p className="text-sm text-text dark:text-text">
                            Status:{" "}
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${statusColors[order.status]}`}
                            >
                              {order.status}
                            </span>
                          </p>
                          <p className="text-sm text-text dark:text-text">
                            Total: ${order.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                   
                  </div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AdminOrders;