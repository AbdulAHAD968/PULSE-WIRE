import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ArticleDetail.css";

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const API_KEY = "e75d998a559d4e94bdd64f89772ffdac";
  const BASE_URL = "https://newsapi.org/v2";

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        // First check if we have the article in localStorage (from Home page)
        const savedArticles = JSON.parse(localStorage.getItem('cachedArticles')) || [];
        const cachedArticle = savedArticles.find(a => a.url === decodeURIComponent(id));

        if (cachedArticle) {
          setArticle(cachedArticle);
        } else {
          // Fallback: Try to fetch by title if no URL match
          const response = await axios.get(
            `${BASE_URL}/everything?qInTitle=${encodeURIComponent(id)}&pageSize=1&apiKey=${API_KEY}`
          );
          if (response.data.articles.length > 0) {
            setArticle(response.data.articles[0]);
          } else {
            throw new Error("Article not found");
          }
        }

        // Check bookmarks
        const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        setIsBookmarked(bookmarks.some(b => b.url === article?.url));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    if (isBookmarked) {
      const updated = bookmarks.filter(b => b.url !== article.url);
      localStorage.setItem("bookmarks", JSON.stringify(updated));
    } else {
      localStorage.setItem("bookmarks", JSON.stringify([...bookmarks, article]));
    }
    setIsBookmarked(!isBookmarked);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={() => navigate("/")} className="modern-btn">
          Back to Home
        </button>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="not-found">
        <h2>Article not found!</h2>
        <button onClick={() => navigate("/")} className="modern-btn">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="article-detail glass-card">
      <div className="article-actions">
        <button onClick={() => navigate(-1)} className="modern-btn">
          ← Go Back
        </button>
        <button
          onClick={toggleBookmark}
          className={`modern-btn ${isBookmarked ? 'bookmarked' : ''}`}
        >
          {isBookmarked ? '★ Saved' : '☆ Save'}
        </button>
      </div>

      <h1>{article.title}</h1>
      
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="article-image"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/800x400";
          }}
        />
      )}

      <div className="article-meta">
        {article.author && <span>By {article.author}</span>}
        {article.publishedAt && (
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
        )}
        {article.source?.name && <span>Source: {article.source.name}</span>}
      </div>

      <div className="article-content">
        <p>{article.description}</p>
        {article.content && (
          <p>{article.content.replace(/\[\+\d+ chars\]/, "")}</p>
        )}
      </div>

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="modern-btn read-more"
      >
        Read Full Article
      </a>
    </div>
  );
}