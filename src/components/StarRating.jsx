import React, { useState } from 'react';
import './StarRating.css';

const StarRating = ({ rating, onChange, readOnly = false }) => {
  const [hover, setHover] = useState(null);

  const getStarFill = (starIndex, value) => {
    const full = starIndex + 1;
    const half = starIndex + 0.5;
    if (value >= full) return 'full';
    if (value >= half) return 'half';
    return 'empty';
  };

  const handleMouseMove = (e, starIndex) => {
    if (readOnly) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isHalf = x < rect.width / 2;
    setHover(isHalf ? starIndex + 0.5 : starIndex + 1);
  };

  const handleClick = (e, starIndex) => {
    if (readOnly) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isHalf = x < rect.width / 2;
    const newRating = isHalf ? starIndex + 0.5 : starIndex + 1;
    onChange(newRating);
  };

  const displayValue = hover !== null ? hover : rating;

  return (
    <div
      className={`star-rating ${readOnly ? 'read-only' : ''}`}
      onMouseLeave={() => !readOnly && setHover(null)}
    >
      {[0, 1, 2, 3, 4].map((starIndex) => {
        const fill = getStarFill(starIndex, displayValue);
        return (
          <span
            key={starIndex}
            className={`star star-${fill}`}
            onMouseMove={(e) => handleMouseMove(e, starIndex)}
            onClick={(e) => handleClick(e, starIndex)}
          >
            <span className="star-base">★</span>
            {fill === 'half' && <span className="star-overlay half-overlay">★</span>}
            {fill === 'full' && <span className="star-overlay full-overlay">★</span>}
          </span>
        );
      })}
      <span className="star-label">{displayValue > 0 ? `${displayValue}점` : '별점 선택'}</span>
    </div>
  );
};

export default StarRating;
