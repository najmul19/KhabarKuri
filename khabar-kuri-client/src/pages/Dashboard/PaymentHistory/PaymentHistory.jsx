import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { 
  FaHistory, 
  FaReceipt, 
  FaMoneyBillWave, 
  FaCalendarAlt, 
  FaCheckCircle, 
  FaSyncAlt,
  FaRegSadTear
} from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import "./PaymentHistory.css";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });

  // Sort payments by date (newest first)
  const sortedPayments = [...payments].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Calculate statistics
  const totalSpent = payments.reduce((sum, payment) => sum + payment.price, 0);
  const completedPayments = payments.filter(p => p.status === 'completed').length;
  const pendingPayments = payments.filter(p => p.status === 'pending').length;
  const lastTransactionDate = payments.length > 0 ? new Date(sortedPayments[0].date) : null;

  if (isLoading) {
    return (
      <div className="user-dashboard">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-dashboard payment-history-container">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="payment-header"
      >
        <div>
          <h1 className="payment-title">
            <FaHistory />
            Payment History
          </h1>
          <p className="payment-subtitle">
            All your transaction records in one place
          </p>
        </div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="stats-card"
        >
          <div className="stats-icon">
            <FaReceipt />
          </div>
          <div>
            <p>Total Transactions</p>
            <p className="stats-value">{payments.length}</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Summary Cards */}
      <div className="summary-grid">
        {/* Total Spent Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="summary-card"
        >
          <div className="summary-icon">
            <FaMoneyBillWave />
          </div>
          <div>
            <p className="summary-label">Total Spent</p>
            <p className="summary-value">${totalSpent.toFixed(2)}</p>
          </div>
        </motion.div>

        {/* Completed Payments Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="summary-card"
        >
          <div className="summary-icon">
            <FaCheckCircle />
          </div>
          <div>
            <p className="summary-label">Completed</p>
            <p className="summary-value">{completedPayments}</p>
          </div>
        </motion.div>

        {/* Pending Payments Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="summary-card"
        >
          <div className="summary-icon">
            <FaSyncAlt />
          </div>
          <div>
            <p className="summary-label">Pending</p>
            <p className="summary-value">{pendingPayments}</p>
          </div>
        </motion.div>

        {/* Last Transaction Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="summary-card"
        >
          <div className="summary-icon">
            <FaCalendarAlt />
          </div>
          <div>
            <p className="summary-label">Last Transaction</p>
            <p className="summary-value">
              {lastTransactionDate ? lastTransactionDate.toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Transactions Table */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="transactions-table"
      >
        {payments.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Transaction</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedPayments.map((payment) => (
                  <motion.tr 
                    key={payment._id}
                    whileHover={{ backgroundColor: 'var(--primary-dark)' }}
                  >
                    <td>
                      <div className="transaction-cell">
                        <div className="transaction-icon">
                          <GiPayMoney />
                        </div>
                        <div>
                          <div>{payment.itemName || 'Payment'}</div>
                          <div className="transaction-id">{payment.transactionId}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {new Date(payment.date).toLocaleDateString()}
                      <div className="transaction-time">
                        {new Date(payment.date).toLocaleTimeString()}
                      </div>
                    </td>
                    <td>${payment.price.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${
                        payment.status === 'completed' ? 'status-completed' :
                        payment.status === 'pending' ? 'status-pending' : ''
                      }`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <FaRegSadTear />
            </div>
            <h3 className="empty-title">No transactions found</h3>
            <p className="empty-description">
              Your payment history will appear here once you make transactions
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentHistory;