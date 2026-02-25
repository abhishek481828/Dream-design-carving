import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

// Import images
import artisanCarving from "../assets/wooden-door.jpg"; // User provided image
import modernTempleArt from "../assets/artisan-carving.jpg";
import furnitureArt from "../assets/furniture-art.png";
import sculpturesArt from "../assets/sculptures.png";
import panelsArt from "../assets/panels.png";
import customArt from "../assets/custom.png";

// Main product categories - Only 5 categories
const productCategories = [
  {
    id: "doors",
    name: "Wooden Doors",
    description: "Handcrafted doors with intricate designs and patterns",
    mainImage: artisanCarving,
  },
  {
    id: "furniture",
    name: "Modern Temple",
    description: "Elegant wooden temple pieces with artistic craftsmanship",
    mainImage: modernTempleArt,
  },
  {
    id: "sculptures",
    name: "Sculptures",
    description: "Three-dimensional wooden art pieces and decorative sculptures",
    mainImage: sculpturesArt,
  },
  {
    id: "panels",
    name: "Decorative Panels",
    description: "Beautiful wall panels and room dividers with intricate patterns",
    mainImage: panelsArt,
  },
  {
    id: "custom",
    name: "Custom Designs",
    description: "Personalized wooden creations tailored to your specific requirements",
    mainImage: customArt,
  },
];

// Category Card Component
const CategoryCard = ({ category, onClick, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const cardStyles = {
    width: 320,
    textAlign: "center",
    boxShadow: isHovered
      ? "0 20px 40px rgba(0, 0, 0, 0.35), 0 12px 25px rgba(59, 130, 246, 0.25)"
      : "0 12px 25px rgba(0, 0, 0, 0.18), 0 6px 15px rgba(0, 0, 0, 0.1)",
    borderRadius: 18,
    padding: "0",
    background: "rgba(30, 41, 59, 0.9)",
    backdropFilter: "blur(20px)",
    cursor: "pointer",
    transition: "all 0.35s ease-out",
    margin: "0.75rem",
    transform: isHovered ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)",
    border: "1px solid rgba(59, 130, 246, 0.3)",
    position: "relative",
    overflow: "hidden",
  };

  const shimmerOverlay = {
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.15), rgba(240, 147, 251, 0.15), transparent)",
    animation: isHovered ? "shimmer 2s ease-in-out" : "none",
    zIndex: 1,
  };

  const glowOverlay = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(240, 147, 251, 0.08) 100%)",
    opacity: isHovered ? 1 : 0,
    transition: "opacity 0.5s ease",
    pointerEvents: "none",
    borderRadius: 28,
    zIndex: 0,
  };

  const imageContainerStyles = {
    position: "relative",
    marginBottom: "0",
    borderRadius: "18px 18px 0 0",
    overflow: "hidden",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    height: "220px",
  };

  const imageStyles = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: isHovered ? "scale(1.2) rotate(2deg)" : "scale(1.05)",
    opacity: imageLoaded ? 1 : 0,
    filter: isHovered ? "brightness(1.1) contrast(1.1) saturate(1.2)" : "brightness(1) contrast(1) saturate(1)",
  };



  const contentStyles = {
    padding: "1.5rem 1.25rem",
    position: "relative",
    zIndex: 2,
    textAlign: "center",
  };

  const titleStyles = {
    margin: "0 0 12px 0",
    fontWeight: 800,
    fontSize: "1.5rem",
    color: "#f1f5f9",
    letterSpacing: "0.5px",
    lineHeight: 1.2,
  };

  const descriptionStyles = {
    margin: "0 0 16px 0",
    fontSize: "1rem",
    color: "#94a3b8",
    lineHeight: 1.6,
    fontWeight: 400,
  };





  const exploreButtonStyles = {
    background: "linear-gradient(135deg, #2563eb 0%, #1e3a8a 100%)", /* Vibrant Royal Blue Gradient */
    color: "#ffffff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "0.9rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
    transform: isHovered ? "translateY(-3px)" : "translateY(0)",
    boxShadow: isHovered
      ? "0 10px 20px rgba(37, 99, 235, 0.5)"
      : "0 4px 10px rgba(0, 0, 0, 0.2)",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  };

  return (
    <div
      style={cardStyles}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={shimmerOverlay} />
      <div style={glowOverlay} />

      <div style={imageContainerStyles}>
        <img
          src={category.mainImage}
          alt={category.name}
          style={imageStyles}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div style={contentStyles}>
        <h3 style={titleStyles}>{category.name}</h3>
        <p style={descriptionStyles}>{category.description}</p>
        <button
          style={exploreButtonStyles}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-3px) scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0) scale(1)";
          }}
        >
          Explore Collection →
        </button>
      </div>
    </div>
  );
};

