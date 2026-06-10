import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
  const [flyingCard, setFlyingCard] = useState(null);
  const formRef = useRef(null);

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

    setTimeout(() => {
      const el = document.getElementById(`review-${updatedReview.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);
  };

  const handleDeleteReview = (id) => {
    if (window.confirm('정말 이 리뷰를 삭제하시겠습니까?')) {
      setReviews(reviews.filter(r => r.id !== id));
    }
  };

  const handleEditReview = (review, startRect) => {
    if (startRect && window.innerWidth > 960 && formRef.current) {
      const formRect = formRef.current.getBoundingClientRect();
      
      setFlyingCard({
        review,
        startPos: {
          top: startRect.top,
          left: startRect.left,
          width: startRect.width,
          height: startRect.height,
        },
        endPos: {
          top: formRect.top,
          left: formRect.left,
          width: formRect.width,
          height: formRect.height,
        }
      });
      
      setTimeout(() => {
        setFlyingCard(null);
        setEditingReview(review);
        setMobileTab('form');
      }, 600);
    } else {
      setEditingReview(review);
      setMobileTab('form');
    }
  };

  const filteredAndSortedReviews = reviews
    .filter(review => 
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.genre.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
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
        <aside ref={formRef} className={mobileTab === 'form' ? 'mobile-visible' : 'mobile-hidden'}>
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

      {flyingCard && createPortal(
        <div 
          className="flying-card-wrapper"
          style={{
            '--start-x': `${flyingCard.startPos.left}px`,
            '--start-y': `${flyingCard.startPos.top}px`,
            '--start-w': `${flyingCard.startPos.width}px`,
            '--start-h': `${flyingCard.startPos.height}px`,
            '--end-x': `${flyingCard.endPos.left}px`,
            '--end-y': `${flyingCard.endPos.top}px`,
            '--end-w': `${flyingCard.endPos.width}px`,
            '--end-h': `${flyingCard.endPos.height}px`,
          }}
        >
          <div className="flying-clone" style={{ overflow: 'hidden' }}>
            <ReviewForm 
              editingReview={flyingCard.review} 
              onAddReview={() => {}} 
              onUpdateReview={() => {}} 
              onCancelEdit={() => {}} 
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default App;
