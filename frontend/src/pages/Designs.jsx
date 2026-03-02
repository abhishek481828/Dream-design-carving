import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import imgDoor from "../assets/wooden-door.jpg";
import imgCarving from "../assets/artisan-carving.jpg";
import imgFurniture from "../assets/furniture-art.png";
import imgSculptures from "../assets/sculptures.png";
import imgPanels from "../assets/panels.png";
import imgCustom from "../assets/custom.png";

import "./Designs.css";

const categories = [
  {
    id: "doors",
    num: "01",
    name: "Wooden Doors",
    desc: "Solid teak and mahogany entries carved with modern geometric depth and traditional artistry.",
    img: "https://scontent.fvga5-1.fna.fbcdn.net/v/t39.30808-6/528301242_1301130708687109_3842691206521546928_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_ohc=9nLphQtNOVUQ7kNvwE_PYM4&_nc_oc=AdnxraF9Vcpa1sSkl_bQtFKEA4H1fSmvWfg4y3Iek1wERH-j0EOQtBW_6dKgyLnUvV0&_nc_zt=23&_nc_ht=scontent.fvga5-1.fna&_nc_gid=DD4tTZJEnHigYafuMZojiQ&oh=00_AfsdDgFmOUDKtG-aBBALYwk3G8Y9efOrEarNR-b49ygSoA&oe=69A678D3",
  },
  {
    id: "temples",
    num: "02",
    name: "Modern Temples",
    desc: "Devotional pieces blending heritage spirituality with precision CNC craftsmanship.",
    img: imgCarving,
  },
  {
    id: "furniture",
    num: "03",
    name: "Furniture Art",
    desc: "Bespoke furniture designed as functional art for luxury residential and corporate spaces.",
    img: "https://scontent.fvga5-1.fna.fbcdn.net/v/t39.30808-6/489081190_1196254282508086_2323881067871265785_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=13d280&_nc_ohc=pvr1JupJF_MQ7kNvwFq4NjB&_nc_oc=AdmnzCvVgdL6dUZYTeH9ZckkAYv2eaopfwbFjFjMD6SiafIMihD9dbM5b1_23IsfuNg&_nc_zt=23&_nc_ht=scontent.fvga5-1.fna&_nc_gid=X8UKngQ-ZsHsHq2v7NDofA&oh=00_Afsn532YdaGtzshUjQWtnRDfehyomYVg80a9FJ71Pl6MMw&oe=69A66A70",
  },
  {
    id: "sculptures",
    num: "04",
    name: "Sculptures",
    desc: "Three-dimensional wooden art and decorative sculptures crafted for statement spaces.",
    img: "https://scontent.fvga5-1.fna.fbcdn.net/v/t39.30808-6/493345389_1215902683876579_2845252487506167755_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_ohc=lIOz2I5pYHoQ7kNvwFmPUZr&_nc_oc=AdnMfpamzy8HWRH9XVM-b1xkU08tzqSkRqH8cMjKZ3QAdKUuIg6_vbPuj2Ag966dGyM&_nc_zt=23&_nc_ht=scontent.fvga5-1.fna&_nc_gid=OGl5gVis9EUS4Te_QUX6OA&oh=00_AfsB4oFIWzry01wi1H4OML6C1L2cyZ92yBnX8InfDjLGog&oe=69A68E8A",
  },
  {
    id: "panels",
    num: "05",
    name: "Decorative Panels",
    desc: "Parametric CNC wall coverings and room dividers — precision-cut for modern interiors.",
    img: "https://scontent.fhyd11-1.fna.fbcdn.net/v/t1.6435-9/152397419_474024303972444_1227292069713855013_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=13d280&_nc_ohc=U9JltHlVC_oQ7kNvwG53YhK&_nc_oc=AdmklCGPTT4X9kK41l0owTAmcMR1L-i5KEWcDMkNQNkC0bt0JuXSHv2YGhr2Kd4Wa2U&_nc_zt=23&_nc_ht=scontent.fhyd11-1.fna&_nc_gid=eZ08dTmGAF_snhPe2of1Rw&oh=00_AfsFYBKyW89sEm2uHcqfFc6s-bneoQyclpfVCfhXvNyl6Q&oe=69C81D0E",
  },
  {
    id: "custom",
    num: "06",
    name: "Custom Designs",
    desc: "Fully bespoke creations tailored to your vision, dimensions, and spatial requirements.",
    img: "https://scontent.fvga5-1.fna.fbcdn.net/v/t39.30808-6/483101905_1173614291438752_2951386208399336472_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_ohc=3L8yEEtdxbMQ7kNvwGuWpNU&_nc_oc=AdnEqAGYT7yVZ2e9SQMfAYv4ew9LRnkaPhjSHXeG1y9P5sysqD01rnveWjP_353pTo4&_nc_zt=23&_nc_ht=scontent.fvga5-1.fna&_nc_gid=SSOk6uUEqEOG4ojz2W9p_A&oh=00_AfsCTG4XqBMZ1ecuuM-pTzaXq6P1JHNviELyzvdubwls5w&oe=69A671D6",
  },
];

