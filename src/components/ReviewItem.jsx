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
      className={`review-item ${review.rating === 5 ? 'masterpiece' : ''}`}
      id={`review-${review.id}`}
    >
      {review.rating === 5 && (
        <div className="masterpiece-badge">👑 <span>인생 영화</span></div>
      )}
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

      <div className="quick-links">
        <a 
          href={`https://www.google.com/search?btnI=1&q=site:youtube.com+${encodeURIComponent(review.title)}+공식+예고편`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-quick youtube" 
          title="유튜브 예고편 즉시 재생"
          style={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style={{ marginRight: '6px', transform: 'translateY(-1px)' }}>
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
          </svg>
          예고편
        </a>
      </div>

      <div className="review-actions">
        <button onClick={(e) => onEdit(review, e.currentTarget.closest('.review-item').getBoundingClientRect())} className="btn btn-edit">수정</button>
        <button onClick={() => onDelete(review.id)} className="btn btn-danger">삭제</button>
      </div>
    </div>
  );
};

export default ReviewItem;
