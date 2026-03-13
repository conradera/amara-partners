import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useIsMobile, useIsTablet } from '../hooks/useIsMobile';

/* ─── Team Grid with Read More ─── */
const TeamGrid: React.FC<{
  teamGrid: React.CSSProperties;
  teamCard: React.CSSProperties;
  teamCardBody: React.CSSProperties;
  teamName: React.CSSProperties;
  teamTitle: React.CSSProperties;
  teamBio: React.CSSProperties;
  teamMembers: { name: string; role: string; color: string; bio: string }[];
  isMobile?: boolean;
}> = ({ teamGrid, teamCard, teamCardBody, teamName, teamTitle, teamBio, teamMembers, isMobile }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const readMoreBtn: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: '#F47F20',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    padding: '6px 0 0',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    transition: 'color 0.2s ease',
  };

  return (
    <div style={teamGrid}>
      {teamMembers.map((member, i) => (
        <div key={member.name} style={teamCard}>
          <div
            style={{
              width: '100%',
              height: isMobile ? '160px' : '240px',
              background: `linear-gradient(135deg, ${member.color} 0%, ${member.color}CC 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div style={teamCardBody}>
            <h3 style={teamName}>{member.name}</h3>
            <div style={teamTitle}>{member.role}</div>
            {expandedIndex === i ? (
              <>
                <p style={teamBio}>{member.bio}</p>
                <button
                  style={readMoreBtn}
                  onClick={() => setExpandedIndex(null)}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#D82929'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#F47F20'; }}
                >
                  Show Less
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </button>
              </>
            ) : (
              <button
                style={readMoreBtn}
                onClick={() => setExpandedIndex(i)}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#D82929'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#F47F20'; }}
              >
                Read More
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const About: React.FC = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // ─── Styles ───────────────────────────────────────────────

  const heroSection: React.CSSProperties = {
    position: 'relative',
    background: '#043049',
    color: '#FFFFFF',
    padding: isMobile ? '60px 0 80px' : '80px 0 100px',
    overflow: 'hidden',
  };

  const heroDiagonal: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100px',
    background: '#F7F9FC',
    clipPath: 'polygon(0 60%, 100% 0, 100% 100%, 0 100%)',
  };

  const container: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: isMobile ? '0 16px' : '0 24px',
    position: 'relative',
    zIndex: 1,
  };

  const breadcrumb: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    marginBottom: '24px',
    color: 'rgba(255,255,255,0.7)',
  };

  const breadcrumbLink: React.CSSProperties = {
    color: '#F47F20',
    textDecoration: 'none',
    fontWeight: 500,
  };

  const heroHeading: React.CSSProperties = {
    fontSize: 'clamp(2rem, 1.5rem + 2vw, 3rem)',
    fontWeight: 700,
    margin: '0 0 16px',
    lineHeight: 1.15,
    letterSpacing: '-0.025em',
  };

  const heroSubtitle: React.CSSProperties = {
    fontSize: '18px',
    maxWidth: '640px',
    lineHeight: 1.625,
    fontWeight: 400,
    color: 'rgba(255,255,255,0.85)',
    margin: 0,
  };

  // Section shared
  const sectionPadding: React.CSSProperties = {
    padding: isMobile ? '50px 0' : '80px 0',
  };

  const sectionTitle: React.CSSProperties = {
    fontSize: 'clamp(1.75rem, 1.25rem + 1.5vw, 2.25rem)',
    fontWeight: 700,
    color: 'var(--foreground)',
    marginTop: 0,
    marginBottom: '16px',
    lineHeight: 1.15,
    letterSpacing: '-0.015em',
  };

  const sectionSubtitle: React.CSSProperties = {
    fontSize: '15px',
    color: 'var(--muted-foreground)',
    maxWidth: '640px',
    lineHeight: 1.625,
    fontWeight: 400,
    marginBottom: '48px',
  };

  const centeredText: React.CSSProperties = {
    textAlign: 'center' as const,
  };

  // Our Story
  const storyGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: isMobile ? '30px' : '48px',
    alignItems: 'center',
  };

  const storyText: React.CSSProperties = {
    fontSize: '15px',
    color: '#2B2B2B',
    lineHeight: 1.625,
    fontWeight: 400,
  };

  const storyImagePlaceholder: React.CSSProperties = {
    width: '100%',
    height: '400px',
    background: 'linear-gradient(135deg, #043049 0%, #065a80 100%)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255,255,255,0.4)',
    fontSize: '16px',
    fontWeight: 500,
    letterSpacing: '1px',
  };

  // Mission & Vision cards
  const mvGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: '32px',
  };

  const mvCard: React.CSSProperties = {
    background: '#FFFFFF',
    borderRadius: '12px',
    padding: isMobile ? '24px' : '40px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
    border: '1px solid rgba(0,0,0,0.05)',
  };

  const mvIconWrap: React.CSSProperties = {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    fontSize: '24px',
  };

  const mvTitle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 700,
    color: 'var(--foreground)',
    marginTop: 0,
    marginBottom: '12px',
    lineHeight: 1.25,
    letterSpacing: '-0.01em',
  };

  const mvBody: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--muted-foreground)',
    lineHeight: 1.625,
    margin: 0,
  };

  // Core Values
  const valuesGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
    gap: '24px',
  };

  const valueCard: React.CSSProperties = {
    background: '#FFFFFF',
    borderRadius: '12px',
    padding: isMobile ? '24px 16px' : '32px 24px',
    textAlign: 'center' as const,
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
    border: '1px solid rgba(0,0,0,0.05)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  };

  const valueIconWrap: React.CSSProperties = {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    background: 'rgba(4,48,73,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
    fontSize: '22px',
  };

  const valueTitle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 700,
    color: 'var(--foreground)',
    marginTop: 0,
    marginBottom: '8px',
    lineHeight: 1.25,
    letterSpacing: '-0.01em',
  };

  const valueDesc: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--muted-foreground)',
    lineHeight: 1.625,
    margin: 0,
  };

  // Leadership Team
  const teamGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)',
    gap: isMobile ? '16px' : '24px',
  };

  const teamCard: React.CSSProperties = {
    background: '#FFFFFF',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
    border: '1px solid rgba(0,0,0,0.05)',
  };

  const teamCardBody: React.CSSProperties = {
    padding: '24px',
  };

  const teamName: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 700,
    color: 'var(--foreground)',
    marginTop: 0,
    marginBottom: '4px',
    lineHeight: 1.25,
    letterSpacing: '-0.01em',
  };

  const teamTitle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 600,
    color: '#F47F20',
    marginBottom: '12px',
  };

  const teamBio: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--muted-foreground)',
    lineHeight: 1.625,
    margin: 0,
  };

  // ─── Data ─────────────────────────────────────────────────

  const coreValues = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#043049" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: 'Integrity',
      description: 'We uphold the highest ethical standards in every engagement, ensuring transparency and honesty in all our professional dealings.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#043049" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      title: 'Professional Excellence',
      description: 'We pursue mastery in our craft, delivering precise, well-researched, and thoroughly reviewed work that exceeds expectations.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#043049" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: 'Client Commitment',
      description: 'Our clients are at the centre of everything we do. We listen, understand, and tailor our solutions to meet their unique needs.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#043049" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        </svg>
      ),
      title: 'Innovation',
      description: 'We embrace modern tools and forward-thinking strategies to deliver smarter, more efficient solutions for evolving business challenges.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#043049" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      title: 'Confidentiality',
      description: 'We safeguard our clients\u2019 financial data and proprietary information with rigorous security protocols and absolute discretion.',
    },
  ];

  const teamMembers = [
    {
      name: 'Amara Oto',
      role: 'Managing Partner',
      color: '#043049',
      bio: 'Amara leads the firm with a strategic vision focused on delivering excellence in accounting and advisory services across East Africa.',
    },
    {
      name: 'Akunda Ute',
      role: 'Partner',
      color: '#D82929',
      bio: 'Akunda brings extensive expertise in audit and assurance, providing trusted advisory services to clients across diverse sectors.',
    },
    {
      name: 'Nicholas Bwebale',
      role: 'Director — Compliance',
      color: '#F47F20',
      bio: 'Nicholas oversees compliance and regulatory affairs, ensuring clients meet all statutory requirements with precision and integrity.',
    },
    {
      name: 'Bashir Kasirye',
      role: 'Associate',
      color: '#043049',
      bio: 'Bashir specialises in financial consulting and business advisory, helping businesses optimise their financial performance.',
    },
    {
      name: 'Elonebeth Nayebare',
      role: 'Associate',
      color: '#D82929',
      bio: 'Elonebeth provides expert support in tax advisory and accounting services, ensuring accuracy and compliance for all clients.',
    },
    {
      name: 'Humphrey Nuwahereza',
      role: 'Associate',
      color: '#F47F20',
      bio: 'Humphrey delivers comprehensive audit and assurance services, bringing a meticulous and detail-oriented approach to every engagement.',
    },
    {
      name: 'Peter Ruhinja',
      role: 'Associate',
      color: '#043049',
      bio: 'Peter focuses on risk management and financial reporting, helping organisations strengthen their internal controls and governance.',
    },
    {
      name: 'Violet Alinda',
      role: 'Practice Manager',
      color: '#D82929',
      bio: 'Violet manages the firm\'s day-to-day operations, ensuring seamless service delivery and exceptional client experience.',
    },
    {
      name: 'Agaba Osbert',
      role: 'Consultant',
      color: '#F47F20',
      bio: 'Agaba provides specialised consulting services in business strategy and financial planning for growing enterprises.',
    },
    {
      name: 'Conrad Gumisiriza',
      role: 'IT Support',
      color: '#043049',
      bio: 'Conrad manages the firm\'s technology infrastructure, ensuring secure and efficient systems that support the team\'s operations.',
    },
  ];

  // ─── Render ───────────────────────────────────────────────

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", color: '#2B2B2B' }}>
      <Helmet>
        <title>About Us | Amara Partners - Our Story, Mission & Team in Kampala, Uganda</title>
        <meta name="description" content="Learn about Amara Partners — a trusted accounting and advisory firm in Kampala, Uganda. Meet our team of certified accountants led by Managing Partner Amara Oto. Discover our mission, vision, and core values driving financial excellence across East Africa." />
        <meta name="keywords" content="about Amara Partners, accounting team Kampala, Amara Oto managing partner, certified accountants Uganda, accounting firm history, financial advisory team East Africa, ICPAU accountants, professional accountants Kampala, audit professionals Uganda" />
        <link rel="canonical" href="https://www.amara-partners.com/about" />
        <meta property="og:title" content="About Amara Partners | Our Story & Team" />
        <meta property="og:description" content="Meet the team behind Amara Partners. Certified accountants and advisors delivering financial excellence in Uganda." />
        <meta property="og:url" content="https://www.amara-partners.com/about" />
      </Helmet>

      {/* ═══ 1. Page Hero Banner ═══ */}
      <section style={heroSection}>
        <div style={container}>
          <nav style={breadcrumb}>
            <Link to="/" style={breadcrumbLink}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>/</span>
            <span>About Us</span>
          </nav>
          <h1 style={heroHeading}>About Amara Partners</h1>
          <p style={heroSubtitle}>
            A trusted accounting and advisory firm built on decades of experience,
            delivering clarity, confidence, and measurable results for businesses
            at every stage of growth.
          </p>
        </div>
        <div style={heroDiagonal} />
      </section>

      {/* ═══ 2. Our Story ═══ */}
      <section style={{ ...sectionPadding, background: '#F7F9FC' }}>
        <div style={container}>
          <div style={storyGrid}>
            <div>
              <h2 style={sectionTitle}>Our Story</h2>
              <p style={storyText}>
                Amara Partners was founded in 2008 with a clear purpose: to provide
                businesses with the expert financial guidance they need to thrive in
                a competitive landscape. What began as a boutique practice serving
                local enterprises has grown into a full-service accounting and
                advisory firm trusted by organisations across multiple industries.
              </p>
              <p style={storyText}>
                Over the years, we have expanded our capabilities to cover audit and
                assurance, tax planning and compliance, business advisory, and
                financial consulting. Our team of qualified professionals combines
                deep technical knowledge with practical, hands-on experience to
                deliver solutions that make a real difference.
              </p>
              <p style={storyText}>
                Today, Amara Partners serves a diverse portfolio of clients ranging
                from ambitious start-ups to established corporations, providing the
                strategic insight and reliable support that helps them navigate
                complexity and seize opportunity with confidence.
              </p>
            </div>
            <div style={storyImagePlaceholder}>
              <span>FIRM IMAGE</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. Mission & Vision ═══ */}
      <section style={{ ...sectionPadding, background: '#FFFFFF' }}>
        <div style={container}>
          <div style={centeredText}>
            <h2 style={{ ...sectionTitle, marginLeft: 'auto', marginRight: 'auto' }}>
              Mission &amp; Vision
            </h2>
            <p style={{ ...sectionSubtitle, marginLeft: 'auto', marginRight: 'auto' }}>
              The principles that guide our practice and shape the value we deliver
              to every client.
            </p>
          </div>

          <div style={mvGrid}>
            {/* Mission */}
            <div style={mvCard}>
              <div style={{ ...mvIconWrap, background: 'rgba(244,127,32,0.1)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F47F20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <h3 style={mvTitle}>Our Mission</h3>
              <p style={mvBody}>
                To deliver trusted accounting, tax, and advisory services that
                empower businesses to grow with confidence.
              </p>
            </div>

            {/* Vision */}
            <div style={mvCard}>
              <div style={{ ...mvIconWrap, background: 'rgba(4,48,73,0.08)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#043049" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 style={mvTitle}>Our Vision</h3>
              <p style={mvBody}>
                To become a leading accounting and advisory partner known for
                integrity, insight, and excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. Core Values ═══ */}
      <section style={{ ...sectionPadding, background: '#F7F9FC' }}>
        <div style={container}>
          <div style={centeredText}>
            <h2 style={{ ...sectionTitle, marginLeft: 'auto', marginRight: 'auto' }}>
              Our Core Values
            </h2>
            <p style={{ ...sectionSubtitle, marginLeft: 'auto', marginRight: 'auto' }}>
              The foundational beliefs that drive the way we work and the standards
              we hold ourselves to every day.
            </p>
          </div>

          <div style={valuesGrid}>
            {coreValues.map((value) => (
              <div key={value.title} style={valueCard}>
                <div style={valueIconWrap}>{value.icon}</div>
                <h3 style={valueTitle}>{value.title}</h3>
                <p style={valueDesc}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. Leadership Team ═══ */}
      <section style={{ ...sectionPadding, background: '#FFFFFF' }}>
        <div style={container}>
          <div style={centeredText}>
            <h2 style={{ ...sectionTitle, marginLeft: 'auto', marginRight: 'auto' }}>
              Our Team
            </h2>
            <p style={{ ...sectionSubtitle, marginLeft: 'auto', marginRight: 'auto' }}>
              Meet the dedicated professionals behind Amara Partners who deliver
              excellence in every engagement.
            </p>
          </div>

          <TeamGrid
            teamGrid={teamGrid}
            teamCard={teamCard}
            teamCardBody={teamCardBody}
            teamName={teamName}
            teamTitle={teamTitle}
            teamBio={teamBio}
            teamMembers={teamMembers}
            isMobile={isMobile}
          />
        </div>
      </section>
    </div>
  );
};

export default About;
