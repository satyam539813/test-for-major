import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Shery from "sheryjs";
import "./Contact.css";

const Contact = () => {
  useEffect(() => {
    // Apply consistent animations from Home page
    Shery.makeMagnet(".contact-title", {
      ease: "cubic-bezier(0.23, 1, 0.320, 1)",
      duration: 1,
    });

    Shery.makeMagnet(".contact-card", {
      ease: "cubic-bezier(0.23, 1, 0.320, 1)",
      duration: 0.8,
    });
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z",
      url: "https://www.linkedin.com/in/shivang2003verma/",
      color: "#0077B5"
    },
    {
      name: "Email",
      icon: "M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z",
      url: "mailto:shivangverma2003@gmail.com",
      color: "#D44638"
    },
    {
      name: "GitHub",
      icon: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z",
      url: "https://github.com/shivang2003verma",
      color: "#24292e"
    }
  ];

  return (
    <motion.div 
      className="contact-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="contact-header">
        <div className="text-wrapper">
          <h1 className="contact-title magnet-target">Get in Touch</h1>
          <motion.div 
            className="title-underline"
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          />
        </div>
        <p className="contact-subtitle">Let's connect and revolutionize e-commerce together</p>
      </div>
      
      <motion.div 
        className="contact-content"
        variants={itemVariants}
      >
        <div className="contact-cards-container">
          <div className="contact-card magnet-target">
            <div className="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm16 3.38V6H4v1.38l8 4 8-4zm0 2.24-7.55 3.77a1 1 0 0 1-.9 0L4 9.62V18h16V9.62z"/>
              </svg>
            </div>
            <h3>Email</h3>
            <p>Reach out via email for inquiries and collaboration</p>
            <a href="mailto:shivangverma2003@gmail.com" className="contact-link">
              shivangverma2003@gmail.com
            </a>
          </div>
          
          <div className="contact-card magnet-target">
            <div className="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </div>
            <h3>LinkedIn</h3>
            <p>Connect professionally and stay updated</p>
            <a href="https://www.linkedin.com/in/shivang2003verma/" target="_blank" rel="noopener noreferrer" className="contact-link">
              linkedin.com/in/shivang2003verma
            </a>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="social-links"
        variants={itemVariants}
      >
        {socialLinks.map((link, index) => (
          <a 
            key={index} 
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon-link"
            style={{ '--hover-color': link.color }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
              <path d={link.icon}/>
            </svg>
          </a>
        ))}
      </motion.div>

      <motion.div 
        className="contact-cta"
        variants={itemVariants}
      >
        <h2>Ready to transform your shopping experience?</h2>
        <Link to="/feedback" className="cta-button">
          Share Your Feedback <span className="button-arrow">→</span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Contact;