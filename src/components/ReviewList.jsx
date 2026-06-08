import React from 'react';
import ReviewItem from './ReviewItem';

const ReviewList = ({ reviews, onEdit, onDelete, searchQuery }) => {
  if (reviews.length === 0) {
    if (searchQuery) {
      return (
        <div className="empty-state">
          <h3>검색 결과가 없습니다 😢</h3>
          <p>다른 검색어로 다시 시도해보세요.</p>
        </div>
      );
    }
    return (
      <div className="empty-state">
        <h3>아직 등록된 리뷰가 없습니다 🎬</h3>
        <p>왼쪽 폼을 사용하여 첫 번째 영화 리뷰를 등록해보세요!</p>
      </div>
    );
  }

  return (
    <div className="review-list-container">
      <h2>내 리뷰 모아보기 ({reviews.length})</h2>
      <div className="review-grid">
        {reviews.map(review => (
          <ReviewItem 
            key={review.id} 
            review={review} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
