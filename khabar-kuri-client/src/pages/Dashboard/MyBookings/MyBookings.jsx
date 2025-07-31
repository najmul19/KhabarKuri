import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { motion } from "framer-motion";
const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Check for dark theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);
    
    const handler = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    axiosSecure.get(`/bookings?email=${user.email}`)
      .then(res => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosSecure, user.email]);

  const statusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-bold";
    
    switch(status.toLowerCase()) {
      case 'approved':
        return (
          <span className={`${baseClasses} bg-[var(--success)]/20 text-[var(--success)] border border-[var(--success)]/30`}>
            {status}
          </span>
        );
      case 'pending':
        return (
          <span className={`${baseClasses} bg-[var(--warning)]/20 text-[var(--warning)] border border-[var(--warning)]/30`}>
            {status}
          </span>
        );
      case 'rejected':
        return (
          <span className={`${baseClasses} bg-[var(--error)]/20 text-[var(--error)] border border-[var(--error)]/30`}>
            {status}
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} bg-[var(--text-muted)]/20 text-[var(--text-muted)] border border-[var(--text-muted)]/30`}>
            {status}
          </span>
        );
    }
  };

  return (
     <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
    >
    <div className={`min-h-screen p-6 ${isDark ? "bg-[var(--background)]" : "bg-[var(--secondary)]/30"}`}>
      <div className={`max-w-6xl mx-auto rounded-2xl p-8 transition-all duration-300 ${isDark ? 
        "bg-[var(--card-bg)] border border-[var(--border)] shadow-[var(--shadow)]" : 
        "bg-[var(--card-bg)] shadow-[var(--shadow)]"}`}
        style={isDark ? {boxShadow: 'var(--glow-effect)'} : {}}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className={`text-3xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${isDark ? 
              "from-[var(--secondary)] to-[var(--primary-light)]" : 
              "from-[var(--primary)] to-[var(--primary-dark)]"}`}>
              My Reservations
            </h2>
            <p className={`text-sm ${isDark ? "text-[var(--text-muted)]" : "text-[var(--text-muted)]"}`}>
              {bookings.length} upcoming and past bookings
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className={`text-center py-12 rounded-xl ${isDark ? "bg-[var(--background)]" : "bg-[var(--secondary)]"}`}>
            <svg className="mx-auto h-12 w-12 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className={`mt-4 text-lg font-medium ${isDark ? "text-[var(--text)]" : "text-[var(--text)]"}`}>
              No bookings found
            </h3>
            <p className={`mt-2 text-sm ${isDark ? "text-[var(--text-muted)]" : "text-[var(--text-muted)]"}`}>
              You haven't made any reservations yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDark ? "border-[var(--border)]" : "border-[var(--border)]"}`}>
                  <th className={`pb-4 text-left font-semibold ${isDark ? "text-[var(--secondary)]" : "text-[var(--primary-dark)]"}`}>DATE</th>
                  <th className={`pb-4 text-left font-semibold ${isDark ? "text-[var(--secondary)]" : "text-[var(--primary-dark)]"}`}>TIME</th>
                  <th className={`pb-4 text-left font-semibold ${isDark ? "text-[var(--secondary)]" : "text-[var(--primary-dark)]"}`}>GUESTS</th>
                  <th className={`pb-4 text-left font-semibold ${isDark ? "text-[var(--secondary)]" : "text-[var(--primary-dark)]"}`}>STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {bookings.map((booking, index) => (
                  <tr key={index} className="hover:bg-[var(--secondary)]/10 transition-colors">
                    <td className={`py-4 ${isDark ? "text-[var(--text)]" : "text-[var(--text)]"}`}>
                      {new Date(booking.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        weekday: 'short'
                      })}
                    </td>
                    <td className={`py-4 ${isDark ? "text-[var(--text)]" : "text-[var(--text)]"}`}>
                      {booking.time}
                    </td>
                    <td className={`py-4 ${isDark ? "text-[var(--text)]" : "text-[var(--text)]"}`}>
                      {booking.people} {booking.people === 1 ? 'person' : 'people'}
                    </td>
                    <td className="py-4">
                      {statusBadge(booking.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </motion.div>
  );
};

export default MyBookings;