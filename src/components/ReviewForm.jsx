import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';

const today = new Date().toISOString().split('T')[0];

const ReviewForm = ({ onAddReview, editingReview, onUpdateReview, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('액션');
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [watchedDate, setWatchedDate] = useState(today);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingReview) {
      setTitle(editingReview.title);
      setGenre(editingReview.genre);
      setRating(editingReview.rating);
      setReview(editingReview.review);
      setWatchedDate(editingReview.watchedDate || today);
    } else {
      resetForm();
    }
  }, [editingReview]);

  const resetForm = () => {
    setTitle('');
    setGenre('액션');
    setRating(5);
    setReview('');
    setWatchedDate(today);
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = '영화 제목을 입력해주세요.';
    if (!review.trim()) newErrors.review = '감상평을 입력해주세요.';
    if (!watchedDate) newErrors.watchedDate = '관람일을 선택해주세요.';
    if (!rating || rating < 0.5 || rating > 5) {
      newErrors.rating = '별점을 선택해주세요.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const reviewData = {
      title: title.trim(),
      genre,
      rating,
      review: review.trim(),
      watchedDate,
    };

    if (editingReview) {
      onUpdateReview({ ...editingReview, ...reviewData });
    } else {
      onAddReview({ ...reviewData, id: Date.now(), date: new Date().toISOString() });
      resetForm();
    }
  };

  return (
    <div className={`review-form ${editingReview ? 'editing-mode' : ''}`}>
      <h2>{editingReview ? '리뷰 수정하기' : '새 리뷰 작성'}</h2>
      <p className="form-tip">📝 본 영화의 정보를 아래에 기록해 주세요.</p>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="title">영화 제목</label>
          <input
            id="title"
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예) 인터스텔라, 어벤져스..."
          />
          <p className="helper-text">검색할 때 이 제목으로 찾을 수 있어요.</p>
          {errors.title && <p className="error-message">{errors.title}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="genre">장르</label>
          <select
            id="genre"
            className="form-select"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="액션">액션</option>
            <option value="로맨스">로맨스</option>
            <option value="스릴러">스릴러</option>
            <option value="코미디">코미디</option>
            <option value="SF">SF</option>
            <option value="애니메이션">애니메이션</option>
            <option value="드라마">드라마</option>
            <option value="기타">기타</option>
          </select>
          <p className="helper-text">가장 가까운 장르를 선택해 주세요.</p>
        </div>

        <div className="form-group">
          <label htmlFor="watchedDate">관람일</label>
          <input
            id="watchedDate"
            type="date"
            className="form-input date-input"
            value={watchedDate}
            max={today}
            onChange={(e) => setWatchedDate(e.target.value)}
          />
          <p className="helper-text">영화를 실제로 본 날짜를 선택해 주세요.</p>
          {errors.watchedDate && <p className="error-message">{errors.watchedDate}</p>}
        </div>

        <div className="form-group">
          <label>별점</label>
          <StarRating rating={rating} onChange={setRating} />
          <p className="helper-text">⭐ 별의 왼쪽 = 0.5점 · 오른쪽 = 1점 단위로 선택돼요.</p>
          {errors.rating && <p className="error-message">{errors.rating}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="review">감상평</label>
          <textarea
            id="review"
            className="form-textarea"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="영화에 대한 감상을 자유롭게 적어주세요..."
          />
          <p className="helper-text">줄거리 스포 없이 느낀 점 위주로 적어 보세요!</p>
          {errors.review && <p className="error-message">{errors.review}</p>}
        </div>

        <button type="submit" className="btn btn-primary">
          {editingReview ? '수정 완료' : '리뷰 등록'}
        </button>

        {editingReview && (
          <button type="button" className="btn btn-cancel" onClick={onCancelEdit}>
            취소
          </button>
        )}
      </form>
    </div>
  );
};

export default ReviewForm;
