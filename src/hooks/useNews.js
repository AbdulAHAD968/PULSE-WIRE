// src/hooks/useNews.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = "66c7e8ff-14c0-4001-8b8b-81c3c146cf90"; // Replace with your actual Guardian API key
const BASE_URL = "https://content.guardianapis.com";

export default function useNews(query = "", category = "") {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${BASE_URL}/search?api-key=${API_KEY}&show-fields=thumbnail,trailText,bodyText&order-by=newest&page-size=20`;

      if (query) {
        url += `&q=${encodeURIComponent(query)}`;
      }

      if (category) {
        url += `&section=${category}`;
      }

      const response = await axios.get(url);
      const results = response.data.response.results;

      const articlesWithCategories = results.map(article => ({
        title: article.webTitle,
        url: article.webUrl,
        urlToImage: article.fields?.thumbnail || "https://via.placeholder.com/300",
        description: article.fields?.trailText || "No description available",
        content: article.fields?.bodyText || "",
        publishedAt: article.webPublicationDate,
        source: { name: "The Guardian" },
        category: category || article.sectionName || "general"
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
  }, [query, category]);

  return { news, loading, error, fetchNews };
}
