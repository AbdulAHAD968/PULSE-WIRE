// src/components/PulseLogo.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PulseLogo() {
  const navigate = useNavigate();

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100"
      className="pulse-logo"
      onClick={() => navigate('/home')}
    >
      {/* Modern "Pulse" logo - customizable! */}
      <path 
        d="M20,50 Q35,20 50,50 T80,50"
        fill="none" 
        stroke="currentColor" 
        strokeWidth="8"
        strokeLinecap="round"
      />
      <circle cx="50" cy="50" r="5" fill="currentColor" />
    </svg>
  );
}