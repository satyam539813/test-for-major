import React, { useEffect, useRef, useState } from "react";
import "./Feedback.css";
import { motion } from "framer-motion";
import Shery from "sheryjs";

const Feedback = () => {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    username: "",
    useremail: "",
    liked: "",
    improve: "",
    features: "",
    comments: ""
  });

  // Track form completion percentage
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    // Calculate form completion percentage
    const totalFields = Object.keys(formState).length;
    const filledFields = Object.values(formState).filter(value => value.trim() !== "").length;
    setCompletionPercentage(Math.round((filledFields / totalFields) * 100));
    
    // Add animation effects from Home page
    Shery.makeMagnet(".feedback-title", {
      ease: "cubic-bezier(0.23, 1, 0.320, 1)",
      duration: 1,
    });

    // Load necessary scripts
    const script1 = document.createElement("script");
    script1.src = "https://smtpjs.com/v3/smtp.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://unpkg.com/sweetalert/dist/sweetalert.min.js";
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, [formState]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState({
      ...formState,
      [id]: value
    });
  };

  const sendMail = () => {
    setIsSubmitting(true);
    
    let body = "Name of the User: <br/>" + formState.username + "<br/>" + 
      "Email of the User: <br/>" + formState.useremail + "<br/><br/>" +
      "What did you like most about AR-Webstore? <br/>" + formState.liked +
      "<br/><br/> Will our 3D and AR features improve your shopping experience if we integrate it on an online e-commerce store ?<br/>" + formState.improve +
      "<br/><br/> What are the other features that excite you to have them on AR-Webstore ?<br/>" + formState.features +
      "<br/> <br/>Any other comments?<br/>" + formState.comments;

    window.Email.send({
      Host: "smtp.elasticemail.com",
      Username: "shwetkhatri2001@gmail.com",
      Password: "BAAF238142FDFE27699F12B3FC14B1A5C9F7",
      To: "shwetkhatri2001@gmail.com",
      From: "shwetkhatri2001@gmail.com",
      Subject: "AR-Webstore has got a feedback",
      Body: body,
    }).then((message) => {
        setIsSubmitting(false);
        if (message === "OK") {
          window.swal(
            "Thank You!",
            "We've received your valuable feedback",
            "success"
          ).then(() => {
            formRef.current.reset();
            setFormState({
              username: "",
              useremail: "",
              liked: "",
              improve: "",
              features: "",
              comments: ""
            });
          });
        } else {
          window.swal(
            "Something Wrong",
            "Your feedback could not be submitted. Please try again.",
            "error"
          );
        }
      });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const formVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
        delay: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="feedback-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="feedback-header">
        <div className="text-wrapper">
          <h1 className="feedback-title magnet-target">Your Feedback</h1>
          <motion.div 
            className="title-underline"
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          />
        </div>
        <p className="feedback-subtitle">Help us evolve with your valuable insights</p>
      </div>

      <motion.div 
        className="feedback-form-container"
        variants={formVariants}
      >
        <div className="form-progress">
          <div className="progress-text">Completion: {completionPercentage}%</div>
          <div className="progress-bar-container">
            <motion.div 
              className="progress-bar" 
              initial={{ width: "0%" }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <form id="feed" ref={formRef} onSubmit={(e) => e.preventDefault()} className="feedback-form">
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="username">Your Name</label>
              <input 
                type="text" 
                id="username" 
                placeholder="Enter your name"
                value={formState.username}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="useremail">Your Email</label>
              <input 
                type="email" 
                id="useremail" 
                placeholder="Enter your email"
                value={formState.useremail}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="liked">What did you like most about AR-Webstore?</label>
            <input 
              type="text" 
              id="liked" 
              placeholder="Share what you enjoyed..."
              value={formState.liked}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="improve">
              Will our 3D and AR features improve your shopping experience?
            </label>
            <input 
              type="text" 
              id="improve" 
              placeholder="Tell us how it might enhance your experience..."
              value={formState.improve}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="features">
              What other features would you like to see on AR-Webstore?
            </label>
            <input 
              type="text" 
              id="features" 
              placeholder="Share your feature ideas..."
              value={formState.features}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="comments">Any other comments or suggestions?</label>
            <textarea
              id="comments"
              placeholder="We'd love to hear your thoughts..."
              value={formState.comments}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <button 
            type="button" 
            className={`submit-button ${isSubmitting ? 'submitting' : ''}`} 
            onClick={sendMail}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Submit Feedback'}
            <span className="button-arrow">→</span>
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Feedback;