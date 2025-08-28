// Home.jsx - Optimized version
import React, { useEffect, useRef } from "react";
import "./LandingPage.css";
import Shery from "sheryjs";
import { Link } from "react-router-dom";
import gsap from "gsap";

function Home() {
  const textRefs = useRef([]);
  const buttonRef = useRef();
  const bgRef = useRef();

  useEffect(() => {
    // Shery.js
    Shery.mouseFollower();
    Shery.makeMagnet(".magnet-target", {
      ease: "cubic-bezier(0.23, 1, 0.32, 1)",
      duration: 0.8,
      scale: 1.05,
    });
    Shery.textAnimate(".text-item");

    // Text animation
    gsap.from(textRefs.current, {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.9,
      ease: "power3.out",
    });

    // CTA button
    gsap.from(buttonRef.current, {
      y: 30,
      opacity: 0,
      scale: 0.95,
      duration: 0.9,
      delay: 0.7,
      ease: "back.out(1.2)",
    });

    // Floating shapes (optimized)
    const shapes = bgRef.current.querySelectorAll(".floating-shape");
    shapes.forEach((shape, i) => {
      gsap.to(shape, {
        x: gsap.utils.random(-30, 30),
        y: gsap.utils.random(-30, 30),
        rotation: gsap.utils.random(-45, 45),
        duration: gsap.utils.random(5, 10),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        opacity: gsap.utils.random(0.2, 0.5),
      });
    });
  }, []);

  // Precompute floating shapes positions & sizes to reduce runtime random calculations
  const floatingShapes = [...Array(5)].map((_, i) => ({
    top: `${gsap.utils.random(0, 90)}%`,
    left: `${gsap.utils.random(0, 90)}%`,
    size: gsap.utils.random(40, 70),
    color: `rgba(59, 130, 246, ${gsap.utils.random(0.1, 0.3)})`,
  }));

  return (
    <div className="landing-page" ref={bgRef} style={{ position: "relative", overflow: "hidden" }}>
      {floatingShapes.map((shape, i) => (
        <div
          key={i}
          className="floating-shape"
          style={{
            position: "absolute",
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            borderRadius: "50%",
            background: shape.color,
            top: shape.top,
            left: shape.left,
            pointerEvents: "none",
          }}
        />
      ))}

      <div className="text-structure" style={{ position: "relative", zIndex: 2 }}>
        {["Experience", "AR Shopping"].map((item, index) => (
          <div className="masker" key={index}>
            <div className="text-wrapper">
              <h1
                className="text-item magnet-target"
                ref={(el) => (textRefs.current[index] = el)}
              >
                {item}
              </h1>
            </div>
          </div>
        ))}
      </div>

      <button
        className="cta-button magnet-target"
        ref={buttonRef}
        style={{ position: "relative", zIndex: 2 }}
      >
        <Link to="/product">
          Shop Now <span>→</span>
        </Link>
      </button>
    </div>
  );
}

export default Home;
