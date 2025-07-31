import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaQuoteLeft, FaStar, FaShippingFast, FaUtensils } from "react-icons/fa";
import { Navigation, Autoplay } from "swiper/modules";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import "swiper/css";
import "swiper/css/navigation";
import { useTheme } from "../../../Hooks/ThemeContext/ThemeContext";

const Testimonials = () => {
  const { theme } = useTheme();
  const axiosSecure = useAxiosSecure();
  const [activeTab, setActiveTab] = useState('all');

  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axiosSecure.get('/reviews');
      return res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  });

  // Filter reviews based on active tab
  const filteredReviews = activeTab === 'all' 
    ? reviews 
    : reviews.filter(r => r.reviewType === activeTab);

  // Theme-based colors
  const themeColors = {
    light: {
      primary: '#0C6C84',
      secondary: '#85C0C6',
      bg: '#f8fafc',
      cardBg: '#ffffff',
      text: '#1e293b',
      mutedText: '#64748b',
      border: '#e2e8f0'
    },
    dark: {
      primary: '#85C0C6',
      secondary: '#0C6C84',
      bg: '#0f172a',
      cardBg: '#1e293b',
      text: '#f8fafc',
      mutedText: '#94a3b8',
      border: '#334155'
    }
  };

  const colors = themeColors[theme];

  return (
    <section 
      className="py-16 md:py-24 w-full"
      style={{ backgroundColor: colors.bg }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ color: colors.text }}
          >
            Customer Voices
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: colors.mutedText }}
          >
            Hear what our customers say about their experiences
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div 
            className="inline-flex p-1 rounded-lg"
            style={{ backgroundColor: theme === 'light' ? '#e2e8f0' : '#334155' }}
          >
            {[
              { id: 'all', label: 'All', count: reviews.length },
              { id: 'product', label: 'Food', icon: <FaUtensils />, count: reviews.filter(r => r.reviewType === 'product').length },
              { id: 'delivery', label: 'Delivery', icon: <FaShippingFast />, count: reviews.filter(r => r.reviewType === 'delivery').length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md flex items-center gap-2 text-sm md:text-base transition-colors ${
                  activeTab === tab.id
                    ? 'text-white'
                    : theme === 'light' 
                      ? 'text-gray-700 hover:bg-gray-100' 
                      : 'text-gray-300 hover:bg-gray-700'
                }`}
                style={{
                  backgroundColor: activeTab === tab.id ? colors.primary : 'transparent'
                }}
              >
                {tab.icon && <span>{tab.icon}</span>}
                {tab.label}
                <span 
                  className="ml-1 px-2 py-0.5 rounded-full text-xs"
                  style={{
                    backgroundColor: activeTab === tab.id ? colors.secondary : (theme === 'light' ? '#e2e8f0' : '#334155'),
                    color: activeTab === tab.id ? colors.text : colors.mutedText
                  }}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              className="relative"
            >
              {filteredReviews.map((review) => (
                <SwiperSlide key={review._id}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="h-full p-1"
                  >
                    <div 
                      className="h-full p-6 rounded-xl flex flex-col"
                      style={{
                        backgroundColor: colors.cardBg,
                        border: `1px solid ${colors.border}`,
                        boxShadow: theme === 'light' 
                          ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                          : '0 4px 6px -1px rgba(0, 0, 0, 0.25), 0 2px 4px -1px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      {/* Review Type Badge */}
                      <div className="flex justify-between items-start mb-4">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          review.reviewType === 'product'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>
                          {review.reviewType === 'product' ? 'Food Quality' : 'Delivery Service'}
                        </div>
                        <FaQuoteLeft 
                          className="text-3xl opacity-10" 
                          style={{ color: colors.primary }} 
                        />
                      </div>

                      {/* Rating */}
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                          />
                        ))}
                      </div>

                      {/* Review Text */}
                      <p 
                        className="mb-6 flex-grow"
                        style={{ color: colors.text }}
                      >
                        {review.reviewText}
                      </p>

                      {/* User Info */}
                      <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: colors.border }}>
                        <img
                          src={review.userImage || `https://ui-avatars.com/api/?name=${review.userName}&background=${colors.primary.replace('#', '')}&color=fff`}
                          alt={review.userName}
                          className="w-10 h-10 rounded-full object-cover"
                          style={{ border: `2px solid ${colors.primary}` }}
                        />
                        <div>
                          <h4 
                            className="font-medium"
                            style={{ color: colors.text }}
                          >
                            {review.userName}
                          </h4>
                          <p 
                            className="text-sm"
                            style={{ color: colors.mutedText }}
                          >
                            {new Date(review.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Arrows */}
            <div className="flex justify-center gap-4 mt-8">
              <button 
                className="swiper-button-prev flex items-center justify-center w-10 h-10 rounded-full"
                style={{ 
                  backgroundColor: colors.primary,
                  color: 'white'
                }}
              >
                &lt;
              </button>
              <button 
                className="swiper-button-next flex items-center justify-center w-10 h-10 rounded-full"
                style={{ 
                  backgroundColor: colors.primary,
                  color: 'white'
                }}
              >
                &gt;
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Testimonials;