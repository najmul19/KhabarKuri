import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaShoppingCart, FaWallet } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import useCart from "../../../Hooks/useCart";
import "./Cart.css";

const Cart = () => {
  const [cart, refetch] = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const axiosSecure = useAxiosSecure();

  // Calculate total price with animation effect
  useEffect(() => {
    const calculatedTotal = cart.reduce((sum, item) => sum + item.price, 0);
    const timer = setTimeout(() => setTotalPrice(calculatedTotal), 300);
    return () => clearTimeout(timer);
  }, [cart]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Remove Item?",
      text: "This will remove the item from your cart",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "var(--primary)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
      background: 'var(--bg-light)',
      color: 'var(--text)',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Removed!",
              text: "Item has been removed from your cart.",
              icon: "success",
              confirmButtonColor: "var(--primary)",
              background: 'var(--bg-light)',
              color: 'var(--text)',
            });
          }
        });
      }
    });
  };

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="user-dashboard cart-container">
      {/* Cart Header */}
      <div className="cart-header">
        <div>
          <h1 className="cart-title">
            <FaShoppingCart />
            Your Shopping Cart
          </h1>
          <p className="cart-subtitle">
            {cart.length} item{cart.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>
        
        {/* Summary Cards */}
        <div className="summary-cards">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="items-count-card"
          >
            <div className="items-count-icon">
              <FaShoppingCart />
            </div>
            <div>
              <p>Total Items</p>
              <p className="count-value">{cart.length}</p>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="total-price-card"
          >
            <div className="total-price-icon">
              <FaWallet />
            </div>
            <div>
              <p className="price-label">Total Price</p>
              <p className="price-value">${totalPrice.toFixed(2)}</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Cart Items */}
      {cart.length > 0 ? (
        <>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="cart-items-table"
          >
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <motion.tr
                      key={item._id}
                      variants={itemVariants}
                      whileHover={{ backgroundColor: "var(--primary-dark)" }}
                    >
                      <td>
                        <div className="item-cell">
                          <img
                            className="item-image"
                            src={item.image}
                            alt={item.name}
                          />
                          <div className="item-details">
                            <div className="item-name">{item.name}</div>
                            <div className="item-number">Item #{index + 1}</div>
                          </div>
                        </div>
                      </td>
                      <td className="item-price">${item.price.toFixed(2)}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="delete-btn"
                          aria-label="Remove item"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Checkout Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="checkout-section"
          >
            <div className="order-total">
              Order Total: <span className="order-total-amount">${totalPrice.toFixed(2)}</span>
            </div>
            <Link 
              to="/dashboard/payment" 
              className="checkout-btn"
            >
              <FaWallet />
              Proceed to Checkout
            </Link>
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="empty-cart"
        >
          <div className="empty-icon">
            <FaShoppingCart />
          </div>
          <h3 className="empty-title">Your cart is empty</h3>
          <p className="empty-description">Add some delicious items to get started</p>
          <Link 
            to="/menu" 
            className="browse-btn"
          >
            Browse Menu
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;