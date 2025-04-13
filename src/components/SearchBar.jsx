import React, { useState } from "react";
import "../styles/SearchBar.css";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  // You can customize these suggestions
  const suggestions = [
    "Technology",
    "AI",
    "Cybersecurity",
    "Politics",
    "Sports",
    "Economy",
    "Jobs",
    "Wars",
  ];

  return (
    <div className="search-bar">
      <input
        list="search-suggestions"
        type="text"
        placeholder="Search news..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <datalist id="search-suggestions">
        {suggestions.map((suggestion, index) => (
          <option key={index} value={suggestion} />
        ))}
      </datalist>
      <button onClick={() => onSearch(query)}>Search</button>
    </div>
  );
}
