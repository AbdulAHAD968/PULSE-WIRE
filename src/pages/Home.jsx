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

  const API_KEY = "66c7e8ff-14c0-4001-8b8b-81c3c146cf90"; // Replace with your actual key
  const BASE_URL = "https://content.guardianapis.com";

  const fetchNews = async (query = "") => {
    setLoading(true);
    setError(null);

    try {
      let url = `${BASE_URL}/search?api-key=${API_KEY}&show-fields=thumbnail,trailText,bodyText&order-by=newest&page-size=20`;

      if (query) {
        url += `&q=${encodeURIComponent(query)}`;
      }

      const response = await axios.get(url);
      const results = response.data.response.results;

      const articlesWithCategories = results.map((article) => ({
        title: article.webTitle,
        url: article.webUrl,
        urlToImage: article.fields?.thumbnail || "https://via.placeholder.com/300",
        description: article.fields?.trailText || "No description available",
        content: article.fields?.bodyText || "",
        publishedAt: article.webPublicationDate,
        source: { name: "The Guardian" },
        category: ["tech", "sports", "politics", "entertainment"][
          Math.floor(Math.random() * 4)
        ],
      }));

      setNews(articlesWithCategories);
    } catch (err) {
      setError("Failed to fetch news. Please try again later.");
      console.error("The Guardian API Error:", err);
    } finally {
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

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading latest news...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => fetchNews()}>Retry</button>
        </div>
      ) : (
        <>
          <h2 className="section-title">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Top Headlines"}
          </h2>
          <div className="news-feed">
            {news.length > 0 ? (
              news.map((article) => (
                <NewsCard key={article.url} article={article} />
              ))
            ) : (
              <p className="no-results">No articles found. Try a different search.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
