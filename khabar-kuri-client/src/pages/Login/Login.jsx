import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../Providers/AuthProviders";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { FaLock, FaEnvelope, FaUtensils, FaArrowRight } from "react-icons/fa";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const [disabled, setDisabled] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((res) => {
        const user = res.user;
        Swal.fire({
          title: "Welcome Back!",
          text: "Login successful",
          icon: "success",
          background: "var(--card-bg)",
          color: "var(--text)",
          confirmButtonColor: "var(--primary)",
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          title: "Login Failed",
          text: error.message,
          icon: "error",
          background: "var(--card-bg)",
          color: "var(--text)",
          confirmButtonColor: "var(--error)",
        });
      });
  };

  const handleValidateCaptcha = (e) => {
    const userCaptchaValue = e.target.value;
    if (validateCaptcha(userCaptchaValue)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>KhabarKuri | Login</title>
      </Helmet>

      <div className="min-h-screen bg-background dark:bg-background flex items-center justify-center p-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Food Image/Animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="bg-card-bg dark:bg-card-bg rounded-3xl shadow-2xl dark:shadow-lg p-8 border border-border/20 dark:border-border/30 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                <div className="relative z-10">
                  <h1 className="text-4xl font-bold text-primary dark:text-primary-light mb-4">
                    Welcome Back Foodie!
                  </h1>
                  <p className="text-lg text-text-muted dark:text-text-muted mb-8">
                    Sign in to continue your delicious journey with KhabarKuri
                  </p>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md">
                      <div className="w-full h-full bg-gradient-to-r from-primary to-primary-light flex items-center justify-center text-white">
                        <FaUtensils className="text-2xl" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-text dark:text-text">
                        Your favorite meals are waiting
                      </h3>
                      <p className="text-sm text-text-muted dark:text-text-muted">
                        Fast delivery guaranteed
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/20 dark:bg-secondary/10">
                      <div className="text-primary dark:text-primary-light">
                        <FaUtensils />
                      </div>
                      <p className="text-sm text-text dark:text-text">
                        Get personalized recommendations based on your taste
                      </p>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/20 dark:bg-secondary/10">
                      <div className="text-primary dark:text-primary-light">
                        <FaUtensils />
                      </div>
                      <p className="text-sm text-text dark:text-text">
                        Track your orders in real-time
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card-bg dark:bg-card-bg rounded-3xl shadow-2xl dark:shadow-lg p-8 border border-border/20 dark:border-border/30"
          >
            <div className="text-center mb-8">
              <motion.h1
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
                className="text-3xl font-bold text-primary dark:text-primary-light mb-2"
              >
                Login to KhabarKuri
              </motion.h1>
              <p className="text-text-muted dark:text-text-muted">
                Enter your details to continue
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-text dark:text-text mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 pl-11 rounded-xl border border-border dark:border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent transition-all"
                    required
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted dark:text-text-muted">
                    <FaEnvelope />
                  </div>
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-text dark:text-text mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pl-11 rounded-xl border border-border dark:border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent transition-all"
                    required
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted dark:text-text-muted">
                    <FaLock />
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <Link
                    to="/forgot-password"
                    className="text-xs text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-secondary transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              </motion.div>

              {/* Captcha Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-text dark:text-text mb-2">
                  Captcha Verification
                </label>
                <div className="mb-2">
                  <LoadCanvasTemplate reloadText="Refresh" reloadColor="var(--primary)" />
                </div>
                <input
                  onBlur={handleValidateCaptcha}
                  name="captcha"
                  type="text"
                  placeholder="Type the captcha above"
                  className="w-full px-4 py-3 rounded-xl border border-border dark:border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent transition-all"
                  required
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-2"
              >
                <motion.button
                  whileHover={{ scale: disabled ? 1 : 1.02 }}
                  whileTap={{ scale: disabled ? 1 : 0.98 }}
                  type="submit"
                  disabled={disabled}
                  
                  className={`w-full py-4 px-6 rounded-xl font-medium flex items-center justify-center gap-3 transition-all duration-300 ${
                    disabled
                      ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                      : "bg-gradient-to-r from-primary to-primary-light dark:from-primary dark:to-primary-dark text-white shadow-lg hover:shadow-xl"
                  }`}
                  onMouseEnter={() => !disabled && setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <AnimatePresence>
                    {!disabled && isHovering && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="inline-block"
                      >
                        <FaArrowRight />
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <span>Login</span>
                </motion.button>
              </motion.div>
            </form>

            {/* Social Login */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8"
            >
              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-border dark:border-border"></div>
                <span className="flex-shrink mx-4 text-text-muted dark:text-text-muted text-sm">
                  Or continue with
                </span>
                <div className="flex-grow border-t border-border dark:border-border"></div>
              </div>
              <SocialLogin />
            </motion.div>

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center mt-6 text-sm text-text-muted dark:text-text-muted"
            >
              New to KhabarKuri?{" "}
              <Link
                to="/signup"
                className="font-medium text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-secondary transition-colors"
              >
                Create an account
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Login;