const Designs = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    // Navigate to category-specific page
    navigate(`/category/${categoryId}`, {
      state: {
        categoryData: productCategories.find(cat => cat.id === categoryId)
      }
    });
  };

  const containerStyles = {
    minHeight: "100vh",
    padding: "1.75rem",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #334155 80%, #475569 100%)",
    position: "relative",
    backgroundAttachment: "fixed",
  };

  const backgroundPattern = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  };

  const headerSection = {
    textAlign: "center",
    marginBottom: "2rem",
    position: "relative",
    padding: "1.5rem",
    background: "#192135", /* Dark Slate Blue from Reference Image */
    borderRadius: "16px",
    backdropFilter: "blur(20px)",
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(59, 130, 246, 0.2)",
  };

  const titleStyles = {
    fontWeight: 700,
    fontSize: "2.5rem",
    marginBottom: "1rem",
    background: "linear-gradient(135deg, #fbbf24, #f59e0b)", /* Match Navbar Logo Gradient */
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    letterSpacing: "0.4px",
    lineHeight: 1.2,
    position: "relative",
  };

  const subtitleStyles = {
    fontSize: "1.1rem",
    color: "#cbd5e1",
    marginBottom: "1.75rem",
    fontWeight: 400,
    letterSpacing: "0.4px",
  };

  const accentLineStyles = {
    width: "120px",
    height: "6px",
    background: "linear-gradient(135deg, #fbbf24, #f59e0b)", /* Match Title */
    margin: "0 auto 1rem auto",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(251, 191, 36, 0.4)",
    animation: "pulse 2s ease-in-out infinite",
  };




  const gridStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "1.5rem",
    justifyItems: "center",
    alignItems: "stretch",
    maxWidth: "1500px",
    margin: "0 auto",
  };

  const keyframes = `
    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 100%; }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }

    /* Responsive Styles */
    @media (max-width: 768px) {
      /* Mobile adjustments for category cards */
      .designs-container {
        padding: 1rem !important;
      }
      
      .designs-header {
        padding: 1rem !important;
        margin-bottom: 1.5rem !important;
      }
      
      .designs-title {
        font-size: 1.8rem !important;
      }
      
      .designs-subtitle {
        font-size: 0.95rem !important;
      }
      
      /* Grid becomes single column on mobile */
      .designs-grid {
        grid-template-columns: 1fr !important;
        gap: 1rem !important;
      }
      
      /* CTA section mobile adjustments */
      .designs-cta {
        padding: 2rem 1rem !important;
        margin-top: 2rem !important;
      }
      
      .designs-cta h2 {
        font-size: 1.75rem !important;
      }
      
      .designs-cta p {
        font-size: 1rem !important;
      }
      
      .designs-cta button {
        padding: 14px 32px !important;
        font-size: 0.95rem !important;
      }
    }

    @media (max-width: 480px) {
      /* Extra small mobile devices */
      .designs-title {
        font-size: 1.5rem !important;
      }
      
      .designs-subtitle {
        font-size: 0.9rem !important;
        margin-bottom: 1rem !important;
      }
      
      .designs-cta h2 {
        font-size: 1.5rem !important;
      }
      
      .designs-cta button {
        padding: 12px 24px !important;
        font-size: 0.9rem !important;
      }
    }

    @media (min-width: 769px) and (max-width: 1024px) {
      /* Tablet adjustments */
      .designs-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
      
      .designs-title {
        font-size: 2.2rem !important;
      }
    }
  `;

  return (
    <>
      <Helmet>
        <title>Our Designs | Dream Design Carving Services</title>
        <meta name="description" content="Explore our handcrafted wood design categories — wooden doors, furniture, sculptures, decorative panels and custom designs from Nepal." />
        <meta property="og:title" content="Our Designs | Dream Design Carving Services" />
        <meta property="og:description" content="Explore handcrafted wooden doors, furniture, sculptures, decorative panels and custom designs." />
        <link rel="canonical" href="https://dream-design-carving-bnmp.vercel.app/designs" />
      </Helmet>
      <style>{keyframes}</style>
      <div className="designs-container" style={containerStyles}>
        <div style={backgroundPattern} />
        <div style={contentStyles}>
          <div className="designs-header" style={headerSection}>
            <h1 className="designs-title" style={titleStyles}>Our Design Categories</h1>
            <p className="designs-subtitle" style={subtitleStyles}>
              Explore our premium collection of handcrafted wooden creations
            </p>
            <div style={accentLineStyles} />
          </div>

          {/* Category Grid */}
          <div className="designs-grid" style={gridStyles}>
            {productCategories.map((category, idx) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={idx}
                onClick={() => handleCategoryClick(category.id)}
              />
            ))}
          </div>

          {/* Call to Action Section */}
          <div className="designs-cta" style={{
            textAlign: "center",
            marginTop: "4rem",
            padding: "4rem 2rem",
            background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
            borderRadius: "30px",
            color: "white",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}>
            <h2 style={{
              fontSize: "2.5rem",
              fontWeight: 800,
              marginBottom: "1rem",
              color: "white",
            }}>
              Don't See What You're Looking For?
            </h2>
            <p style={{
              fontSize: "1.2rem",
              marginBottom: "2rem",
              color: "#d1d5db",
              lineHeight: 1.6,
            }}>
              We specialize in custom designs tailored to your exact specifications.
              Let our master craftsmen bring your vision to life.
            </p>
            <button
              onClick={() => navigate("/order")}
              style={{
                background: "linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)", /* Deep Royal Blue Gradient */
                color: "white",
                border: "none",
                padding: "18px 48px",
                borderRadius: "50px",
                fontSize: "1.1rem",
                fontWeight: 800,
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 10px 30px -5px rgba(30, 58, 138, 0.6)",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                position: "relative",
                overflow: "hidden",
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 20px 40px -10px rgba(37, 99, 235, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 10px 30px -5px rgba(30, 58, 138, 0.6)";
              }}
            >
              Request Custom Design 💎
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Designs;