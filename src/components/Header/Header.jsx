import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import Shery from "sheryjs";

const Header = () => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    // Ensure Shery functions are applied after the component mounts
    Shery.makeMagnet(".brand-title", {
      ease: "cubic-bezier(0.23, 1, 0.320, 1)",
      duration: 1,
    });
    
    // Add scroll event listener
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);  

  const navigationLinks = [
    { label: "Home", Path: "/" },
    { label: "Products", Path: "/product" },
    { label: "WishList", Path: "/wishlist" },
    { label: "About", Path: "/about" },
    { label: "Contact", Path: "/contact" },
    { label: "Feedback", Path: "/feedback" },
  ];
  
  const authLinks = [
    { label: "Sign In", Path: "/sign-in" },
    { label: "Sign Up", Path: "/sign-up" },
  ];
  
  const handleItemClick = () => {
    setShowMobileSidebar(true);
  };
  
  return (
    <header className={scrolled ? "scrolled" : ""}>
      <nav>
        <div className="navtop">
          <h3 className="brand-title">
            <Link
              to="/"
              onClick={() => showMobileSidebar && setShowMobileSidebar(false)}
              className="brand-title"
            >
              <span className="ar-text">AR</span> Shopsy
            </Link>
          </h3>
          <div
            className={`mobile-menu-icon ${!showMobileSidebar ? "active" : ""}`}
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
          >
            {Array.from({ length: 2 + showMobileSidebar }, (_, i) => (
              <div
                key={i}
                className={
                  i === 0 ? "firstbar" : i === 1 ? "secondbar" : "lastbar"
                }
              />
            ))}
          </div>
        </div>
      </nav>
      
      <div className="nav-container">
        <ul className={`desktop-nav ${showMobileSidebar ? "" : "show"}`}>
          {navigationLinks.map((item, key) => (
            <li key={key} onClick={handleItemClick}>
              <Link to={item.Path} className="nav-link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="auth-links">
          {authLinks.map((item, key) => (
            <Link 
              key={key} 
              to={item.Path} 
              className={`auth-btn ${item.label === "Sign Up" ? "signup-btn" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;