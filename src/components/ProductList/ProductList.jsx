 import React, { useState, useEffect, useCallback, useMemo } from "react";
import productItems from "../../data/ProductItems";
import ModelViewer from "../ModelViewer/ModelViewer";
import "./ProductList.css";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import Shery from "sheryjs";

const ProductList = ({ addToWishlist, wishlist, removeFromWishlist }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageErrors, setImageErrors] = useState(new Set());

  // Memoize animation variants to prevent recreation on every render
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] }
    }
  }), []);

  // Handle image loading errors
  const handleImageError = useCallback((itemId) => {
    setImageErrors(prev => new Set([...prev, itemId]));
  }, []);

  useEffect(() => {
    let cleanup;

    try {
      // Apply Shery animations with error handling
      cleanup = Shery.makeMagnet(".product-title", {
        ease: "cubic-bezier(0.23, 1, 0.32, 1)",
        duration: 1,
      });
    } catch (error) {
      console.warn('Shery animation failed:', error);
    }

    setIsLoaded(true);

    // Cleanup function
    return () => {
      if (cleanup && typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, []);

  // Memoize the product items to prevent unnecessary re-renders
  const memoizedProductItems = useMemo(() => productItems, []);

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
        {memoizedProductItems.map((item, idx) => (
          <ProductCard
            key={item.id || idx} // Use item.id if available, fallback to index
            item={item}
            variants={itemVariants}
            addToWishlist={addToWishlist}
            wishlist={wishlist}
            removeFromWishlist={removeFromWishlist}
            onImageError={() => handleImageError(item.id || idx)}
            hasImageError={imageErrors.has(item.id || idx)}
          />
        ))}
      </motion.section>
    </>
  );
};

// Extracted ProductCard component for better performance
const ProductCard = React.memo(({
  item,
  variants,
  addToWishlist,
  wishlist,
  removeFromWishlist,
  onImageError,
  hasImageError
}) => {
  return (
    <motion.div
      className="product-card"
      variants={variants}
    >
      {!hasImageError ? (
        <LazyLoadImage
          src={item.image}
          alt={item.name || 'Product image'}
          effect="blur"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
          onError={onImageError}
          loading="lazy"
          placeholder={<div className="image-placeholder">Loading...</div>}
        />
      ) : (
        <div className="image-error-placeholder">
          <span>Image unavailable</span>
        </div>
      )}

      <ModelViewer
        item={item}
        addToWishlist={addToWishlist}
        wishlist={wishlist}
        removeFromWishlist={removeFromWishlist}
      />
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductList;