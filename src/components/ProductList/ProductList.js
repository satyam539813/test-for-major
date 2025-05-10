import React, { useState, useEffect } from "react";
import productItems from "../../data/ProductItems";
import ModelViewer from "../ModelViewer/ModelViewer";
import "./ProductList.css";
import { motion } from "framer-motion";
import LazyLoad from "react-lazyload";
import Shery from "sheryjs";

const ProductList = ({ addToWishlist, wishlist, removeFromWishlist }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Apply consistent animations from Home page
    Shery.makeMagnet(".product-title", {
      ease: "cubic-bezier(0.23, 1, 0.320, 1)",
      duration: 1,
    });

    setIsLoaded(true);
  }, []);

  // Animation variants for staggered loading
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  return (
    <>
      <div className="product-header">
        <div className="text-wrapper">
          <h1 className="product-title magnet-target">Our Products</h1>
          <motion.div 
            className="title-underline"
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          />
        </div>
        <p className="product-subtitle">Explore our collection with AR technology</p>
      </div>

      <motion.section 
        className="product-grid"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {productItems.map((item, idx) => (
          <LazyLoad key={idx} height={450} once>
            <motion.div 
              className="product-card"
              variants={itemVariants}
            >
              <ModelViewer 
                item={item} 
                addToWishlist={addToWishlist} 
                wishlist={wishlist} 
                removeFromWishlist={removeFromWishlist} 
              />
            </motion.div>
          </LazyLoad>
        ))}
      </motion.section>
    </>
  );
};

export default ProductList;