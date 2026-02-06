import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/currency";
import { useTranslation } from "react-i18next";

import { FaWhatsapp } from 'react-icons/fa';

// Product Card Component
const ProductCard = ({ product, onClick, index }) => {
  const { i18n } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  const cardStyles = {
    width: 300,
    background: "rgba(30, 41, 59, 0.9)",
    borderRadius: 20,
    boxShadow: isHovered
      ? "0 25px 50px rgba(0, 0, 0, 0.4), 0 15px 35px rgba(59, 130, 246, 0.3)"
      : "0 15px 35px rgba(0, 0, 0, 0.2), 0 8px 20px rgba(0, 0, 0, 0.1)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: isHovered ? "translateY(-12px) scale(1.02)" : "translateY(0) scale(1)",
    cursor: "pointer",
    overflow: "hidden",
    backdropFilter: "blur(20px)",
    border: product.featured ? "2px solid #3b82f6" : "1px solid rgba(59, 130, 246, 0.3)",
  };

  const imageStyles = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    transition: "all 0.4s ease",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
  };

  const contentStyles = { padding: "1.5rem" };
  const titleStyles = { fontSize: "1.2rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.5rem" };
  const descriptionStyles = { fontSize: "0.9rem", color: "#94a3b8", marginBottom: "1rem", lineHeight: 1.5 };

  // WhatsApp Button Styles
  const whatsappButtonStyles = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "#25D366",
    color: "white",
    padding: "8px 16px",
    borderRadius: "20px",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "0.9rem",
    marginTop: "0.5rem",
    transition: "background 0.3s ease",
  };

  const ratingStyles = { display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "#94a3b8" };

  return (
    <div
      style={cardStyles}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {product.featured && (
        <div style={{
          position: "absolute", top: "12px", left: "12px",
          background: "linear-gradient(135deg, #f59e0b, #d97706)",
          color: "white", padding: "4px 8px", borderRadius: "12px",
          fontSize: "0.75rem", fontWeight: 600, zIndex: 2,
        }}>
          ⭐ Featured
        </div>
      )}

      <img src={product.image} alt={product.name} style={imageStyles} />

      <div style={contentStyles}>
        <h3 style={titleStyles}>{product.name}</h3>
        <p style={descriptionStyles}>{product.description}</p>

        <a
          href="https://wa.me/9779840028822"
          target="_blank"
          rel="noopener noreferrer"
          style={whatsappButtonStyles}
          onClick={(e) => e.stopPropagation()}
        >
          <FaWhatsapp size={18} />
          Contact Us
        </a>

        <div style={ratingStyles}>
          <span>⭐ {product.rating}</span>
          <span>({product.reviews} reviews)</span>
        </div>
      </div>
    </div>
  );
};

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categoryData, setCategoryData] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);

  // Initial fetch
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?category=${categoryId}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
      setLoading(false);
    };

    setCategoryData(location.state?.categoryData);
    fetchProducts();
  }, [categoryId, location.state]);

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price": return a.price - b.price;
      case "rating": return b.rating - a.rating;
      case "reviews": return b.reviews - a.reviews;
      case "name": default: return a.name.localeCompare(b.name);
    }
  });

  const containerStyles = {
    minHeight: "100vh",
    padding: "1.75rem",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #334155 80%, #475569 100%)",
    position: "relative",
    backgroundAttachment: "fixed",
  };

  const backgroundPattern = {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundImage: `
      radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.12) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.06) 0%, transparent 60%)
    `,
    backgroundSize: "600px 600px, 800px 800px, 1000px 1000px",
    zIndex: 1,
  };

  const contentStyles = {
    position: "relative",
    zIndex: 2,
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 1rem",
  };

  const headerStyles = {
    textAlign: "center",
    marginBottom: "3rem",
    background: "rgba(15, 23, 42, 0.8)",
    borderRadius: "20px",
    padding: "2rem",
    backdropFilter: "blur(20px)",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(59, 130, 246, 0.2)",
  };

  const titleStyles = {
    fontSize: "2.8rem",
    fontWeight: 700,
    background: "linear-gradient(135deg, #60a5fa, #a78bfa, #34d399)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "1rem",
    letterSpacing: "-0.02em",
  };

  const subtitleStyles = {
    fontSize: "1.1rem",
    color: "#94a3b8",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: 1.6,
  };

  const controlsStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    flexWrap: "wrap",
    gap: "1rem",
    background: "rgba(15, 23, 42, 0.6)",
    padding: "1rem",
    borderRadius: "16px",
    border: "1px solid rgba(148, 163, 184, 0.1)",
  };

  const selectStyles = {
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(59, 130, 246, 0.3)",
    fontSize: "1rem",
    background: "rgba(30, 41, 59, 0.9)",
    color: "#f1f5f9",
    backdropFilter: "blur(10px)",
    cursor: "pointer",
  };

  const gridStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "2.5rem",
    placeItems: "center",
  };

  const responsiveStyles = `
    @media (max-width: 768px) {
      .category-products-container {
        padding: 1rem !important;
      }

      .category-header {
        padding: 1.5rem !important;
        margin-bottom: 2rem !important;
      }

      .category-title {
        font-size: 2rem !important;
      }

      .category-subtitle {
        font-size: 1rem !important;
      }

      .category-controls {
        flex-direction: column !important;
        align-items: stretch !important;
      }

      .category-grid {
        grid-template-columns: 1fr !important;
        gap: 1.5rem !important;
      }
    }

    @media (max-width: 480px) {
      .category-title {
        font-size: 1.75rem !important;
      }

      .category-subtitle {
        font-size: 0.95rem !important;
      }

      .category-grid {
        gap: 1rem !important;
      }
    }

    @media (min-width: 769px) and (max-width: 1024px) {
      .category-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }
  `;

  return (
    <>
      <style>{responsiveStyles}</style>
      <div className="category-products-container" style={containerStyles}>
        <div style={backgroundPattern} />

        <div style={contentStyles}>
          {/* Header Section */}
          <div className="category-header" style={headerStyles}>
            <h1 className="category-title" style={titleStyles}>
              {categoryData?.title || categoryId?.charAt(0).toUpperCase() + categoryId?.slice(1)} Collection
            </h1>
            <p className="category-subtitle" style={subtitleStyles}>
              {categoryData?.description || "Explore our premium collection of hand-carved masterpieces."}
            </p>
          </div>

          {/* Controls */}
          <div className="category-controls" style={controlsStyles}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <span style={{ color: "#94a3b8" }}>{products.length} Products</span>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={selectStyles}
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
              <option value="reviews">Sort by Popularity</option>
            </select>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Loading products...</div>
          ) : (
            <div className="category-grid" style={gridStyles}>
              {sortedProducts.map((product, index) => (
                <ProductCard
                  key={product._id || index}
                  product={product}
                  index={index}
                  onClick={() => navigate("/product-details", { state: { product } })}
                />
              ))}
            </div>
          )}

          {products.length === 0 && !loading && (
            <div style={{ textAlign: "center", padding: "4rem", color: "#94a3b8" }}>
              <h3>No products found in this category.</h3>
              <p>Try exploring other categories or check back later.</p>
              <button
                onClick={() => navigate("/order")}
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  background: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                Place Custom Order
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryProducts;