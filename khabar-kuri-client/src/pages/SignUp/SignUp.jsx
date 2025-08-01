import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProviders";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowRight,
  FaUtensils,
  FaStar,
  FaBolt,
  FaPercent,
} from "react-icons/fa";





const getCategoryPath = (index) => {
  if (index === 0) return "/order/salad";
  if (index === 1) return "/order/dessert";
  if (index === 2) return "/order/soup";
  return "/order/other"; // fallback if more than 3 items
};


const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const password = watch("password", "");

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((res) => {
        const loggedUser = res.user;
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
              photoURL: data.photoURL,
            };
            axiosPublic.post("/user", userInfo).then((res) => {
              if (res.data.insertedId) {
                reset();
                Swal.fire({
                  title: "Welcome to KhabarKuri!",
                  text: "Account created successfully",
                  icon: "success",
                  background: "var(--card-bg)",
                  color: "var(--text)",
                  confirmButtonColor: "var(--primary)",
                });
                navigate("/");
              }
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: error.message,
              icon: "error",
              background: "var(--card-bg)",
              color: "var(--text)",
              confirmButtonColor: "var(--error)",
            });
          });
      })
      .catch((error) => {
        Swal.fire({
          title: "Sign Up Failed",
          text: error.message,
          icon: "error",
          background: "var(--card-bg)",
          color: "var(--text)",
          confirmButtonColor: "var(--error)",
        });
      });
  };

  const popularItems = [
    {
      id: 1,
      name: "Chicken Caesar Salad",
      price: 12.99,
      image: "https://i.ibb.co/mr1vsnRw/Chicken-Caesar-Salad.jpg",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Classic Tiramisu",
      price: 9.99,
      image: "https://i.ibb.co/6RCMfjZy/Classic-Tiramisu.jpg",
      rating: 4.5,
    },
    {
      id: 3,
      name: "Creamy Mushroom Soup",
      price: 3.5,
      image: "https://i.ibb.co/1J4B1Jpb/Creamy-Mushroom-Soup.jpg",
      rating: 4.7,
    },
  ];

  // Password strength indicator
  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 6) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[!@#$&*]/.test(password)) strength += 20;
    return strength;
  };

  const passwordStrength = getPasswordStrength();
  const strengthColor =
    passwordStrength < 40
      ? "bg-error"
      : passwordStrength < 80
      ? "bg-warning"
      : "bg-success";

  return (
    <>
      <Helmet>
        <title>KhabarKuri | SignUp</title>
      </Helmet>

      <div className="min-h-screen bg-background dark:bg-background relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/10 dark:bg-primary/20"
              initial={{
                x: Math.random() * 100,
                y: Math.random() * 100,
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
              }}
              animate={{
                x: Math.random() * 100,
                y: Math.random() * 100,
                transition: {
                  duration: Math.random() * 20 + 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            />
          ))}
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Side - Food Showcase */}
            <div className="hidden lg:block">
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="bg-card-bg dark:bg-card-bg rounded-3xl shadow-2xl dark:shadow-lg p-8 border border-border/20 dark:border-border/30 backdrop-blur-sm"
              >
                <motion.h2
                  className="text-3xl font-bold text-primary dark:text-primary-light mb-6"
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Today's Specials
                </motion.h2>

                {/* <div className="space-y-6">
                  {popularItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/20 dark:hover:bg-secondary/10 cursor-pointer transition-all group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute bottom-2 left-2 bg-primary/90 dark:bg-primary-light/90 text-white text-xs px-2 py-1 rounded-full flex items-center">
                          <FaStar className="mr-1 text-yellow-300" />
                          {item.rating}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-lg text-text dark:text-text">
                          {item.name}
                        </h3>
                        <p className="text-primary dark:text-primary-light font-semibold text-lg">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <button className="text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-secondary p-2 rounded-full bg-white/80 dark:bg-card-bg shadow-sm">
                        <FaUtensils />
                      </button>
                    </motion.div>
                  ))}
                </div> */}

                <div className="space-y-6">
                  {popularItems.map((item, index) => (
                    <Link to={getCategoryPath(index)} key={item.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/20 dark:hover:bg-secondary/10 cursor-pointer transition-all group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute bottom-2 left-2 bg-primary/90 dark:bg-primary-light/90 text-white text-xs px-2 py-1 rounded-full flex items-center">
                            <FaStar className="mr-1 text-yellow-300" />
                            {item.rating}
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3 className="font-medium text-lg text-text dark:text-text">
                            {item.name}
                          </h3>
                          <p className="text-primary dark:text-primary-light font-semibold text-lg">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>

                        <button className="text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-secondary p-2 rounded-full bg-white/80 dark:bg-card-bg shadow-sm">
                          <FaUtensils />
                        </button>
                      </motion.div>
                    </Link>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-2xl p-6 border border-primary/10 dark:border-primary/20"
                >
                  <h3 className="font-semibold text-lg text-text dark:text-text mb-3 flex items-center gap-2">
                    <FaPercent className="text-primary dark:text-primary-light" />
                    Member Benefits
                  </h3>
                  <ul className="space-y-3 text-sm text-text-muted dark:text-text-muted">
                    <motion.li
                      className="flex items-center gap-3"
                      initial={{ x: -10 }}
                      animate={{ x: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <span className="w-6 h-6 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-light">
                        <FaBolt className="text-xs" />
                      </span>
                      <span>Priority delivery - Get food 30% faster</span>
                    </motion.li>
                    <motion.li
                      className="flex items-center gap-3"
                      initial={{ x: -10 }}
                      animate={{ x: 0 }}
                      transition={{ delay: 0.75 }}
                    >
                      <span className="w-6 h-6 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-light">
                        <FaStar className="text-xs" />
                      </span>
                      <span>Exclusive discounts and offers</span>
                    </motion.li>
                    <motion.li
                      className="flex items-center gap-3"
                      initial={{ x: -10 }}
                      animate={{ x: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <span className="w-6 h-6 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-light">
                        <FaUtensils className="text-xs" />
                      </span>
                      <span>Personalized menu recommendations</span>
                    </motion.li>
                  </ul>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Side - Sign Up Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="bg-card-bg dark:bg-card-bg rounded-3xl shadow-2xl dark:shadow-lg p-8 border border-border/20 dark:border-border/30 backdrop-blur-sm"
            >
              <div className="text-center mb-8">
                <motion.h1
                  className="text-4xl font-bold text-primary dark:text-primary-light mb-3 bg-gradient-to-r from-primary to-primary-light dark:from-primary-light dark:to-secondary bg-clip-text text-transparent"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  Join KhabarKuri
                </motion.h1>
                <motion.p
                  className="text-text-muted dark:text-text-muted text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Create your account to start your food journey
                </motion.p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-text dark:text-text mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      placeholder="Enter your name"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.name
                          ? "border-error focus:ring-error"
                          : "border-border dark:border-border focus:ring-primary"
                      } focus:outline-none focus:ring-2 transition-all pl-11 bg-transparent`}
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted dark:text-text-muted">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-error">Name is required</p>
                  )}
                </motion.div>

                {/* Photo URL Field */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  <label className="block text-sm font-medium text-text dark:text-text mb-2">
                    Profile Photo URL
                  </label>
                  <div className="relative">
                    <input
                      {...register("photoURL", { required: true })}
                      type="text"
                      placeholder="Paste your photo URL"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.photoURL
                          ? "border-error focus:ring-error"
                          : "border-border dark:border-border focus:ring-primary"
                      } focus:outline-none focus:ring-2 transition-all pl-11 bg-transparent`}
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted dark:text-text-muted">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.photoURL && (
                    <p className="mt-1 text-sm text-error">
                      Photo URL is required
                    </p>
                  )}
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-text dark:text-text mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      placeholder="your@email.com"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.email
                          ? "border-error focus:ring-error"
                          : "border-border dark:border-border focus:ring-primary"
                      } focus:outline-none focus:ring-2 transition-all pl-11 bg-transparent`}
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted dark:text-text-muted">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-error">Email is required</p>
                  )}
                </motion.div>

                {/* Password Field */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  <label className="block text-sm font-medium text-text dark:text-text mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                        pattern:
                          /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6}/,
                      })}
                      type="password"
                      placeholder="Create a password"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.password
                          ? "border-error focus:ring-error"
                          : "border-border dark:border-border focus:ring-primary"
                      } focus:outline-none focus:ring-2 transition-all pl-11 bg-transparent`}
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted dark:text-text-muted">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Password Strength Meter */}
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <motion.div
                        className={`h-1.5 rounded-full ${strengthColor}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${passwordStrength}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-text-muted dark:text-text-muted">
                      <span>Weak</span>
                      <span>Strong</span>
                    </div>
                  </div>

                  {errors.password?.type === "required" && (
                    <p className="mt-1 text-sm text-error">
                      Password is required
                    </p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="mt-1 text-sm text-error">
                      Password must be at least 6 characters
                    </p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p className="mt-1 text-sm text-error">
                      Password must be less than 20 characters
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="mt-1 text-sm text-error">
                      Include uppercase, lowercase, number, and special
                      character
                    </p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="pt-2"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 px-6 bg-gradient-to-r from-primary to-primary-light dark:from-primary dark:to-primary-dark text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Create Account</span>
                    <FaArrowRight className="relative z-10" />
                    <span className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary dark:from-primary-light dark:to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
                  </motion.button>
                </motion.div>

                {/* Login Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-center text-sm text-text-muted dark:text-text-muted"
                >
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-secondary transition-colors"
                  >
                    Log in
                  </Link>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
