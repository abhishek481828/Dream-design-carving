import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/hero-image.jpg";
import imgDoor from "../assets/wooden-door.jpg";
import imgPanels from "../assets/panels.png";
import imgSculptures from "../assets/sculptures.png";
import imgFurniture from "../assets/furniture-art.png";
import imgCarving from "../assets/artisan-carving.jpg";
import imgCustom from "../assets/custom.png";
const externalGalleryImg = "https://scontent.fhyd11-3.fna.fbcdn.net/v/t39.30808-6/492365188_1211164637683717_2396547038151662709_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_ohc=zX2SJM2uZPoQ7kNvwFK8oWa&_nc_oc=Adm-7SjNFftrtHIcluY1bbT5gsZ2EEA067dUTt6ePtEhQTNrs3XzXqulrDQokPa74JI&_nc_zt=23&_nc_ht=scontent.fhyd11-3.fna&_nc_gid=oqIz6kDuVIlBpXtODq9aUA&oh=00_Afs2sGj1rS-woaF5G_PmffpjdkqrzC0Ri6zKgeIxkmyCeg&oe=69A68264";
const externalGalleryImg2 = "https://scontent.fvga5-1.fna.fbcdn.net/v/t39.30808-6/528301242_1301130708687109_3842691206521546928_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_ohc=9nLphQtNOVUQ7kNvwE_PYM4&_nc_oc=AdnxraF9Vcpa1sSkl_bQtFKEA4H1fSmvWfg4y3Iek1wERH-j0EOQtBW_6dKgyLnUvV0&_nc_zt=23&_nc_ht=scontent.fvga5-1.fna&_nc_gid=DD4tTZJEnHigYafuMZojiQ&oh=00_AfsdDgFmOUDKtG-aBBALYwk3G8Y9efOrEarNR-b49ygSoA&oe=69A678D3";
const externalGalleryImg3 = "https://scontent.fvga5-1.fna.fbcdn.net/v/t39.30808-6/489432193_1196253975841450_2643574847262086014_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=13d280&_nc_ohc=KjyVvJVuM_sQ7kNvwE55-Mt&_nc_oc=AdnTLBRZq9p20MUVGnXnG-INyzlX29G0NDULn-gD9-LPlbpze-kWJT2BKn1Lk8KWPE0&_nc_zt=23&_nc_ht=scontent.fvga5-1.fna&_nc_gid=EGGyvnkT7HuGK5tiT8MuDg&oh=00_Afu8K2Dm6sSboETdlghN6phrZmpa5bZqsDMeHMKuVx69sA&oe=69A678DF";
const externalGalleryImg4 = "https://scontent.fvga5-1.fna.fbcdn.net/v/t39.30808-6/487939942_1191077469692434_8177010171118269198_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_ohc=6QfZU9xKZwIQ7kNvwEoGTx3&_nc_oc=AdkAK0BsrP9KwvEC-cds0Kew0ssml7iLOQIolUtOOJ-FZvjLxb_PgEBj32ulgXyaW5M&_nc_zt=23&_nc_ht=scontent.fvga5-1.fna&_nc_gid=u7VfPGpexfe5rQbia_ws9w&oh=00_Aft-b1cr8GD0G9CanBVqzKGcCBK32BAveWOSUmJKOM1dKQ&oe=69A66700";
const externalGalleryImg5 = "https://scontent.fvga5-1.fna.fbcdn.net/v/t39.30808-6/483063811_1173614348105413_2231324813297771186_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_ohc=i2-keqPlpTEQ7kNvwFYGsPW&_nc_oc=Adn6CyZA5iwzkKOd5xKwz4uAdiyzrOuy8sN23BXL5pEhgEvpDBf9aBTjuN29jvF8frg&_nc_zt=23&_nc_ht=scontent.fvga5-1.fna&_nc_gid=cw4wUyEauwj4ngiJz1CDSw&oh=00_AftXeazLohMq6L_-rvjDScKcUeGd7Bu6xvs64kq-i6PsoA&oe=69A69754";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      num: "01.",
      title: "HEAVY DOORS",
      desc: "Solid teak and mahogany entries carved with modern geometric depth.",
    },
    {
      num: "02.",
      title: "CNC PANELS",
      desc: "Parametric wall coverings designed for corporate and luxury residential interiors.",
    },
    {
      num: "03.",
      title: "WOOD TOYS",
      desc: "Limited edition sculptural objects and custom corporate branding artifacts.",
    },
  ];

  return (
    <div className="ddc-home">
      <Helmet>
        <title>Dream Design | Wood Sculpting</title>
        <meta
          name="description"
          content="Premium handcrafted wooden doors, CNC panels, and sculptural objects from Dream Design Carving Services. Where nature meets machine precision."
        />
        <meta property="og:title" content="Dream Design | Wood Sculpting" />
        <meta
          property="og:description"
          content="Where the fiber of nature meets the precision of the machine."
        />
        <link rel="canonical" href="https://dream-design-carving-bnmp.vercel.app/" />
      </Helmet>

      {/* ── HERO ── */}
      <main className="ddc-main">
        <section className="ddc-hero">
          {/* Left column */}
          <div className="ddc-hero-left">
            <div className="ddc-vertical-label">Established 2024</div>
            <div className="ddc-hero-brand">DD.CARVING</div>
            <h1 className="ddc-hero-heading">
              BESPOKE
              <br />
              WOOD
              <br />
              CRAFT
            </h1>
            <p className="ddc-hero-sub">
              Handcrafted doors, CNC panels &amp; sculptural objects — where
              tradition meets machine precision.
            </p>
          </div>

          {/* Right column */}
          <div className="ddc-hero-right">
            <div className="ddc-slab">
              <div className="ddc-image-placeholder">
                <img src={heroImage} alt="Dream Design Carving Hero" className="ddc-hero-img" />
                <div className="ddc-image-overlay" />
                <div className="ddc-image-caption">
                  <p className="ddc-caption-label">DREAM DESIGN CARVING SERVICES</p>
                  <p className="ddc-caption-quote">
                    "Where the fiber of nature meets the precision of the machine."
                  </p>
                </div>
              </div>
            </div>

            <div className="ddc-hero-actions">
              <button
                className="ddc-cta-btn"
                onClick={() => navigate("/order")}
              >
                RESERVE A CUSTOM PIECE
              </button>
              <div className="ddc-scroll-hint">
                <span className="ddc-accent-dot" />
                <span className="ddc-scroll-label">SCROLL TO UNLAYER</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="ddc-gallery">
          <div className="ddc-gallery-header">
            <span className="ddc-gallery-label">OUR WORK</span>
            <h2 className="ddc-gallery-title">Crafted with Purpose</h2>
            <p className="ddc-gallery-sub">
              Every piece is a collaboration between artisan skill and modern engineering.
            </p>
          </div>
          <div className="ddc-gallery-grid">
            <div className="ddc-gallery-tile ddc-tile-tall">
              <img src={externalGalleryImg2} alt="Gallery Highlight 2" />
              <div className="ddc-tile-label">Gallery Highlight 2</div>
            </div>
            <div className="ddc-gallery-tile">
              <img src={externalGalleryImg3} alt="Gallery Highlight 3" />
              <div className="ddc-tile-label">Gallery Highlight 3</div>
            </div>
            <div className="ddc-gallery-tile">
              <img src={externalGalleryImg} alt="Gallery Highlight" />
              <div className="ddc-tile-label">Gallery Highlight</div>
            </div>
            <div className="ddc-gallery-tile ddc-tile-wide">
              <img src={externalGalleryImg4} alt="Gallery Highlight 4" />
              <div className="ddc-tile-label">Gallery Highlight 4</div>
            </div>
            <div className="ddc-gallery-tile">
              <img src={imgCarving} alt="Artisan Carving" />
              <div className="ddc-tile-label">Artisan Carving</div>
            </div>
            <div className="ddc-gallery-tile">
              <img src="https://scontent.fvga5-1.fna.fbcdn.net/v/t39.30808-6/483063811_1173614348105413_2231324813297771186_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_ohc=i2-keqPlpTEQ7kNvwFYGsPW&_nc_oc=Adn6CyZA5iwzkKOd5xKwz4uAdiyzrOuy8sN23BXL5pEhgEvpDBf9aBTjuN29jvF8frg&_nc_zt=23&_nc_ht=scontent.fvga5-1.fna&_nc_gid=cw4wUyEauwj4ngiJz1CDSw&oh=00_AftXeazLohMq6L_-rvjDScKcUeGd7Bu6xvs64kq-i6PsoA&oe=69A69754" alt="Gallery Highlight 5" />
              <div className="ddc-tile-label">Gallery Highlight 5</div>
            </div>
          </div>
        </section>

        {/* ── BRAND PILLARS ── */}
        <section className="ddc-pillars">

          {/* Objectives */}
          <div className="ddc-pillar-block">
            <div className="ddc-pillar-header">
              <span className="ddc-pillar-tag">01 — VISION</span>
              <h2 className="ddc-pillar-heading">Our Objectives</h2>
            </div>
            <div className="ddc-pillar-box">
              <ul className="ddc-pillar-list">
                <li><span className="ddc-pillar-dot">◈</span>Preserve and enhance heritage with modern innovation</li>
                <li><span className="ddc-pillar-dot">◈</span>Craft functional art blending utility and beauty</li>
                <li><span className="ddc-pillar-dot">◈</span>Deliver unique, elegant, and custom designs</li>
                <li><span className="ddc-pillar-dot">◈</span>Provide lasting luxury for every space</li>
              </ul>
            </div>
          </div>

          <div className="ddc-pillar-divider" />

          {/* Goals */}
          <div className="ddc-pillar-block ddc-pillar-block--alt">
            <div className="ddc-pillar-header">
              <span className="ddc-pillar-tag">02 — MISSION</span>
              <h2 className="ddc-pillar-heading">Our Goals</h2>
            </div>
            <div className="ddc-pillar-box">
              <ul className="ddc-pillar-list">
                <li><span className="ddc-pillar-dot">◆</span>Blend tradition with innovation using CNC technology</li>
                <li><span className="ddc-pillar-dot">◆</span>Ensure high-quality craftsmanship and durability</li>
                <li><span className="ddc-pillar-dot">◆</span>Offer personalized, bespoke creations</li>
                <li><span className="ddc-pillar-dot">◆</span>Infuse warmth and sophistication into every piece</li>
              </ul>
            </div>
          </div>

          <div className="ddc-pillar-divider" />

          {/* Competitive Advantage */}
          <div className="ddc-pillar-block">
            <div className="ddc-pillar-header">
              <span className="ddc-pillar-tag">03 — EDGE</span>
              <h2 className="ddc-pillar-heading">Our Competitive Advantage</h2>
            </div>
            <div className="ddc-pillar-box">
              <ul className="ddc-pillar-list ddc-pillar-list--advantage">
                <li>
                  <span className="ddc-pillar-dot ddc-pillar-dot--roman">I</span>
                  <span><strong>Heritage Meets Technology</strong> — Modern precision fused with classic artistry for timeless results.</span>
                </li>
                <li>
                  <span className="ddc-pillar-dot ddc-pillar-dot--roman">II</span>
                  <span><strong>Superior Craftsmanship</strong> — Premium materials and expert detailing in every single piece.</span>
                </li>
                <li>
                  <span className="ddc-pillar-dot ddc-pillar-dot--roman">III</span>
                  <span><strong>Exclusive Customization</strong> — Tailor-made creations designed entirely around your personal style.</span>
                </li>
                <li>
                  <span className="ddc-pillar-dot ddc-pillar-dot--roman">IV</span>
                  <span><strong>Timeless Elegance</strong> — Artistic masterpieces crafted to elevate and enrich any space.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="ddc-services">
          {services.map((s, i) => (
            <div className="ddc-service-card" key={i}>
              <div className="ddc-service-num">{s.num}</div>
              <h3 className="ddc-service-title">{s.title}</h3>
              <p className="ddc-service-desc">{s.desc}</p>
              <div className="ddc-service-line" />
            </div>
          ))}
        </section>
      </main>

    </div>
  );
}
