// src/pages/AI.jsx
import React, { useState } from "react";
import NewsCard from "../components/NewsCard";
import SearchBar from "../components/SearchBar";
import useNews from "../hooks/useNews";
import "../styles/App.css";

export default function AI() {
  const [searchQuery, setSearchQuery] = useState("");
  const { news, loading, error, fetchNews } = useNews(searchQuery || "artificial intelligence", "");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="page-container">
      <SearchBar onSearch={handleSearch} defaultQuery="artificial intelligence" />
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading AI news...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchNews}>Retry</button>
        </div>
      ) : (
        <>
          <h2 className="section-title">
            {searchQuery === "artificial intelligence" || searchQuery === "" 
              ? "Latest AI News" 
              : `AI News for "${searchQuery}"`}
          </h2>
          <div className="news-feed">
            {news.length > 0 ? (
              news.map((article) => (
                <NewsCard key={article.url} article={article} />
              ))
            ) : (
              <p className="no-results">No AI articles found. Try a different search.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}