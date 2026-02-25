import React from 'react';
import { Helmet } from 'react-helmet-async';
import './AboutUs.css';
import { FaHammer, FaDraftingCompass, FaLeaf, FaHandsHelping } from 'react-icons/fa';
import photo2 from '../assets/photo2.jpeg';
import kundan from '../assets/kundan.jpeg';
import vijay from '../assets/vijay.jpeg';
import niranjan from '../assets/Niranjan.jpg';

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Kundan Thakur",
      role: "Lead Designer",
      image: kundan
    },
    {
      name: "Vijay Kant Thakur",
      role: "Marketing Director",
      image: vijay
    },
    {
      name: "Niranjan Mahato",
      role: "Co-worker",
      image: niranjan
    }
  ];

  return (
    <div className="about-container">
      <Helmet>
        <title>About Us | Dream Design Carving Services</title>
        <meta name="description" content="Learn about Dream Design Carving Services Pvt. Ltd. — our story, our craftsmen, and our passion for handcrafted wood art since 2019." />
        <meta property="og:title" content="About Us | Dream Design Carving Services" />
        <meta property="og:description" content="Our story, our craftsmen, and our passion for handcrafted wood art since 2019." />
        <link rel="canonical" href="https://dream-design-carving-bnmp.vercel.app/about" />
      </Helmet>
      {/* Hero Section */}}
      <section className="about-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Carving Excellence <br /> <span>Since 2019</span>
          </h1>
          <p className="hero-subtitle">
            At Dream Design Carving, we don't just shape wood; we shape legacies.
            Blending age-old artistry with cutting-edge precision to create masterpieces for your home.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <div className="story-bg">
        <section className="section">
          <div className="story-grid">
            <div className="story-content">
              <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 2rem 0' }}>Our Journey</h2>
              <h3>From Passion to Precision</h3>
              <p>
                It started in a modest workshop with a simple belief: wood has a soul.
                What began as a passion for traditional carving has evolved into Dream Design Carving,
                a premier studio where technology meets tradition.
              </p>
              <p>
                We realized that while modern CNC machines offer precision, the human touch provides the spirit.
                Today, we combine both. Our designs are digitally perfected but finished by hand, ensuring
                that every door, panel, and sculpture we produce is not just a product, but a piece of art.
              </p>
            </div>
            <div className="story-image-container">
              <img
                src={photo2}
                alt="Artisan at work"
                className="story-image"
              />
              <div className="story-badge">
                <span className="badge-number">5+</span>
                <span className="badge-text">Years of Excellence</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Values Section */}
      <div className="values-bg">
        <section className="section" style={{ padding: '0 2rem' }}>
          <h2 className="section-title" style={{ color: 'white' }}>The Dream Design Standard</h2>
          <div className="values-grid">
            <div className="value-card">
              <FaHammer className="value-icon" />
              <h3>Master Craftsmanship</h3>
              <p>We honor the material. Every cut, curve, and contour is executed with obsessive attention to detail.</p>
            </div>
            <div className="value-card">
              <FaDraftingCompass className="value-icon" />
              <h3>Bespoke Design</h3>
              <p>Your home is unique. Our designs are too. tailored specifically to your taste and architectural style.</p>
            </div>
            <div className="value-card">
              <FaLeaf className="value-icon" />
              <h3>Sustainable Quality</h3>
              <p>We source premium, sustainable timber that ensures your investment lasts for generations.</p>
            </div>
            <div className="value-card">
              <FaHandsHelping className="value-icon" />
              <h3>Integrity First</h3>
              <p>Transparent pricing, honest timelines, and a commitment to delivering exactly what was promised.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Team Section */}
      <section className="section">
        <h2 className="section-title">Meet The Visionaries</h2>
        <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', color: '#64748b' }}>
          Behind every masterpiece is a team of dedicated artisans and designers driven by a shared passion for perfection.
        </p>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-avatar-container">
                <img src={member.image} alt={member.name} className="team-avatar" />
              </div>
              <div className="team-info">
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Space?</h2>
          <p>Whether it's a grand entrance door or a detailed wall panel, let's craft something extraordinary together.</p>
          <a href="/contact" className="cta-btn">Start Your Project</a>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
