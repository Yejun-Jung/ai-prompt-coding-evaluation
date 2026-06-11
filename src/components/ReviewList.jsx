import React from 'react';
import ReviewItem from './ReviewItem';

const ReviewList = ({ reviews, onEdit, onDelete, searchQuery }) => {
  if (reviews.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🍿</div>
        <h3>
          {searchQuery 
            ? '검색 결과가 없습니다' 
            : '아직 등록된 리뷰가 없습니다'}
        </h3>
        <p>
          {searchQuery 
            ? '다른 검색어로 다시 시도해 보세요.' 
            : '새로운 영화 리뷰를 작성해 보세요!'}
        </p>
      </div>
    );
  }

  const totalMovies = reviews.length;
  const avgRating = totalMovies > 0 
    ? (reviews.reduce((acc, cur) => acc + cur.rating, 0) / totalMovies).toFixed(1) 
    : 0;
  
  const genreCount = reviews.reduce((acc, cur) => {
    if (cur.genre) acc[cur.genre] = (acc[cur.genre] || 0) + 1;
    return acc;
  }, {});
  
  let topGenre = "없음";
  let maxCount = 0;
  for (const [genre, count] of Object.entries(genreCount)) {
    if (count > maxCount) {
      topGenre = genre;
      maxCount = count;
    }
  }

  return (
    <div className="review-list-container">
      {totalMovies > 0 && !searchQuery && (
        <div className="dashboard-container">
          <div className="dashboard-card">
            <span className="dash-icon">🎞</span>
            <div className="dash-info">
              <span className="dash-label">총 관람 편수</span>
              <span className="dash-value">{totalMovies}편</span>
            </div>
          </div>
          <div className="dashboard-card">
            <span className="dash-icon">⭐</span>
            <div className="dash-info">
              <span className="dash-label">나의 평균 평점</span>
              <span className="dash-value">{avgRating}점</span>
            </div>
          </div>
          <div className="dashboard-card">
            <span className="dash-icon">🎬</span>
            <div className="dash-info">
              <span className="dash-label">최애 영화 장르</span>
              <span className="dash-value">{topGenre}</span>
            </div>
          </div>
        </div>
      )}

      <h2>내 리뷰 모아보기 {totalMovies > 0 && `(${totalMovies})`}</h2>
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
