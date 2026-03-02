import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaWhatsapp, FaArrowLeft } from "react-icons/fa";
import API_BASE_URL from "../config";
import "./CategoryProducts.css";

/* ── Product Card ── */
const ProductCard = ({ product, onClick }) => (
  <div className="catprod-card" onClick={onClick}>
    {product.featured && (
      <span className="catprod-featured-badge">★ Featured</span>
    )}

    <div className="catprod-card-img-wrap" style={{ position: 'relative' }}>
      {/* Heart icon for favorite */}
      {(() => {
        const favIds = JSON.parse(localStorage.getItem('favoriteProducts') || '[]');
        if (favIds.includes(product._id)) {
          return (
            <span style={{
              position: 'absolute',
              top: 8,
              left: 8,
              zIndex: 2,
              fontSize: '1.7rem',
              color: '#e63946',
              background: '#222',
              borderRadius: '50%',
              padding: '4px',
              boxShadow: '0 2px 8px #0002'
            }}>❤️</span>
          );
        }
        return null;
      })()}
      {product.image ? (
        <img src={product.image} alt={product.name} loading="lazy" />
      ) : (
        <div style={{ width: "100%", height: "100%", background: "#0c0c10" }} />
      )}
      <div className="catprod-card-img-overlay" />
    </div>

    <div className="catprod-card-body">
      <h3 className="catprod-card-name">{product.name}</h3>
      {product.description && (
        <p className="catprod-card-desc">{product.description}</p>
      )}

      <div className="catprod-card-footer">
        {product.rating && (
          <div className="catprod-rating">
            <span className="catprod-rating-star">★</span>
            <span>{product.rating}</span>
            {product.reviews && (
              <span>({product.reviews})</span>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);

/* ── Main Page ── */
export default function CategoryProducts() {
  const { categoryId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const [products, setProducts] = useState([]);
  const [categoryData, setCategoryData] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);

    // Get favorite product IDs from localStorage
    const getFavoriteIds = () => {
      try {
        return JSON.parse(localStorage.getItem('favoriteProducts') || '[]');
      } catch {
        return [];
      }
    };

  useEffect(() => {
    setCategoryData(location.state?.categoryData || null);

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/products?category=${categoryId}`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setProducts([]);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [categoryId, location.state]);

  // Sort: favorite items first, then by selected sort
  const favoriteIds = getFavoriteIds();
  const sorted = [...products].sort((a, b) => {
    // If both are favorite, preserve favorite order
    const aFavIdx = favoriteIds.indexOf(a._id);
    const bFavIdx = favoriteIds.indexOf(b._id);
    if (aFavIdx !== -1 && bFavIdx !== -1) {
      return aFavIdx - bFavIdx;
    }
    // If only one is favorite, favorite goes first
    if (aFavIdx !== -1) return -1;
    if (bFavIdx !== -1) return 1;
    // Otherwise, sort by selected sort
    switch (sortBy) {
      case "price": return (a.price ?? 0) - (b.price ?? 0);
      case "rating": return (b.rating ?? 0) - (a.rating ?? 0);
      case "reviews": return (b.reviews ?? 0) - (a.reviews ?? 0);
      default: return (a.name ?? "").localeCompare(b.name ?? "");
    }
  });

  const categoryName =
    categoryData?.name ||
    (categoryId ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1) : "");

  return (
    <div className="catprod-page">

      {/* ── Back ── */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <button className="catprod-back" onClick={() => navigate("/designs")}>
          <FaArrowLeft size={10} /> Back to Designs
        </button>
      </div>

      {/* ── Header ── */}
      <div className="catprod-header">
        <span className="catprod-tag">Collection</span>
        <h1 className="catprod-title">{categoryName}</h1>
        <p className="catprod-desc">
          {categoryData?.desc ||
            "Explore our premium handcrafted and CNC-precision pieces in this collection."}
        </p>
      </div>

      {/* ── Controls ── */}
      {!loading && products.length > 0 && (
        <div className="catprod-controls">
          <span className="catprod-count">
            <span>{products.length}</span> Item{products.length !== 1 ? "s" : ""}
          </span>
          <select
            className="catprod-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
            <option value="reviews">Sort by Popularity</option>
          </select>
        </div>
      )}

      {/* ── Loading ── */}
      {loading && (
        <div className="catprod-loading">
          <div className="catprod-loading-dots">
            <div className="catprod-loading-dot" />
            <div className="catprod-loading-dot" />
            <div className="catprod-loading-dot" />
          </div>
          <p className="catprod-loading-text">Loading collection…</p>
        </div>
      )}

      {/* ── Grid ── */}
      {!loading && products.length > 0 && (
        <div className="catprod-grid">
          {sorted.map((product, index) => (
            <ProductCard
              key={product._id || index}
              product={product}
              onClick={() =>
                navigate("/product-details", { state: { product } })
              }
            />
          ))}
        </div>
      )}

      {/* ── Empty State ── */}
      {!loading && products.length === 0 && (
        <div className="catprod-empty">
          <h3>No items in this collection yet.</h3>
          <p>
            We're constantly adding new pieces. In the meantime,<br />
            place a custom order and we'll craft exactly what you need.
          </p>
          <button className="catprod-empty-btn" onClick={() => navigate("/order")}>
            Request Custom Design
          </button>
        </div>
      )}
    </div>
  );
}