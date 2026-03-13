import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/ap-logo.jpeg';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Industries', to: '/industries' },
    { label: 'Contact Us', to: '/contact' },
  ];

  const topBarStyles: Record<string, React.CSSProperties> = {
    topBar: {
      background: '#043049',
      color: '#FFFFFF',
      fontSize: 13,
      fontWeight: 400,
      letterSpacing: 0.3,
    },
    topBarInner: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '8px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 8,
    },
    topBarLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      flexWrap: 'wrap',
    },
    topBarItem: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      color: 'rgba(255,255,255,0.85)',
    },
    topBarLink: {
      color: 'rgba(255,255,255,0.85)',
      textDecoration: 'none',
      transition: 'color 0.2s ease',
    },
    topBarRight: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
    },
    topBarSocial: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 26,
      height: 26,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.1)',
      color: '#FFFFFF',
      transition: 'background 0.2s ease',
      cursor: 'pointer',
    },
    topBarDivider: {
      width: 1,
      height: 14,
      background: 'rgba(255,255,255,0.2)',
    },
  };

  const styles: Record<string, React.CSSProperties> = {
    nav: {
      position: 'sticky',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: '#FFFFFF',
      boxShadow: scrolled
        ? '0 2px 16px rgba(0, 0, 0, 0.10)'
        : '0 1px 4px rgba(0, 0, 0, 0.04)',
      transition: 'box-shadow 0.3s ease',
    },
    container: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: scrolled ? 72 : 80,
      transition: 'height 0.3s ease',
    },
    logoLink: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
    },
    logoImage: {
      height: scrolled ? 56 : 64,
      width: 'auto',
      objectFit: 'contain' as const,
      transition: 'height 0.3s ease',
    },
    desktopLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    navLink: {
      textDecoration: 'none',
      color: '#2B2B2B',
      fontSize: 15,
      fontWeight: 400,
      letterSpacing: 'normal',
      transition: 'color 0.2s ease',
      position: 'relative' as const,
      padding: '4px 0',
    },
    ctaButton: {
      display: 'inline-block',
      backgroundColor: '#F47F20',
      color: '#FFFFFF',
      padding: '10px 24px',
      borderRadius: 6,
      fontSize: 15,
      fontWeight: 600,
      textDecoration: 'none',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease, transform 0.2s ease',
      whiteSpace: 'nowrap' as const,
    },
    hamburger: {
      display: 'none',
      flexDirection: 'column' as const,
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 4,
      gap: 5,
    },
    hamburgerLine: {
      display: 'block',
      width: 24,
      height: 2.5,
      backgroundColor: '#043049',
      borderRadius: 2,
      transition: 'transform 0.3s ease, opacity 0.3s ease',
    },
    mobileOverlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      zIndex: 998,
      opacity: mobileOpen ? 1 : 0,
      visibility: mobileOpen ? 'visible' as const : 'hidden' as const,
      transition: 'opacity 0.3s ease, visibility 0.3s ease',
    },
    mobileMenu: {
      position: 'fixed' as const,
      top: 0,
      right: 0,
      width: 280,
      height: '100vh',
      backgroundColor: '#FFFFFF',
      zIndex: 999,
      transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform 0.3s ease',
      display: 'flex',
      flexDirection: 'column' as const,
      padding: '80px 32px 32px',
      boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.12)',
    },
    mobileLink: {
      textDecoration: 'none',
      color: '#2B2B2B',
      fontSize: 17,
      fontWeight: 500,
      padding: '14px 0',
      borderBottom: '1px solid #F7F9FC',
      display: 'block',
    },
    mobileCta: {
      display: 'inline-block',
      backgroundColor: '#F47F20',
      color: '#FFFFFF',
      padding: '12px 24px',
      borderRadius: 6,
      fontSize: 16,
      fontWeight: 600,
      textDecoration: 'none',
      textAlign: 'center' as const,
      marginTop: 24,
    },
    closeButton: {
      position: 'absolute' as const,
      top: 20,
      right: 20,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  const mobileBreakpoint = 768;
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < mobileBreakpoint : false
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < mobileBreakpoint;
      setIsMobile(mobile);
      if (!mobile) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* ──── Top Header Bar (hidden on mobile) ──── */}
      {!isMobile && <div style={topBarStyles.topBar}>
        <div style={topBarStyles.topBarInner}>
          <div style={topBarStyles.topBarLeft}>
            {/* Phone */}
            <span style={topBarStyles.topBarItem}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <a href="tel:+256757813787" style={topBarStyles.topBarLink}>+256 757 813787</a>
            </span>

            <div style={topBarStyles.topBarDivider} />

            {/* Email */}
            <span style={topBarStyles.topBarItem}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <a href="mailto:admin@amara-partners.com" style={topBarStyles.topBarLink}>admin@amara-partners.com</a>
            </span>

            <div style={topBarStyles.topBarDivider} />

            {/* Location */}
            <span style={topBarStyles.topBarItem}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span style={{ color: 'rgba(255,255,255,0.85)' }}>Bulabira Road, Najjera, Kampala, Uganda</span>
            </span>
          </div>

          <div style={topBarStyles.topBarRight}>
            {/* Social icons */}
            {[
              { label: 'LinkedIn', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z' },
              { label: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
              { label: 'X', path: 'M4 4l7.07 9.34L4 20h1.6l6.17-5.82L16.6 20H22l-7.45-9.84L21 4h-1.6l-5.76 5.43L9.4 4H4zm2.2 1.2h2.46l9.14 13.6h-2.46L6.2 5.2z' },
            ].map((social) => (
              <div
                key={social.label}
                style={topBarStyles.topBarSocial}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(244,127,32,0.6)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
                }}
                title={social.label}
                role="link"
                aria-label={social.label}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d={social.path} />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>}

      {/* ──── Main Navbar ──── */}
      <nav style={styles.nav}>
        <div style={styles.container}>
          <Link to="/" style={styles.logoLink}>
            <img src={logo} alt="Amara Partners" style={styles.logoImage} />
          </Link>

          {!isMobile && (
            <ul style={styles.desktopLinks}>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    style={styles.navLink}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = '#F47F20';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = '#2B2B2B';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/contact"
                  style={styles.ctaButton}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#e06d10';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#F47F20';
                  }}
                >
                  Get In Touch
                </Link>
              </li>
            </ul>
          )}

          {isMobile && (
            <button
              style={{ ...styles.hamburger, display: 'flex' }}
              onClick={toggleMobile}
              aria-label="Toggle navigation menu"
            >
              <span
                style={{
                  ...styles.hamburgerLine,
                  transform: mobileOpen ? 'translateY(7.5px) rotate(45deg)' : 'none',
                }}
              />
              <span
                style={{
                  ...styles.hamburgerLine,
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  ...styles.hamburgerLine,
                  transform: mobileOpen ? 'translateY(-7.5px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div style={styles.mobileOverlay} onClick={closeMobile} />

      {/* Mobile Slide-out Menu */}
      <div style={styles.mobileMenu}>
        <button style={styles.closeButton} onClick={closeMobile} aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2B2B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={styles.mobileLink}
            onClick={closeMobile}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#F47F20';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#2B2B2B';
            }}
          >
            {link.label}
          </Link>
        ))}
        <Link to="/contact" style={styles.mobileCta} onClick={closeMobile}>
          Get In Touch
        </Link>
      </div>
    </>
  );
};

export default Navbar;
