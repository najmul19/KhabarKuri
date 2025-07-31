import { useState, useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { motion } from "framer-motion";
const BookingForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("19:00");
  const [people, setPeople] = useState(1);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Check for dark theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);
    
    const handler = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      setMessage("❌ You must be logged in to book.");
      return;
    }

    const booking = {
      email: user.email,
      name: user.displayName || "Anonymous",
      date,
      time,
      people: parseInt(people),
      status: "pending",
    };

    try {
      setLoading(true);
      const res = await axiosSecure.post("/bookings", booking);
      if (res.data.insertedId || res.data.acknowledged) {
        setMessage("✅ Booking request sent!");
      } else {
        setMessage("❌ Something went wrong. Try again.");
      }
    } catch (err) {
      console.error("Booking error:", err.response?.data || err.message);
      setMessage(
        err.response?.data?.message || "❌ Booking failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
    >
    <div className={`mt-[10%] max-w-md mx-auto p-8 rounded-2xl transition-all duration-300 ${isDark ? 
      "bg-[var(--card-bg)] border border-[var(--border)] shadow-[var(--shadow)]" : 
      "bg-[var(--card-bg)] shadow-[var(--shadow)]"}`}
      style={isDark ? {boxShadow: 'var(--glow-effect)'} : {}}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)]">
          Reserve Your Table
        </h2>
        <p className={`text-sm ${isDark ? "text-[var(--text-muted)]" : "text-[var(--text-muted)]"}`}>
          Experience culinary excellence in our intimate setting
        </p>
      </div>

      <form onSubmit={handleBooking} className="space-y-6">
        <div className="space-y-1">
          <label className={`block font-semibold ${isDark ? "text-[var(--secondary)]" : "text-[var(--primary-dark)]"}`}>
            Date
          </label>
          <input
            type="date"
            className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:outline-none transition-all ${
              isDark 
                ? "bg-[var(--background)] border-[var(--border)] text-[var(--text)] focus:ring-[var(--secondary)]" 
                : "border-[var(--border)] focus:ring-[var(--primary-light)]"
            }`}
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className={`block font-semibold ${isDark ? "text-[var(--secondary)]" : "text-[var(--primary-dark)]"}`}>
              Time
            </label>
            <input
              type="time"
              className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:outline-none transition-all ${
                isDark 
                  ? "bg-[var(--background)] border-[var(--border)] text-[var(--text)] focus:ring-[var(--secondary)]" 
                  : "border-[var(--border)] focus:ring-[var(--primary-light)]"
              }`}
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className={`block font-semibold ${isDark ? "text-[var(--secondary)]" : "text-[var(--primary-dark)]"}`}>
              Guests
            </label>
            <input
              type="number"
              className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:outline-none transition-all ${
                isDark 
                  ? "bg-[var(--background)] border-[var(--border)] text-[var(--text)] focus:ring-[var(--secondary)]" 
                  : "border-[var(--border)] focus:ring-[var(--primary-light)]"
              }`}
              min="1"
              required
              value={people}
              onChange={(e) => setPeople(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : `bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] hover:from-[var(--primary-dark)] hover:to-[var(--primary)] text-white shadow-lg hover:shadow-xl`
          }`}
          style={isDark ? {boxShadow: '0 4px 15px rgba(107, 33, 168, 0.5)'} : {}}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            "Reserve Now"
          )}
        </button>
      </form>

      {message && (
        <div
          className={`mt-6 p-4 rounded-xl text-center font-medium transition-all ${
            message.includes("✅")
              ? `bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/30`
              : `bg-[var(--error)]/10 text-[var(--error)] border border-[var(--error)]/30`
          }`}
        >
          {message}
        </div>
      )}

      {/* Decorative elements */}
      {isDark && (
        <>
          <div className="absolute top-0 left-0 w-full h-full rounded-2xl pointer-events-none overflow-hidden z-[-1]">
            <div className="absolute top-[-50px] left-[-50px] w-[100px] h-[100px] rounded-full bg-[var(--primary-light)] opacity-20 blur-xl"></div>
            <div className="absolute bottom-[-30px] right-[-30px] w-[60px] h-[60px] rounded-full bg-[var(--secondary)] opacity-15 blur-xl"></div>
          </div>
        </>
      )}
    </div>
    </motion.div>
  );
};

export default BookingForm;