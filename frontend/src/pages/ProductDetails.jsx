import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchProductDetails } from "../services/api";
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Prioritize state passed from navigation, but if not available, fetch by ID? 
  // Wait, location.state.product might not have reviews if list API didn't include them.
  // Best to fetch fresh details always to get latest reviews.
  const passedProduct = location.state?.product;

  const [product, setProduct] = useState(passedProduct || null);
  const [loading, setLoading] = useState(!passedProduct);
  const [fullscreenIdx, setFullscreenIdx] = useState(null);

  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  useEffect(() => {
    if (passedProduct?._id) {
      loadProductData(passedProduct._id);
    }
  }, [passedProduct]);

  const loadProductData = async (id) => {
    try {
      setLoading(true);
      const data = await fetchProductDetails(id);
      setProduct(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };


  if (!product && !loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>No Product Selected</h1>
        <button onClick={() => navigate(-1)} style={{ marginTop: "1rem" }}>Go Back</button>
      </div>
    );
  }

  // Handle data structure mismatch: Backend uses 'image' (string), Frontend expected 'images' (array)
  const productImages = product?.images || (product?.image ? [{ url: product.image, description: product.description || product.name }] : []);

  const responsiveStyles = `
    @media (max-width: 768px) {
      .product-details-container {
        padding: 1rem !important;
      }

      .product-details-title {
        font-size: 2rem !important;
        margin-bottom: 2rem !important;
      }

      .product-details-images {
        gap: 1rem !important;
      }

      .product-details-images img {
        width: 100% !important;
        max-width: 300px !important;
      }

      .product-details-description {
        font-size: 1rem !important;
        padding: 1rem !important;
        margin-bottom: 2rem !important;
      }

      .fullscreen-content h2 {
        font-size: 1.5rem !important;
      }

      .fullscreen-content p {
        font-size: 1rem !important;
      }

      .fullscreen-close-btn {
        top: 15px !important;
        right: 15px !important;
        width: 40px !important;
        height: 40px !important;
        font-size: 20px !important;
      }
    }

    @media (max-width: 480px) {
      .product-details-title {
        font-size: 1.75rem !important;
      }

      .product-details-images img {
        width: 100% !important;
      }

      .product-details-description {
        font-size: 0.95rem !important;
      }
    }
  `;

  return (
    <>
      <style>{responsiveStyles}</style>
      <div className="product-details-container" style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <button onClick={() => navigate(-1)} style={{ marginBottom: "2rem", padding: "8px 16px", cursor: "pointer" }}>&larr; Go Back</button>

        {product && (
          <>
            <h1 className="product-details-title" style={{ textAlign: "center", marginBottom: "3rem", color: "#f1f5f9", fontSize: "2.5rem", fontWeight: 700 }}>{product.name}</h1>

            <div className="product-details-images" style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap", margin: "0 auto 2rem" }}>
              {productImages.map((imgObj, idx) => (
                <div key={idx} style={{ textAlign: "center", marginBottom: "2rem" }}>
                  <img
                    src={imgObj.url}
                    alt={product.name + " " + (idx + 1)}
                    style={{ width: "300px", height: "auto", objectFit: "cover", borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.3)", cursor: "pointer" }}
                    onClick={() => setFullscreenIdx(idx)}
                  />
                </div>
              ))}
            </div>

            <p className="product-details-description" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 4rem", color: "#94a3b8", fontSize: "1.1rem", lineHeight: 1.8, background: "rgba(30, 41, 59, 0.3)", padding: "1.5rem", borderRadius: "12px" }}>
              {product.description}
            </p>

          </>
        )}

        {fullscreenIdx !== null && (
          <div
            style={{
              position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
              background: "rgba(0,0,0,0.95)", zIndex: 2000, display: "flex",
              flexDirection: "column", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(10px)"
            }}
            onClick={() => setFullscreenIdx(null)}
          >
            <div style={{ position: "relative", maxWidth: "90vw", maxHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img
                src={productImages[fullscreenIdx].url}
                alt={product.name}
                style={{ maxWidth: "100%", maxHeight: "70vh", borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.5)", marginBottom: "1.5rem" }}
                onClick={(e) => e.stopPropagation()}
              />

              <div
                style={{
                  textAlign: "center", maxWidth: "800px", color: "white",
                  fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif"
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", fontWeight: 600 }}>{product.name}</h2>
                <p style={{ fontSize: "1.1rem", color: "#cbd5e1", lineHeight: 1.6, fontWeight: 400 }}>
                  {product.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => setFullscreenIdx(null)}
              style={{
                position: "fixed", top: 30, right: 30, zIndex: 2100, fontSize: 24,
                background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "50%", width: "50px", height: "50px", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.3s"
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
              onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            >
              &times;
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
