import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, sortOption, setSortOption }) => {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="영화 제목 또는 장르 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className="search-clear-btn"
            onClick={() => setSearchQuery('')}
            aria-label="검색어 초기화"
          >
            ✕
          </button>
        )}
      </div>
      <select
        className="sort-select"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="latest">최신 관람순</option>
        <option value="oldest">오래된 관람순</option>
        <option value="highestRating">별점 높은 순</option>
        <option value="lowestRating">별점 낮은 순</option>
      </select>
    </div>
  );
};

export default SearchBar;
