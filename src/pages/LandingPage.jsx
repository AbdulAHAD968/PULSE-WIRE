// src/pages/LandingPage.jsx
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import '../styles/LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();
  const pulseRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Pulse animation on scroll
    gsap.to(pulseRef.current, {
      scale: 1.5,
      opacity: 0.7,
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    // Smooth scrolling with Lenis
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(instance => instance.kill());
    };
  }, []);

  const handlePulseClick = () => {
    gsap.to(pulseRef.current, {
      scale: 1.8,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      onComplete: () => navigate('/home')
    });
  };

  return (
    <div className="parallax">
      
      <section className="parallax__header">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow"></div>
          <div data-parallax-layers className="parallax__layers">
            <img 
              src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795be09b462b2e8ebf71_osmo-parallax-layer-3.webp" 
              loading="eager" 
              width="800" 
              data-parallax-layer="1" 
              alt="" 
              className="parallax__layer-img"
            />
            <img 
              src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795b4d5ac529e7d3a562_osmo-parallax-layer-2.webp" 
              loading="eager" 
              width="800" 
              data-parallax-layer="2" 
              alt="" 
              className="parallax__layer-img"
            />
            <div data-parallax-layer="3" className="parallax__layer-title">
              <h2 className="parallax__title">PulseWire</h2>
            </div>
            <img 
              src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795bb5aceca85011ad83_osmo-parallax-layer-1.webp" 
              loading="eager" 
              width="800" 
              data-parallax-layer="4" 
              alt="" 
              className="parallax__layer-img"
            />
          </div>
          <div className="parallax__fade"></div>
        </div>
      </section>
      
      <section className="parallax__content" ref={contentRef}>
        <div 
          className="pulse-container" 
          ref={pulseRef}
          onClick={handlePulseClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 160 160"
            fill="none"
            className="pulse-svg"
          >
            <path
              d="M10 80h30l10-20 15 40 20-60 15 40h25"
              stroke="#b86b35"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="10"
              cy="80"
              r="3"
              fill="#b86b35"
            />
            <circle
              cx="140"
              cy="80"
              r="3"
              fill="#b86b35"
            />
          </svg>

        </div>
        <p className="pulse-text">Pulse-Wire – Stay Wired to the World's Pulse</p>
      </section>
    </div>
  );
}