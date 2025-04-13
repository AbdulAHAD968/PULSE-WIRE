// src/pages/Economy.jsx
import React, { useState } from "react";
import NewsCard from "../components/NewsCard";
import SearchBar from "../components/SearchBar";
import useNews from "../hooks/useNews";
import "../styles/App.css";

export default function Economy() {
  const [searchQuery, setSearchQuery] = useState("");
  const { news, loading, error, fetchNews } = useNews(searchQuery || "Economy", "");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="page-container">
      <SearchBar onSearch={handleSearch} defaultQuery="Economy" />
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading Economy news...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchNews}>Retry</button>
        </div>
      ) : (
        <>
          <h2 className="section-title">
            {searchQuery === "Economy" || searchQuery === "" 
              ? "Latest Economy News" 
              : `Economy News for "${searchQuery}"`}
          </h2>
          <div className="news-feed">
            {news.length > 0 ? (
              news.map((article) => (
                <NewsCard key={article.url} article={article} />
              ))
            ) : (
              <p className="no-results">No Economy articles found. Try a different search.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}