import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchProductDetails } from "../services/api";
import { toast } from "react-toastify";
import { FaArrowLeft, FaWhatsapp, FaShoppingCart } from "react-icons/fa";
import "./ProductDetails.css";

export default function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const passedProduct = location.state?.product;

  const [product, setProduct] = useState(passedProduct || null);
  const [loading, setLoading] = useState(!passedProduct);
  const [fullscreenIdx, setFullscreenIdx] = useState(null);

    // Favorite state
    const [isFavorite, setIsFavorite] = useState(false);

    // Check if product is favorite (localStorage for demo)
    useEffect(() => {
      if (product?._id) {
        const favs = JSON.parse(localStorage.getItem('favoriteProducts') || '[]');
        setIsFavorite(favs.includes(product._id));
      }
    }, [product]);

    // Mark/unmark favorite
    const toggleFavorite = () => {
      if (!product?._id) return;
      let favs = JSON.parse(localStorage.getItem('favoriteProducts') || '[]');
      if (isFavorite) {
        favs = favs.filter(id => id !== product._id);
      } else {
        favs.unshift(product._id); // Add to front
      }
      localStorage.setItem('favoriteProducts', JSON.stringify(favs));
      setIsFavorite(!isFavorite);
    };

  useEffect(() => {
    if (passedProduct?._id) {
      (async () => {
        try {
          setLoading(true);
          const data = await fetchProductDetails(passedProduct._id);
          setProduct(data);
        } catch (err) {
          console.error(err);
          toast.error("Failed to load product details");
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [passedProduct]);

  // Close lightbox on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setFullscreenIdx(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Normalise images: backend sends 'image' string, or 'images' array
  const productImages =
    product?.images?.length
      ? product.images
      : product?.image
        ? [{ url: product.image, description: product.description || product.name }]
        : [];

  /* ── Loading ── */
  if (loading) return (
    <div className="pd-page">
      <div className="pd-loading">
        <div className="pd-loading-dots">
          <div className="pd-loading-dot" />
          <div className="pd-loading-dot" />
          <div className="pd-loading-dot" />
        </div>
        <p className="pd-loading-text">Loading product…</p>
      </div>
    </div>
  );

  /* ── No product ── */
  if (!product) return (
    <div className="pd-page">
      <div className="pd-wrap" style={{ textAlign: "center", paddingTop: "4rem" }}>
        <h2 style={{ color: "#fff", marginBottom: "1rem" }}>No product selected.</h2>
        <button className="pd-back" onClick={() => navigate(-1)}>← Go Back</button>
      </div>
    </div>
  );

  return (
    <div className="pd-page">

      {/* ── Back ── */}
      <button className="pd-back" onClick={() => navigate(-1)}>
        <FaArrowLeft size={10} /> Back
      </button>

      <div className="pd-wrap">

        {/* ── Header ── */}
        <div className="pd-header">
          <span className="pd-tag">Product Detail</span>
          <h1 className="pd-title">{product.name}</h1>
          {product.description && (
            <p className="pd-desc">{product.description}</p>
          )}
        </div>

        {/* ── Image grid (multiple images) ── */}
        {productImages.length > 1 && (
          <div className="pd-images">
            {productImages.map((imgObj, idx) => (
              <div
                key={idx}
                className="pd-img-tile"
                onClick={() => setFullscreenIdx(idx)}
              >
                <img
                  src={imgObj.url}
                  alt={`${product.name} ${idx + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        {/* ── Single image hero ── */}
        {productImages.length === 1 && (
          <img
            className="pd-hero-img"
            src={productImages[0].url}
            alt={product.name}
            onClick={() => setFullscreenIdx(0)}
          />
        )}

        {/* ── Action Buttons ── */}
        <div className="pd-cta">
          <div className="pd-cta-text">
            <h3>Love this piece?</h3>
            <p>
              Order it directly or enquire on WhatsApp for customisation,
              dimensions, or a personalised quote.
            </p>
          </div>
          <div className="pd-cta-actions">
            <button
              className="pd-buy-btn"
              onClick={() =>
                navigate("/order", {
                  state: {
                    prefill: {
                      designName: product.name || "",
                      material: product.material || "",
                      notes: product.description
                        ? `Interested in: ${product.name}. ${product.description}`
                        : `Interested in: ${product.name}`,
                      imageUrl: productImages[0]?.url || "",
                    },
                  },
                })
              }
            >
              <FaShoppingCart size={14} /> Buy Now
            </button>
            <a
              href={`https://wa.me/9779840028822?text=Hi! I'm interested in: ${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pd-cta-btn"
            >
              <FaWhatsapp size={16} /> WhatsApp
            </a>
            {/* Favorite button at the side of WhatsApp */}
            <button
              className={`pd-fav-btn${isFavorite ? ' fav' : ''}`}
              onClick={toggleFavorite}
              aria-label={isFavorite ? 'Unmark favorite' : 'Mark as favorite'}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              style={{ marginLeft: 12, background: '#222', border: 'none', borderRadius: '50%', padding: '8px', boxShadow: '0 2px 8px #0002' }}
            >
              <span style={{ color: isFavorite ? '#e63946' : '#fff', fontSize: '1.5rem' }}>
                {isFavorite ? '❤️' : '🤍'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {fullscreenIdx !== null && productImages[fullscreenIdx] && (
        <div className="pd-lightbox" onClick={() => setFullscreenIdx(null)}>
          <div
            className="pd-lightbox-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              className="pd-lightbox-img"
              src={productImages[fullscreenIdx].url}
              alt={product.name}
            />
            <div className="pd-lightbox-info">
              <h2>{product.name}</h2>
              {productImages[fullscreenIdx].description && (
                <p>{productImages[fullscreenIdx].description}</p>
              )}
            </div>
          </div>

          {/* Close button */}
          <button
            className="pd-lightbox-close"
            onClick={() => setFullscreenIdx(null)}
            aria-label="Close"
          >
            ✕
          </button>

          <span className="pd-lightbox-hint">Click outside or press Esc to close</span>
        </div>
      )}
    </div>
  );
}