export default function Designs() {
  const navigate = useNavigate();

  return (
    <div className="designs-page">
      <Helmet>
        <title>Our Designs | Dream Design Carving Services</title>
        <meta
          name="description"
          content="Explore our handcrafted wood design categories — wooden doors, furniture, sculptures, decorative panels and custom designs."
        />
        <meta property="og:title" content="Our Designs | Dream Design Carving Services" />
        <meta
          property="og:description"
          content="Explore handcrafted wooden doors, furniture, sculptures, panels and custom designs."
        />
        <link rel="canonical" href="https://dream-design-carving-bnmp.vercel.app/designs" />
      </Helmet>

      {/* ── Header ── */}
      <div className="designs-header">
        <div className="designs-header-left">
          <span className="designs-tag">Collections</span>
          <h1 className="designs-title">Our Design<br />Categories</h1>
        </div>
        <div className="designs-header-right">
          <p className="designs-desc">
            Explore our premium collection of handcrafted and CNC-precision wooden
            creations — each piece a blend of heritage artistry and modern engineering.
          </p>
          <div className="designs-stats">
            <div className="designs-stat">
              <span className="designs-stat-num">6+</span>
              <span className="designs-stat-label">Categories</span>
            </div>
            <div className="designs-stat">
              <span className="designs-stat-num">100%</span>
              <span className="designs-stat-label">Handcrafted</span>
            </div>
            <div className="designs-stat">
              <span className="designs-stat-num">24h</span>
              <span className="designs-stat-label">Quote Response</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Category Grid ── */}
      <div className="designs-grid">
        {categories.map((cat) => (
          <div
            className="designs-card"
            key={cat.id}
            onClick={() =>
              navigate(`/category/${cat.id}`, { state: { categoryData: cat } })
            }
          >
            {/* Image */}
            <div className="designs-card-img-wrap">
              <img src={cat.img} alt={cat.name} loading="lazy" />
              <div className="designs-card-img-overlay" />
              <span className="designs-card-badge">{cat.num}</span>
            </div>

            {/* Body */}
            <div className="designs-card-body">
              <h3 className="designs-card-name">{cat.name}</h3>
              <p className="designs-card-desc">{cat.desc}</p>
              <div className="designs-card-footer">
                <div className="designs-card-explore">
                  Explore Collection
                  <span className="designs-card-explore-arrow">→</span>
                </div>
                <div className="designs-card-dot" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Divider ── */}
      <div className="designs-section-divider" />

      {/* ── CTA Banner ── */}
      <div className="designs-cta">
        <div className="designs-cta-text">
          <h2>Don't See What You're<br />Looking For?</h2>
          <p>
            We specialise in fully custom designs tailored to your exact specifications.
            Let our master craftsmen bring your vision to life — from concept to creation.
          </p>
        </div>
        <div className="designs-cta-actions">
          <button className="designs-cta-btn" onClick={() => navigate("/order")}>
            Request Custom Design
          </button>
          <span className="designs-cta-note">Response within 24 hours</span>
        </div>
      </div>
    </div>
  );
}