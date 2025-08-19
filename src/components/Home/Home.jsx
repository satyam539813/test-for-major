// Home.jsx - Fixed version
import React, { useEffect } from "react";
import "./LandingPage.css";
import Shery from "sheryjs";
import { Link } from "react-router-dom";

function Home() {
  useEffect(() => {
    // Ensure Shery functions are applied after the component mounts
    Shery.mouseFollower();

    Shery.makeMagnet(".magnet-target", {
      ease: "cubic-bezier(0.23, 1, 0.320, 1)",
      duration: 1,
    });

    Shery.textAnimate(".text-item" /* Element to target.*/, {
      //Parameters are optional.
      style: 1,
      y: 10,
      delay: 0.1,
      duration: 2,
      ease: "cubic-bezier(0.23, 1, 0.320, 1)",
      multiplier: 0.1,
    });
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  return (
    <div className="landing-page">

      <div className="text-structure">
        {["Experience", "AR Shopping"].map((item, index) => {
          return (
            <div className="masker" key={index}>
              <div className="text-wrapper">
                {/* {index === 1 && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "9vw" }}
                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                    className="highlight-bar"
                  ></motion.div>
                )} */}
                <h1 className="text-item magnet-target">{item}</h1>
              </div>
            </div>
          );
        })}
      </div>

      <button className="cta-button">
        <Link to="/product">Shop Now <span>→</span></Link>
      </button>

      
    </div>
  );
}

export default Home;
