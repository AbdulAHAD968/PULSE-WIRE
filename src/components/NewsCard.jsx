import React from "react";
import "../styles/NewsCard.css";

export default function NewsCard({ article }) {
  // Determine card type based on category
  const getCardType = () => {
    if (article.category) {
      return article.category.toLowerCase();
    }
    // Fallback categories
    const categories = ['tech', 'sports', 'politics', 'entertainment'];
    return categories[Math.floor(Math.random() * categories.length)];
  };

  const cardType = getCardType();

  const saveArticle = () => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    if (!saved.some((item) => item.url === article.url)) {
      localStorage.setItem("bookmarks", JSON.stringify([...saved, article]));
    }
  };

  return (
    <div className={`news-card ${cardType}`}>
      <img 
        src={article.urlToImage || "https://via.placeholder.com/300"} 
        alt={article.title} 
      />
      <div className="news-card-content">
        <h3>{article.title}</h3>
        <p>{article.description?.substring(0, 120)}...</p>
        <div className="news-card-footer">
          <span className="source">{article.source?.name || "Unknown Source"}</span>
          <button onClick={saveArticle}>Save</button>
        </div>
      </div>
    </div>
  );
}