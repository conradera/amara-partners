import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useIsMobile, useIsTablet } from '../hooks/useIsMobile';

/* ─── Spotlight Fan Team Component ─── */
const TeamSpotlight: React.FC<{
  teamMembers: { name: string; role: string; color: string; bio: string; initials: string; photo?: string }[];
  isMobile?: boolean;
}> = ({ teamMembers, isMobile }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const total = teamMembers.length;

  /* Compute offset of each member relative to active (wrapping) */
  const getOffset = (i: number) => {
    let diff = i - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const prev = () => setActiveIndex((activeIndex - 1 + total) % total);
  const next = () => setActiveIndex((activeIndex + 1) % total);

  /* Style per offset position */
  const memberStyle = (offset: number): React.CSSProperties => {
    const abs = Math.abs(offset);
    if (abs > 2) return { display: 'none' };

    const configs: Record<number, {
      x: number; scale: number; zIndex: number; opacity: number; blur: number;
    }> = {
      0: { x: 0, scale: 1, zIndex: 10, opacity: 1, blur: 0 },
      1: { x: 230, scale: 0.78, zIndex: 7, opacity: 0.75, blur: 0 },
      2: { x: 410, scale: 0.60, zIndex: 5, opacity: 0.50, blur: 1 },
    };

    const cfg = configs[abs];
    const translateX = offset < 0 ? -cfg.x : cfg.x;

    return {
      position: 'absolute' as const,
      top: offset === 0 ? '0px' : `${30 + (abs - 1) * 24}px`,
      left: '50%',
      transform: `translateX(calc(-50% + ${translateX}px)) scale(${cfg.scale})`,
      zIndex: cfg.zIndex,
      opacity: cfg.opacity,
      filter: offset !== 0 ? `grayscale(100%) blur(${cfg.blur}px)` : 'none',
      transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
      cursor: offset !== 0 ? 'pointer' : 'default',
      width: isMobile ? '180px' : '280px',
      transformOrigin: 'top center',
    };
  };

  const active = teamMembers[activeIndex];
  const cardH = isMobile ? 260 : 380;

  return (
    <div style={{ width: '100%' }}>
      {/* Fan stage */}
      <div style={{
        position: 'relative',
        height: isMobile ? `${cardH + 60}px` : `${cardH + 80}px`,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}>
        {teamMembers.map((member, i) => {
          const offset = getOffset(i);
          const abs = Math.abs(offset);
          if (abs > 2) return null;

          return (
            <div
              key={member.name}
              style={memberStyle(offset)}
              onClick={() => { if (offset !== 0) setActiveIndex(i); }}
            >
              {/* Photo area */}
              <div style={{
                width: '100%',
                height: `${cardH}px`,
                background: `linear-gradient(160deg, ${member.color} 0%, ${member.color}99 100%)`,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: offset === 0
                  ? '0 24px 60px rgba(0,0,0,0.28)'
                  : '0 8px 24px rgba(0,0,0,0.15)',
              }}>
                {/* Photo or Placeholder */}
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      display: 'block',
                    }}
                  />
                ) : (
                  <div style={{
                    textAlign: 'center',
                    opacity: 0.6,
                    transform: offset === 0 ? 'scale(1)' : 'scale(0.8)',
                    transition: 'transform 0.5s ease',
                  }}>
                    <svg width={isMobile ? "80" : "120"} height={isMobile ? "80" : "120"} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <div style={{
                      marginTop: '8px',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: 'rgba(255,255,255,0.4)',
                      letterSpacing: '0.1em',
                    }}>
                      {member.initials}
                    </div>
                  </div>
                )}

                {/* Name card overlay at bottom */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'rgba(15,15,15,0.88)',
                  backdropFilter: 'blur(6px)',
                  padding: offset === 0
                    ? (isMobile ? '16px 20px' : '22px 28px')
                    : (isMobile ? '12px 14px' : '16px 18px'),
                  borderBottomLeftRadius: '16px',
                  borderBottomRightRadius: '16px',
                }}>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: offset === 0
                      ? (isMobile ? '16px' : '20px')
                      : (isMobile ? '12px' : '14px'),
                    color: '#FFFFFF',
                    lineHeight: 1.2,
                    marginBottom: '4px',
                    letterSpacing: '-0.01em',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {member.name}
                  </div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: offset === 0
                      ? (isMobile ? '11px' : '14px')
                      : (isMobile ? '10px' : '11px'),
                    color: '#F47F20',
                    fontWeight: 600,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {member.role}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bio + Nav */}
      <div style={{
        maxWidth: '560px',
        margin: '0 auto',
        textAlign: 'center' as const,
        padding: isMobile ? '24px 16px 0' : '32px 24px 0',
      }}>
        <p style={{
          fontSize: isMobile ? '14px' : '15px',
          color: 'var(--muted-foreground)',
          lineHeight: 1.7,
          fontFamily: "'Inter', sans-serif",
          marginBottom: '28px',
          minHeight: isMobile ? '60px' : '72px',
          transition: 'opacity 0.3s ease',
        }}>
          {active.bio}
        </p>

        {/* Navigation dots + arrows */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
        }}>
          {/* Prev arrow */}
          <button
            onClick={prev}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '2px solid var(--light-gray)',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = '#F47F20';
              (e.currentTarget as HTMLElement).style.background = '#F47F20';
              (e.currentTarget as HTMLElement).style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--light-gray)';
              (e.currentTarget as HTMLElement).style.background = '#fff';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {teamMembers.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                style={{
                  width: i === activeIndex ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  border: 'none',
                  background: i === activeIndex ? '#F47F20' : 'var(--light-gray)',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>

          {/* Next arrow */}
          <button
            onClick={next}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '2px solid var(--light-gray)',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = '#F47F20';
              (e.currentTarget as HTMLElement).style.background = '#F47F20';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--light-gray)';
              (e.currentTarget as HTMLElement).style.background = '#fff';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
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
      name: 'Peter Ruhinja',
      role: 'Associate',
      color: '#043049',
      initials: 'PR',
      photo: '/team-peter.jpg',
      bio: 'Peter focuses on risk management and financial reporting, helping organisations strengthen their internal controls and governance.',
    },
    {
      name: 'Conrad Gumisiriza',
      role: 'IT Support',
      color: '#043049',
      initials: 'CG',
      photo: '/team-conrad.jpg',
      bio: 'Conrad manages the firm\'s technology infrastructure, ensuring secure and efficient systems that support the team\'s operations.',
    },
    {
      name: 'Amara Oto',
      role: 'Managing Partner',
      color: '#043049',
      initials: 'AO',
      bio: 'Amara leads the firm with a strategic vision focused on delivering excellence in accounting and advisory services across East Africa.',
    },
    {
      name: 'Akunda Ute',
      role: 'Partner',
      color: '#D82929',
      initials: 'AU',
      photo: '/team-ute.jpg',
      bio: 'Akunda brings extensive expertise in audit and assurance, providing trusted advisory services to clients across diverse sectors.',
    },
    {
      name: 'Nicholas Bwebale',
      role: 'Director — Compliance',
      color: '#F47F20',
      initials: 'NB',
      bio: 'Nicholas oversees compliance and regulatory affairs, ensuring clients meet all statutory requirements with precision and integrity.',
    },
    {
      name: 'Bashir Kasirye',
      role: 'Associate',
      color: '#043049',
      initials: 'BK',
      bio: 'Bashir specialises in financial consulting and business advisory, helping businesses optimise their financial performance.',
    },
    {
      name: 'Humphrey Nuwahereza',
      role: 'Associate',
      color: '#F47F20',
      initials: 'HN',
      bio: 'Humphrey delivers comprehensive audit and assurance services, bringing a meticulous and detail-oriented approach to every engagement.',
    },
    {
      name: 'Violet Alinda',
      role: 'Practice Manager',
      color: '#D82929',
      initials: 'VA',
      bio: 'Violet manages the firm\'s day-to-day operations, ensuring seamless service delivery and exceptional client experience.',
    },
    {
      name: 'Agaba Osbert',
      role: 'Consultant',
      color: '#F47F20',
      initials: 'AO',
      bio: 'Agaba provides specialised consulting services in business strategy and financial planning for growing enterprises.',
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

      {/* ═══ 2. Leadership Team ═══ */}
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

          <TeamSpotlight
            teamMembers={teamMembers}
            isMobile={isMobile}
          />
        </div>
      </section>

      {/* ═══ 3. Our Story ═══ */}
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

      {/* ═══ 4. Mission & Vision ═══ */}
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

      {/* ═══ 5. Core Values ═══ */}
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
    </div>
  );
};

export default About;
