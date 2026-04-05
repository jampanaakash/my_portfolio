// src/App.tsx

import React, { useEffect } from 'react';
import './App.css';

const App = () => {
  useEffect(() => {
    const handleScroll = () => {
      // Parallax scrolling effects
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach((element) => {
        const rate = element.getAttribute('data-rate');
        element.style.transform = `translateY(${scrolled * rate}px)`;
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
        } else {
          entry.target.classList.remove('reveal');
        }
      });
    });

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      observer.observe(section);
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="App">
      {/* Existing content here */}
      <section className="parallax" data-rate="0.5">
        <h1>Welcome to My Portfolio</h1>
      </section>
      <section className="content">
        <h2>About Me</h2>
        <p>This is the about section.</p>
      </section>
      {/* Add more sections as needed */}
    </div>
  );
};

export default App;