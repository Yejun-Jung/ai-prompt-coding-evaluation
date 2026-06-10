import React, { useState } from 'react';
import StarRating from './StarRating';

const CLAMP_LIMIT = 80;

const ReviewItem = ({ review, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatWatchedDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const isLong = review.review && review.review.length > CLAMP_LIMIT;
  const displayedReview = isLong && !isExpanded 
      ? review.review.slice(0, CLAMP_LIMIT) + '...'
      : review.review;

  return (
    <div 
      className="review-item"
      id={`review-${review.id}`}
    >
      <h3 className="review-title">{review.title}</h3>

      <div className="review-meta">
        <span className="tag">{review.genre}</span>
        {review.watchedDate && (
          <span className="review-watched">🎞 {formatWatchedDate(review.watchedDate)}</span>
        )}
      </div>

      <div className="review-stars">
        <StarRating rating={review.rating} readOnly={true} />
      </div>

      <p className="review-content">{displayedReview}</p>
      {isLong && (
        <button
          className="expand-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '접기 ▲' : '더 보기 ▼'}
        </button>
      )}

      <p className="review-registered">등록: {formatDate(review.date)}</p>

      <div className="review-actions">
        <button onClick={(e) => onEdit(review, e.currentTarget.closest('.review-item').getBoundingClientRect())} className="btn btn-edit">수정</button>
        <button onClick={() => onDelete(review.id)} className="btn btn-danger">삭제</button>
      </div>
    </div>
  );
};

export default ReviewItem;
