import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
  const [techOpen, setTechOpen] = useState(false);
  const [generalOpen, setGeneralOpen] = useState(false);

  return (
    <header className="header">
      <Link to="/" className="logo">PulseWire</Link>

      <nav>
        <div 
          className="dropdown"
          onMouseEnter={() => setTechOpen(true)}
          onMouseLeave={() => setTechOpen(false)}
        >
          <span className="dropdown-toggle">Tech 📡</span>
          {techOpen && (
            <div className="dropdown-menu">
              <Link to="/ai">AI</Link>
              <Link to="/technology">Technology</Link>
              <Link to="/cybersecurity">Cybersecurity</Link>
              <Link to="/jobs">Job Market</Link>
              <Link to="/home">Home</Link>
            </div>
          )}
        </div>

        <div 
          className="dropdown"
          onMouseEnter={() => setGeneralOpen(true)}
          onMouseLeave={() => setGeneralOpen(false)}
        >
          <span className="dropdown-toggle">More 📰</span>
          {generalOpen && (
            <div className="dropdown-menu">
              <Link to="/sports">Sports</Link>
              <Link to="/politics">Politics</Link>
              <Link to="/economy">Economy</Link>
              <Link to="/wars">Wars</Link>
              <Link to="/home">Home</Link>
            </div>
          )}
        </div>
        <Link to="/bookmarks">Bookmarks</Link>
      </nav>
    </header>
  );
}