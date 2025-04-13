// src/hooks/useNews.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = "e75d998a559d4e94bdd64f89772ffdac";
const BASE_URL = "https://newsapi.org/v2";

export default function useNews(query = "", category = "") {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${BASE_URL}/top-headlines?country=us&pageSize=20&apiKey=${API_KEY}`;
      
      if (query) {
        url = `${BASE_URL}/everything?q=${encodeURIComponent(query)}&sortBy=popularity&apiKey=${API_KEY}`;
      } else if (category) {
        url = `${BASE_URL}/top-headlines?category=${category}&pageSize=20&apiKey=${API_KEY}`;
      }

      const response = await axios.get(url);
      const articlesWithCategories = response.data.articles.map(article => ({
        ...article,
        category: category || ["general", "tech", "sports", "politics", "entertainment"][
          Math.floor(Math.random() * 5)
        ],
        urlToImage: article.urlToImage || "https://via.placeholder.com/300",
        description: article.description || "No description available",
        source: article.source || { name: "Unknown Source" }
      }));
      setNews(articlesWithCategories);
    } catch(err) {
      setError("Failed to fetch news. Please try again later.");
      console.error("NewsAPI Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [query, category]);

  return { news, loading, error, fetchNews };
}