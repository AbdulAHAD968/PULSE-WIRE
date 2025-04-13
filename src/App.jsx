// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage"; // Import the new landing page
import Home from "./pages/Home";
import ArticleDetail from "./pages/ArticleDetail";
import Bookmarks from "./pages/Bookmarks";
import Technology from "./pages/Technology";
import AI from "./pages/AI";
import Cybersecurity from "./pages/Cybersecurity";
import Sports from "./pages/Sports";
import Politics from "./pages/Politics";
import Economy from "./pages/Economy";
import Jobs from "./pages/Jobs";
import Wars from "./pages/Wars";
import TVNotFound from "./pages/TVNotFound";
import "./styles/App.css";

export default function App() {
  return (
    <Router>
      {/* Conditionally render Header - won't show on LandingPage */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<WithHeaderRoutes />} />
      </Routes>
    </Router>
  );
}

// Component for routes that should have the Header
function WithHeaderRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        
        {/* Tech Category Routes */}
        <Route path="/technology" element={<Technology />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/cybersecurity" element={<Cybersecurity />} />
        <Route path="/jobs" element={<Jobs />} />
        
        {/* General Category Routes */}
        <Route path="/sports" element={<Sports />} />
        <Route path="/politics" element={<Politics />} />
        <Route path="/economy" element={<Economy />} />
        <Route path="/wars" element={<Wars />} />
        
        {/* ERROR HANDLING */}
        <Route path="*" element={<TVNotFound />} />
      </Routes>
    </>
  );
}