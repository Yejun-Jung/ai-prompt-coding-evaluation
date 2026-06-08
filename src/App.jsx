import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';

function App() {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem('movieReviews');
    return savedReviews ? JSON.parse(savedReviews) : [];
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('latest');
  const [editingReview, setEditingReview] = useState(null);
  const [mobileTab, setMobileTab] = useState('list');

  useEffect(() => {
    localStorage.setItem('movieReviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleAddReview = (newReview) => {
    setReviews([newReview, ...reviews]);
    setMobileTab('list');
  };

  const handleUpdateReview = (updatedReview) => {
    setReviews(reviews.map(r => r.id === updatedReview.id ? updatedReview : r));
    setEditingReview(null);
    setMobileTab('list');
  };

  const handleDeleteReview = (id) => {
    if (window.confirm('정말 이 리뷰를 삭제하시겠습니까?')) {
      setReviews(reviews.filter(r => r.id !== id));
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setMobileTab('form');
  };

  const filteredAndSortedReviews = reviews
    .filter(review => 
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.genre.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.watchedDate || a.date);
      const dateB = new Date(b.watchedDate || b.date);
      switch (sortOption) {
        case 'latest':
          return dateB - dateA;
        case 'oldest':
          return dateA - dateB;
        case 'highestRating':
          return b.rating - a.rating;
        case 'lowestRating':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="app-container">
      <Header />
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        sortOption={sortOption} 
        setSortOption={setSortOption} 
      />
      <div className="mobile-tabs">
        <button
          className={`mobile-tab-btn ${mobileTab === 'list' ? 'active' : ''}`}
          onClick={() => setMobileTab('list')}
        >
          🎬 리뷰 목록
          {reviews.length > 0 && (
            <span className="tab-badge">{filteredAndSortedReviews.length}</span>
          )}
        </button>
        <button
          className={`mobile-tab-btn ${mobileTab === 'form' ? 'active' : ''}`}
          onClick={() => setMobileTab('form')}
        >
          ✏️ {editingReview ? '리뷰 수정' : '리뷰 작성'}
        </button>
      </div>

      <main className="main-content">
        <aside className={mobileTab === 'form' ? 'mobile-visible' : 'mobile-hidden'}>
          <ReviewForm 
            onAddReview={handleAddReview} 
            editingReview={editingReview}
            onUpdateReview={handleUpdateReview}
            onCancelEdit={() => { setEditingReview(null); setMobileTab('list'); }}
          />
        </aside>
        <section className={mobileTab === 'list' ? 'mobile-visible' : 'mobile-hidden'}>
          <ReviewList 
            reviews={filteredAndSortedReviews} 
            onEdit={handleEditReview} 
            onDelete={handleDeleteReview}
            searchQuery={searchQuery}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
