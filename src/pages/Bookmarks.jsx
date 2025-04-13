// src/pages/Bookmarks.jsx
import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import SearchBar from "../components/SearchBar";
import "../styles/App.css";
import "../styles/Bookmarks.css";

export default function Bookmarks() {
  const [savedArticles, setSavedArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setSavedArticles(saved);
    setFilteredArticles(saved);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredArticles(savedArticles);
    } else {
      const filtered = savedArticles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.description && article.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredArticles(filtered);
    }
  }, [searchQuery, savedArticles]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const clearAllBookmarks = () => {
    if (window.confirm("Are you sure you want to delete all bookmarks?")) {
      localStorage.removeItem("bookmarks");
      setSavedArticles([]);
      setFilteredArticles([]);
    }
  };

  const removeBookmark = (articleId) => {
    const updatedBookmarks = savedArticles.filter(article => article.url !== articleId);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    setSavedArticles(updatedBookmarks);
    setFilteredArticles(updatedBookmarks.filter(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.description && article.description.toLowerCase().includes(searchQuery.toLowerCase()))
    ));
  };

  return (
    <div className="page-container">
      <div className="bookmarks-header">
        <h2>Your Saved Articles</h2>
        {savedArticles.length > 0 && (
          <button 
            onClick={clearAllBookmarks}
            className="clear-all-btn"
          >
            Clear All Bookmarks
          </button>
        )}
      </div>

      <SearchBar onSearch={handleSearch} placeholder="Search your bookmarks..." />

      {savedArticles.length === 0 ? (
        <div className="no-bookmarks">
          <p>No bookmarks yet. Save articles from any page!</p>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="no-results">
          <p>No bookmarks match your search.</p>
        </div>
      ) : (
        <div className="news-feed">
          {filteredArticles.map((article) => (
            <NewsCard 
              key={article.url} 
              article={article}
              onRemove={() => removeBookmark(article.url)}
              isBookmark={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}