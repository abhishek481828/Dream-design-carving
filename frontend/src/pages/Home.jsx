import React, { useEffect, useState } from "react";
import "./Home.css";
import heroImage from "../assets/hero-image.jpg";
import photo5 from "../assets/photo5.png";
import artisanCarving from "../assets/artisan-carving.jpg";

export default function Home() {
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(null);

  // Animated stats (if you add stats cards in future)
  useEffect(() => {
    document.querySelectorAll('.stat-number').forEach(el => {
      let start = 0;
      const end = +el.getAttribute('data-target');
      const duration = 1200;
      let startTime;
      function animateCount(time) {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        el.textContent = Math.floor(progress * (end - start) + start) + (el.textContent.endsWith("+") ? "+" : "");
        if (progress < 1) requestAnimationFrame(animateCount);
      }
      if (end) requestAnimationFrame(animateCount);
    });
  }, []);

  return (
    <div className="home-different">
      {/* Split Hero Section */}
      <section className="split-hero">
        <div className="split-hero-left animated-fadein">
          <h1>
            <span className="split-hero-main animated-text-gradient">Dream Design Carving</span>
            <br />
            <span className="split-hero-sub animated-slidein">Services Pvt. Ltd.</span>
          </h1>
          <p className="split-hero-tagline animated-reveal">
            Exquisite <span className="highlight">artistry</span> meets <span className="highlight">modern innovation</span> in every creation.
          </p>
        </div>
        <div className="split-hero-right parallax-hero">
          <img src={heroImage} alt="Dream Design Carving Hero" />
        </div>
      </section>

      {/* Floating Card Section */}
      <section className="floating-card-section">
        <div className="floating-card animated-bounce">
          <img src={photo5} alt="Artistic Masterpiece" />
          <div>
            <h2>Timeless Elegance & Artistic Expression</h2>
            <p>
              Blending <b>intricate detailing</b>, <b>artistic expression</b>, and <b>timeless elegance</b>, Dream Design Carving transforms furniture into masterpieces. Inspired by history, we merge tradition and CNC/laser technology, preserving hand-carved beauty with modern precision.
            </p>
          </div>
        </div>
      </section>

      {/* Alternating Info Blocks */}
      <section className="alt-section alt-bg">
        <div className="alt-content">
          <div className="alt-text">
            <h2>Artisan Carving</h2>
            <p>
              Carving is an ancient art, practiced for millennia. Our artisans shape wood, bone, ivory, and synthetics into detailed patterns and designs, elevating every piece with beauty and meaning.
            </p>
          </div>
          <img src={artisanCarving} alt="Artisan Carving" className="alt-img" />
        </div>
      </section>

      {/* Vertical Info Cards */}
      <section className="vertical-cards-section">
        <div className="vertical-card">
          <h3>Our Objectives</h3>
          <ul>
            <li>Preserve and enhance heritage with modern innovation</li>
            <li>Craft functional art blending utility and beauty</li>
            <li>Deliver unique, elegant, and custom designs</li>
            <li>Provide lasting luxury for every space</li>
          </ul>
        </div>
        <div className="vertical-card">
          <h3>Our Goals</h3>
          <ul>
            <li>Blend tradition with innovation using CNC technology</li>
            <li>Ensure high-quality craftsmanship and durability</li>
            <li>Offer personalized, bespoke creations</li>
            <li>Infuse warmth and sophistication into every piece</li>
          </ul>
        </div>
        <div className="vertical-card">
          <h3>Our Competitive Advantage</h3>
          <ul>
            <li><b>Heritage Meets Technology:</b> Modern precision, classic artistry</li>
            <li><b>Superior Craftsmanship:</b> Premium materials, expert detailing</li>
            <li><b>Exclusive Customization:</b> Tailor-made for your style</li>
            <li><b>Timeless Elegance:</b> Artistic masterpieces for your space</li>
          </ul>
        </div>
      </section>

      {/* FAQ Accordion Example */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          <div className={`faq-item${openFaq === 0 ? " open" : ""}`} onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}>
            <h4>Do you offer fully custom designs?</h4>
            <div className="faq-answer">
              Yes! We specialize in bespoke furniture and carving, tailored to your vision and space.
            </div>
          </div>
          <div className={`faq-item${openFaq === 1 ? " open" : ""}`} onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}>
            <h4>What materials do you work with?</h4>
            <div className="faq-answer">
              We work with wood, Corian, acrylic, stone, granite, PVC/WPC, and more. We can recommend the best material for your needs.
            </div>
          </div>
          <div className={`faq-item${openFaq === 2 ? " open" : ""}`} onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}>
            <h4>How long does a project take?</h4>
            <div className="faq-answer">
              Project timelines depend on complexity and scale. Most custom pieces are completed within 2-6 weeks.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
