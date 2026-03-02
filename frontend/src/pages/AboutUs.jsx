import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { FaHammer, FaDraftingCompass, FaLeaf, FaHandsHelping } from 'react-icons/fa';
import photo2 from '../assets/photo2.jpeg';
import kundan from '../assets/kundan.jpeg';
import vijay from '../assets/vijay.jpeg';
import niranjan from '../assets/Niranjan.jpg';
import './AboutUs.css';

const values = [
  {
    icon: <FaHammer className="about-value-icon" />,
    title: 'Master Craftsmanship',
    desc: 'We honor the material. Every cut, curve, and contour is executed with obsessive attention to detail.',
  },
  {
    icon: <FaDraftingCompass className="about-value-icon" />,
    title: 'Bespoke Design',
    desc: 'Your home is unique. Our designs are too — tailored specifically to your taste and architectural style.',
  },
  {
    icon: <FaLeaf className="about-value-icon" />,
    title: 'Sustainable Quality',
    desc: 'We source premium, sustainable timber that ensures your investment lasts for generations.',
  },
  {
    icon: <FaHandsHelping className="about-value-icon" />,
    title: 'Integrity First',
    desc: 'Transparent pricing, honest timelines, and a commitment to delivering exactly what was promised.',
  },
];

const team = [
  { name: 'Kundan Thakur', role: 'Lead Designer', image: kundan },
  { name: 'Vijay Kant Thakur', role: 'Marketing Director', image: vijay },
  { name: 'Niranjan Mahato', role: 'Co-worker', image: niranjan },
];

const stats = [
  { num: '5+', label: 'Years of Excellence' },
  { num: '200+', label: 'Projects Completed' },
  { num: '100%', label: 'Handcrafted' },
  { num: '24h', label: 'Quote Response' },
];

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <Helmet>
        <title>About Us | Dream Design Carving Services</title>
        <meta name="description" content="Learn about Dream Design Carving Services Pvt. Ltd. — our story, our craftsmen, and our passion for handcrafted wood art since 2019." />
        <meta property="og:title" content="About Us | Dream Design Carving Services" />
        <meta property="og:description" content="Our story, our craftsmen, and our passion for handcrafted wood art since 2019." />
        <link rel="canonical" href="https://dream-design-carving-bnmp.vercel.app/about" />
      </Helmet>

      {/* ── Hero ── */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <span className="about-hero-tag">Since 2019</span>
          <h1 className="about-hero-title">
            Carving Excellence<br /><span>Since 2019</span>
          </h1>
          <p className="about-hero-sub">
            At Dream Design Carving, we don't just shape wood — we shape legacies.
            Blending age-old artistry with cutting-edge precision to create masterpieces for your home.
          </p>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <div className="about-stats">
        {stats.map((s) => (
          <div className="about-stat" key={s.label}>
            <span className="about-stat-num">{s.num}</span>
            <span className="about-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Story ── */}
      <div className="about-story">
        <div className="about-story-content">
          <span className="about-tag">Our Story</span>
          <h2>Our Journey</h2>
          <h3>From Passion to Precision</h3>
          <p>
            It started in a modest workshop with a simple belief: wood has a soul.
            What began as a passion for traditional carving has evolved into Dream Design Carving,
            a premier studio where technology meets tradition.
          </p>
          <p>
            We realised that while modern CNC machines offer precision, the human touch provides the spirit.
            Today, we combine both — our designs are digitally perfected but finished by hand, ensuring
            that every door, panel, and sculpture we produce is not just a product, but a piece of art.
          </p>
        </div>
        <div className="about-story-img-wrap">
          <img src={photo2} alt="Artisan at work" className="about-story-img" />
          <div className="about-story-badge">
            <span className="about-badge-num">5+</span>
            <span className="about-badge-label">Years of Excellence</span>
          </div>
        </div>
      </div>

      {/* ── Values ── */}
      <div className="about-values">
        <div className="about-section-header">
          <span className="about-tag">Standards</span>
          <h2>The Dream Design Standard</h2>
        </div>
        <div className="about-values-grid">
          {values.map((v) => (
            <div className="about-value-card" key={v.title}>
              {v.icon}
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Team ── */}
      <div className="about-team">
        <div className="about-section-header">
          <span className="about-tag">The Team</span>
          <h2>Meet The Visionaries</h2>
        </div>
        <div className="about-team-grid">
          {team.map((member) => (
            <div className="about-team-card" key={member.name}>
              <div className="about-team-img-wrap">
                <img src={member.image} alt={member.name} loading="lazy" />
              </div>
              <div className="about-team-info">
                <h3 className="about-team-name">{member.name}</h3>
                <p className="about-team-role">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="about-cta">
        <div className="about-cta-text">
          <h2>Ready to Transform<br />Your Space?</h2>
          <p>
            Whether it's a grand entrance door or a detailed wall panel,
            let's craft something extraordinary together.
          </p>
        </div>
        <button className="about-cta-btn" onClick={() => navigate('/order')}>
          Start Your Project
        </button>
      </div>
    </div>
  );
}
