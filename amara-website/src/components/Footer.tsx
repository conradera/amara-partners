import { Link } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';
import logo from '../assets/ap-logo.jpeg';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const isMobile = useIsMobile();
  const isTablet = useIsMobile(1024);

  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Industries', to: '/industries' },
    { label: 'Contact Us', to: '/contact' },
  ];

  const services = [
    { label: 'Tax Planning', to: '/services#tax-planning' },
    { label: 'Audit & Assurance', to: '/services#audit' },
    { label: 'Bookkeeping', to: '/services#bookkeeping' },
    { label: 'Business Advisory', to: '/services#advisory' },
    { label: 'Payroll Services', to: '/services#payroll' },
  ];

  // Decorative circle rings
  const circleRings: { size: number; top: string; left: string; opacity: number; borderWidth?: number }[] = [
    { size: 350, top: '5%', left: '-100px', opacity: 0.12, borderWidth: 2 },
    { size: 200, top: '55%', left: '10%', opacity: 0.1, borderWidth: 1.5 },
    { size: 450, top: '-15%', left: '65%', opacity: 0.08, borderWidth: 2.5 },
    { size: 160, top: '40%', left: '82%', opacity: 0.14, borderWidth: 1.5 },
    { size: 280, top: '70%', left: '45%', opacity: 0.1, borderWidth: 2 },
    { size: 120, top: '20%', left: '35%', opacity: 0.12, borderWidth: 1 },
    { size: 500, top: '50%', left: '-5%', opacity: 0.06, borderWidth: 3 },
    { size: 180, top: '80%', left: '75%', opacity: 0.1, borderWidth: 1.5 },
  ];

  const styles: Record<string, React.CSSProperties> = {
    footer: {
      backgroundColor: '#043049',
      color: '#FFFFFF',
      fontFamily: 'inherit',
      position: 'relative' as const,
      overflow: 'hidden',
    },
    topSection: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: isMobile ? '32px 16px 24px' : '64px 24px 40px',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '2fr 1fr 1fr 1.5fr',
      gap: isMobile ? 32 : 48,
      textAlign: isMobile ? 'center' as const : 'left' as const,
      position: 'relative' as const,
      zIndex: 1,
    },
    columnTitle: {
      fontSize: isMobile ? 16 : 18,
      fontWeight: 700,
      marginBottom: isMobile ? 16 : 20,
      color: '#FFFFFF',
      letterSpacing: '0.3px',
    },
    description: {
      fontSize: isMobile ? 13 : 14,
      lineHeight: 1.7,
      color: 'rgba(255, 255, 255, 0.75)',
      marginTop: 16,
      marginBottom: 0,
    },
    logoImage: {
      height: 44,
      width: 'auto',
      objectFit: 'contain' as const,
      backgroundColor: '#FFFFFF',
      borderRadius: 6,
      padding: 4,
    },
    linkList: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 12,
    },
    link: {
      textDecoration: 'none',
      color: 'rgba(255, 255, 255, 0.75)',
      fontSize: 14,
      lineHeight: 1.6,
      transition: 'color 0.2s ease',
    },
    contactItem: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: isMobile ? 'center' : 'flex-start',
      gap: 12,
      marginBottom: 16,
    },
    contactIcon: {
      flexShrink: 0,
      marginTop: 2,
    },
    contactText: {
      fontSize: 14,
      lineHeight: 1.6,
      color: 'rgba(255, 255, 255, 0.75)',
      margin: 0,
    },
    brandText: {
      textAlign: 'center' as const,
      padding: isMobile ? '24px 16px 0' : '40px 24px 0',
      position: 'relative' as const,
      zIndex: 1,
    },
    bottomBar: {
      borderTop: '1px solid rgba(255, 255, 255, 0.12)',
      position: 'relative' as const,
      zIndex: 1,
    },
    bottomBarInner: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: isMobile ? '16px' : '20px 24px',
      display: 'flex',
      flexWrap: 'wrap' as const,
      flexDirection: isMobile ? 'column' as const : 'row' as const,
      alignItems: 'center',
      justifyContent: isMobile ? 'center' : 'space-between',
      gap: isMobile ? 12 : 0,
      textAlign: isMobile ? 'center' as const : 'left' as const,
    },
    copyright: {
      fontSize: isMobile ? 12 : 13,
      color: 'rgba(255, 255, 255, 0.55)',
      margin: 0,
    },
    socialLinks: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: isMobile ? 'center' : 'flex-start',
      flexWrap: 'wrap' as const,
      gap: isMobile ? 12 : 16,
    },
    socialIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 36,
      height: 36,
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      transition: 'background-color 0.2s ease',
      cursor: 'pointer',
    },
  };

  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>, entering: boolean) => {
    (e.currentTarget as HTMLElement).style.color = entering
      ? '#F47F20'
      : 'rgba(255, 255, 255, 0.75)';
  };

  const handleSocialHover = (e: React.MouseEvent<HTMLAnchorElement>, entering: boolean) => {
    (e.currentTarget as HTMLElement).style.backgroundColor = entering
      ? '#F47F20'
      : 'rgba(255, 255, 255, 0.1)';
  };

  return (
    <footer style={styles.footer}>
      {/* Decorative Circle Rings */}
      {circleRings.map((ring, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: ring.top,
            left: ring.left,
            width: ring.size,
            height: ring.size,
            borderRadius: '50%',
            border: `${ring.borderWidth || 2}px solid rgba(255, 255, 255, ${ring.opacity})`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      ))}

      {/* Main Footer Content */}
      <div style={styles.topSection}>
        {/* Column 1: Company Info */}
        <div>
          <Link to="/">
            <img src={logo} alt="Amara Partners" style={styles.logoImage} />
          </Link>
          <p style={styles.description}>
            Amara Partners is a trusted accounting firm committed to delivering
            exceptional financial services. We help businesses and individuals
            navigate complex financial landscapes with confidence and clarity.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 style={styles.columnTitle}>Quick Links</h4>
          <ul style={styles.linkList}>
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  style={styles.link}
                  onMouseEnter={(e) => handleLinkHover(e, true)}
                  onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Services */}
        <div>
          <h4 style={styles.columnTitle}>Services</h4>
          <ul style={styles.linkList}>
            {services.map((service) => (
              <li key={service.to}>
                <Link
                  to={service.to}
                  style={styles.link}
                  onMouseEnter={(e) => handleLinkHover(e, true)}
                  onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div>
          <h4 style={styles.columnTitle}>Contact Info</h4>

          {/* Address */}
          <div style={styles.contactItem}>
            <svg
              style={styles.contactIcon}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p style={styles.contactText}>
              Bulabira Road, Najjera, Kampala, Uganda
              <br />
              P.O. Box 152713, Kampala
            </p>
          </div>

          {/* Phone */}
          <div style={styles.contactItem}>
            <svg
              style={styles.contactIcon}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <p style={styles.contactText}>+256 757 813787</p>
          </div>

          {/* Email */}
          <div style={styles.contactItem}>
            <svg
              style={styles.contactIcon}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <p style={styles.contactText}>admin@amara-partners.com</p>
          </div>
        </div>
      </div>

      {/* Brand Text */}
      <div style={styles.brandText}>
        <h2
          style={{
            fontSize: isMobile ? 40 : 72,
            fontWeight: 800,
            letterSpacing: isMobile ? '2px' : '6px',
            margin: 0,
            lineHeight: 1.1,
            textTransform: 'uppercase' as const,
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          <span style={{ color: '#FFFFFF' }}>Amara </span>
          <span style={{ color: '#F47F20' }}>Partners</span>
        </h2>
      </div>

      {/* Bottom Bar */}
      <div style={styles.bottomBar}>
        <div style={styles.bottomBarInner}>
          <p style={styles.copyright}>
            &copy; {currentYear} Amara Partners. All rights reserved.
          </p>

          {/* Social Media Icons */}
          <div style={styles.socialLinks}>
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialIcon}
              aria-label="LinkedIn"
              onMouseEnter={(e) => handleSocialHover(e, true)}
              onMouseLeave={(e) => handleSocialHover(e, false)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#FFFFFF"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialIcon}
              aria-label="Facebook"
              onMouseEnter={(e) => handleSocialHover(e, true)}
              onMouseLeave={(e) => handleSocialHover(e, false)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#FFFFFF"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialIcon}
              aria-label="X"
              onMouseEnter={(e) => handleSocialHover(e, true)}
              onMouseLeave={(e) => handleSocialHover(e, false)}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="#FFFFFF"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialIcon}
              aria-label="Instagram"
              onMouseEnter={(e) => handleSocialHover(e, true)}
              onMouseLeave={(e) => handleSocialHover(e, false)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#FFFFFF"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
