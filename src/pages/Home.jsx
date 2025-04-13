// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";
import SearchBar from "../components/SearchBar";
import "../styles/App.css";
import axios from "axios";

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const API_KEY = "e75d998a559d4e94bdd64f89772ffdac";
  const BASE_URL = "https://newsapi.org/v2";

  const fetchNews = async (query = "") => {
    setLoading(true);
    setError(null);
    try {
      let url = `${BASE_URL}/top-headlines?country=us&pageSize=20&apiKey=${API_KEY}`;
      
      if (query) {
        url = `${BASE_URL}/everything?q=${encodeURIComponent(query)}&sortBy=popularity&apiKey=${API_KEY}`;
      }

      const response = await axios.get(url);
      const articlesWithCategories = response.data.articles.map(article => ({
        ...article,
        // Add random category for styling
        category: ["tech", "sports", "politics", "entertainment"][
          Math.floor(Math.random() * 4)
        ],
        // Ensure all required fields exist
        urlToImage: article.urlToImage || "https://via.placeholder.com/300",
        description: article.description || "No description available",
        source: article.source || { name: "Unknown Source" }
      }));
      setNews(articlesWithCategories);
    } 
    catch(err){
      setError("Failed to fetch news. Please try again later.");
      console.error("NewsAPI Error:", err);
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      fetchNews();
    } else {
      fetchNews(query);
    }
  };

  return (
    <div className="page-container">
      
      <SearchBar onSearch={handleSearch} />
      
      {
      loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading latest news...</p>
        </div>
      ) 
      : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => fetchNews()}>Retry</button>
        </div>
      ) 
      : (
        <>
          <h2 className="section-title">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Top Headlines"}
          </h2>
          <div className="news-feed">
            {
              news.length > 0 ? (
                news.map((article) => (
                  <NewsCard key={article.url} article={article} />
                ))
              ) 
              : (
                <p className="no-results">No articles found. Try a different search.</p>
              )
            }
          </div>
        </>
      )}
    </div>
  );
}