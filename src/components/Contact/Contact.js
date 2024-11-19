import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="err-container">
      <h1>Let's Connect and Revolutionize E-commerce</h1>
      <h2>
        Reach out to Project Admin at{" "}
        <Link
          to="https://www.linkedin.com/in/shivang2003verma/"
          target="_blank"
        >
          LinkedIn
        </Link>{" "}
        and{" "}
        <Link to="mailto:shivangverma2003@gmail.com" target="_blank">
          shivangverma2003@gmail.com
        </Link>
      </h2>
    </div>
  );
};

export default Contact;
