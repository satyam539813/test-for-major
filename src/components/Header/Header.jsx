import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import Shery from "sheryjs";
import { toast } from 'react-toastify';

const Header = ({ currentUser, setCurrentUser }) => {
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
    { label: "Cart", Path: "/wishlist" },
    { label: "About", Path: "/about" },
    { label: "Contact", Path: "/contact" },
    { label: "Feedback", Path: "/feedback" },
  ];
  
  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null); // Clear current user state
    toast.info("You have been signed out."); // Show sign-out toast
    // Optionally redirect to home or sign-in page
  };

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
          {currentUser ? (
            <>
              <span className="user-avatar">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : currentUser.email.charAt(0).toUpperCase()}
              </span>
              {/* <span className="user-name">{currentUser.name || currentUser.email}</span> */}
              <button onClick={handleSignOut} className="auth-btn signup-btn">Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/sign-in" className="auth-btn">Sign In</Link>
              <Link to="/sign-up" className="auth-btn signup-btn">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
