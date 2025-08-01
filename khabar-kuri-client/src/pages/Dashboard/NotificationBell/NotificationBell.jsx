import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BellIcon } from "@heroicons/react/24/outline";
import { BellAlertIcon } from "@heroicons/react/24/solid";

const NotificationBell = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Fetch notifications
  const { data: notifications = [] } = useQuery({
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

  // Mutation for marking notifications as read
  const markAsReadMutation = useMutation({
    mutationFn: async () => {
      await axiosSecure.patch(`/notifications/mark-as-read?email=${user.email}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications", user?.email]);
    },
  });

  const handleMarkAllAsRead = () => {
    markAsReadMutation.mutate();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.notification-container')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative notification-container">
      <motion.button
        className="relative p-2 rounded-full transition-all duration-300 group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: hasUnread
            ? [
                "0 0 0 rgba(13, 148, 136, 0.3)",
                "0 0 12px rgba(13, 148, 136, 0.6)",
                "0 0 0 rgba(13, 148, 136, 0.3)",
              ]
            : "none",
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <div className="relative">
          {hasUnread ? (
            <BellAlertIcon className="w-6 h-6 text-primary group-hover:text-primary-light" />
          ) : (
            <BellIcon className="w-6 h-6 text-primary group-hover:text-primary-light" />
          )}
          {unreadCount > 0 && (
            <motion.span
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {unreadCount}
            </motion.span>
          )}
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-12  bg-card-bg border border-border rounded-xl shadow-xl w-full max-h-[calc(100vh-8rem)] overflow-hidden z-50"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="sticky top-0 z-10 bg-card-bg p-4 border-b border-border">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg text-text">Notifications</h3>
                <span className="text-sm text-text-muted">
                  {notifications.length} total
                </span>
              </div>
              {notifications.length > 0 && (
                <div className="mt-2">
                  <button
                    className="text-sm text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
                    onClick={handleMarkAllAsRead}
                    disabled={markAsReadMutation.isLoading}
                  >
                    {markAsReadMutation.isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Mark all as read"
                    )}
                  </button>
                </div>
              )}
            </div>

            <div className="divide-y divide-border overflow-y-auto max-h-[calc(100vh-14rem)]">
              {notifications.length > 0 ? (
                notifications.map((n, i) => (
                  <motion.div
                    key={i}
                    className={`p-4 transition-all duration-200 ${
                      !n.read ? "bg-secondary/20" : "bg-card-bg hover:bg-secondary/10"
                    }`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 flex-shrink-0 ${
                        !n.read ? "text-primary" : "text-text-muted"
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          !n.read ? "bg-primary" : "bg-transparent"
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text truncate">{n.message}</p>
                        <p className="text-xs text-text-muted mt-1">
                          {new Date(n.createdAt).toLocaleString([], {
                            month: 'short',
                            day: 'numeric',
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="p-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="mx-auto h-12 w-12 text-text-muted mb-3">
                    <BellIcon className="w-full h-full" />
                  </div>
                  <h4 className="text-sm font-medium text-text">No notifications</h4>
                  <p className="text-xs text-text-muted mt-1">
                    You're all caught up!
                  </p>
                </motion.div>
              )}
            </div>

            {notifications.length > 0 && (
              <div className="sticky bottom-0 bg-gradient-to-t from-card-bg to-transparent pt-6 pb-2 px-4 text-center">
                <button
                  className="text-xs text-primary hover:text-primary-dark transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Close notifications
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;