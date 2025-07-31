import { useState } from 'react';
import { FaStar, FaPaperPlane, FaSmile, FaFrown, FaMeh } from 'react-icons/fa';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import './Review.css';

const Review = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewType, setReviewType] = useState('product');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: userReviews = [], refetch } = useQuery({
    queryKey: ['reviews', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/user/${user?.email}`);
      return res.data;
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const reviewData = {
        userId: user._id,
        userEmail: user.email,
        userName: user.displayName,
        userImage: user.photoURL,
        rating,
        reviewText,
        reviewType,
        date: new Date().toISOString()
      };

      const res = await axiosSecure.post('/reviews', reviewData);
      if (res.data.insertedId) {
        Swal.fire({
          title: 'Thank You!',
          text: 'Your review has been submitted successfully.',
          icon: 'success',
          confirmButtonColor: 'var(--primary)',
          background: 'var(--bg-light)',
          color: 'var(--text)'
        });
        setRating(0);
        setReviewText('');
        refetch();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      Swal.fire({
        title: 'Error',
        text: 'There was an error submitting your review.',
        icon: 'error',
        confirmButtonColor: 'var(--primary)',
        background: 'var(--bg-light)',
        color: 'var(--text)'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getEmoji = (rating) => {
    if (rating >= 4) return <FaSmile className="text-green-500" />;
    if (rating >= 2) return <FaMeh className="text-yellow-500" />;
    return <FaFrown className="text-red-500" />;
  };

  return (
    <div className="user-dashboard review-container">
      {/* Review Form Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="review-form fade-in"
      >
        <h2 className="review-title">
          <FaStar />
          Share Your Experience
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>What are you reviewing?</label>
            <div className="review-type-selector">
              <button
                type="button"
                onClick={() => setReviewType('product')}
                className={`review-type-btn ${reviewType === 'product' ? 'active' : ''}`}
              >
                Product Quality
              </button>
              <button
                type="button"
                onClick={() => setReviewType('delivery')}
                className={`review-type-btn ${reviewType === 'delivery' ? 'active' : ''}`}
              >
                Delivery Experience
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>How would you rate your experience?</label>
            <div className="star-rating">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <button
                    type="button"
                    key={ratingValue}
                    onClick={() => setRating(ratingValue)}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                    className={`star-btn ${ratingValue <= (hover || rating) ? 'active' : ''}`}
                  >
                    <FaStar />
                  </button>
                );
              })}
              {rating > 0 && (
                <span className="rating-emoji">
                  {getEmoji(rating)}
                  <span className="rating-text">
                    {rating} star{rating !== 1 ? 's' : ''}
                  </span>
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="review">Your detailed review</label>
            <textarea
              id="review"
              className="review-textarea"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Tell us about your experience..."
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting || rating === 0}
            className="submit-btn"
          >
            <FaPaperPlane />
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </motion.button>
        </form>
      </motion.div>

      {/* Previous Reviews Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="previous-reviews fade-in"
      >
        <h2 className="reviews-title">Your Previous Reviews</h2>
        
        {userReviews.length > 0 ? (
          <div className="reviews-list">
            {userReviews.map((review) => (
              <div key={review._id} className="review-item">
                <div className="review-header">
                  <div className="review-user">
                    <img 
                      src={review.userImage || 'https://via.placeholder.com/40'} 
                      alt={review.userName} 
                      className="user-avatar"
                    />
                    <span className="user-name">{review.userName}</span>
                  </div>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                       <FaStar 
                            key={i} 
                            className={`text-sm ${
                              i < review.rating 
                                ? 'text-yellow-400' 
                                : 'text-gray-300 dark:text-gray-500'
                            }`}
                          />

                    ))}
                  </div>
                </div>
                <p className="review-meta">
                  Reviewed {new Date(review.date).toLocaleDateString()} • 
                  {review.reviewType === 'product' ? 'Product' : 'Delivery'}
                </p>
                <p className="review-content">{review.reviewText}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-reviews">
            You haven't submitted any reviews yet
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Review;