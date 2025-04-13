// src/pages/Cybersecurity.jsx
import React, { useState } from "react";
import NewsCard from "../components/NewsCard";
import SearchBar from "../components/SearchBar";
import useNews from "../hooks/useNews";
import "../styles/App.css";

export default function Cybersecurity() {
  const [searchQuery, setSearchQuery] = useState("");
  const { news, loading, error, fetchNews } = useNews(searchQuery || "cybersecurity", "");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="page-container">
      <SearchBar onSearch={handleSearch} defaultQuery="cybersecurity" />
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading cybersecurity news...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchNews}>Retry</button>
        </div>
      ) : (
        <>
          <h2 className="section-title">
            {searchQuery === "cybersecurity" || searchQuery === "" 
              ? "Latest Cybersecurity News" 
              : `Cybersecurity News for "${searchQuery}"`}
          </h2>
          <div className="news-feed">
            {news.length > 0 ? (
              news.map((article) => (
                <NewsCard key={article.url} article={article} />
              ))
            ) : (
              <p className="no-results">No cybersecurity articles found. Try a different search.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}