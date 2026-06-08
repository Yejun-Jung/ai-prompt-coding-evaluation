import React, { useState } from 'react';
import StarRating from './StarRating';

const CLAMP_LIMIT = 80;

const ReviewItem = ({ review, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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

  const isLong = review.review.length > CLAMP_LIMIT;
  const displayedReview =
    !isExpanded && isLong
      ? review.review.slice(0, CLAMP_LIMIT) + '...'
      : review.review;

  return (
    <div className="review-item">
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
        <button onClick={() => onEdit(review)} className="btn btn-edit">수정</button>
        <button onClick={() => onDelete(review.id)} className="btn btn-danger">삭제</button>
      </div>
    </div>
  );
};

export default ReviewItem;
