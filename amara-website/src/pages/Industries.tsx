import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useIsMobile, useIsTablet } from '../hooks/useIsMobile';

const industries = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="24" width="8" height="18" rx="1" fill="#F47F20" />
        <rect x="14" y="18" width="8" height="24" rx="1" fill="#F47F20" opacity="0.8" />
        <rect x="24" y="12" width="8" height="30" rx="1" fill="#F47F20" opacity="0.6" />
        <rect x="34" y="6" width="8" height="36" rx="1" fill="#F47F20" opacity="0.4" />
        <line x1="4" y1="44" x2="44" y2="44" stroke="#043049" strokeWidth="2" />
      </svg>
    ),
    name: 'Financial Services',
    description:
      'Financial institutions face complex regulatory requirements, evolving compliance standards, and the constant pressure of audits. From banks and investment firms to insurance companies, the financial sector demands precision and transparency in every transaction.',
    help:
      'Amara Partners provides tailored accounting, audit preparation, and regulatory compliance support to financial services firms. We ensure your financial reporting meets industry standards while optimizing tax strategies to protect your bottom line.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="12" width="32" height="24" rx="3" stroke="#F47F20" strokeWidth="2.5" fill="none" />
        <line x1="8" y1="20" x2="40" y2="20" stroke="#F47F20" strokeWidth="2" />
        <circle cx="24" cy="30" r="3" fill="#F47F20" />
        <line x1="20" y1="36" x2="28" y2="36" stroke="#043049" strokeWidth="2" />
        <line x1="16" y1="40" x2="32" y2="40" stroke="#043049" strokeWidth="2" />
      </svg>
    ),
    name: 'Technology',
    description:
      'Tech companies operate in a fast-paced environment with unique financial challenges including revenue recognition for SaaS models, R&D tax credits, stock-based compensation accounting, and managing rapid scaling across multiple jurisdictions.',
    help:
      'Amara Partners helps technology companies navigate complex revenue recognition rules, maximize R&D tax credits, and structure finances for growth. We support startups through Series A and beyond, as well as established tech firms looking to optimize their financial operations.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="6" y="20" width="16" height="22" rx="1" stroke="#F47F20" strokeWidth="2.5" fill="none" />
        <rect x="26" y="10" width="16" height="32" rx="1" stroke="#F47F20" strokeWidth="2.5" fill="none" />
        <rect x="10" y="26" width="4" height="4" fill="#F47F20" />
        <rect x="10" y="34" width="4" height="4" fill="#F47F20" />
        <rect x="30" y="16" width="4" height="4" fill="#F47F20" />
        <rect x="30" y="24" width="4" height="4" fill="#F47F20" />
        <rect x="30" y="32" width="4" height="4" fill="#F47F20" />
        <line x1="4" y1="42" x2="44" y2="42" stroke="#043049" strokeWidth="2" />
      </svg>
    ),
    name: 'Real Estate & Construction',
    description:
      'Real estate developers and construction firms deal with project-based accounting, percentage-of-completion methods, joint ventures, and fluctuating material costs. Multi-entity structures and 1031 exchanges add layers of complexity to financial management.',
    help:
      'Amara Partners brings deep expertise in project cost tracking, construction-specific accounting methods, and real estate tax planning. We help clients structure deals, manage multi-entity finances, and take full advantage of depreciation and exchange strategies.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 6L24 14" stroke="#F47F20" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M24 14C28 14 36 18 36 28C36 34 30 42 24 42C18 42 12 34 12 28C12 18 20 14 24 14Z" stroke="#F47F20" strokeWidth="2.5" fill="none" />
        <line x1="18" y1="28" x2="30" y2="28" stroke="#F47F20" strokeWidth="2" />
        <line x1="24" y1="22" x2="24" y2="34" stroke="#F47F20" strokeWidth="2" />
      </svg>
    ),
    name: 'Healthcare',
    description:
      'Healthcare providers, clinics, and medical practices face stringent billing regulations, insurance reimbursement complexities, and HIPAA-related compliance requirements. Managing cash flow while maintaining quality patient care is a constant balancing act.',
    help:
      'Amara Partners supports healthcare organizations with medical practice accounting, insurance receivables management, and compliance-focused financial reporting. We help practices optimize revenue cycles and plan for capital investments in equipment and facilities.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="16" cy="24" r="4" stroke="#F47F20" strokeWidth="2.5" fill="none" />
        <circle cx="32" cy="24" r="4" stroke="#F47F20" strokeWidth="2.5" fill="none" />
        <line x1="20" y1="24" x2="28" y2="24" stroke="#F47F20" strokeWidth="2" />
        <rect x="6" y="14" width="36" height="20" rx="2" stroke="#F47F20" strokeWidth="2.5" fill="none" />
        <line x1="6" y1="38" x2="42" y2="38" stroke="#043049" strokeWidth="2" />
        <line x1="12" y1="34" x2="12" y2="38" stroke="#043049" strokeWidth="2" />
        <line x1="36" y1="34" x2="36" y2="38" stroke="#043049" strokeWidth="2" />
      </svg>
    ),
    name: 'Manufacturing',
    description:
      'Manufacturers must manage intricate cost accounting systems, track inventory across supply chains, handle multi-location operations, and comply with international trade regulations. Fluctuating commodity prices and currency exchange rates further complicate financial planning.',
    help:
      'Amara Partners delivers cost accounting expertise, inventory valuation support, and supply chain financial analysis for manufacturers. We help streamline operations through detailed financial insights and tax strategies that account for capital-intensive business models.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="18" r="10" stroke="#F47F20" strokeWidth="2.5" fill="none" />
        <path d="M14 38C14 32 18 28 24 28C30 28 34 32 34 38" stroke="#F47F20" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M24 14V22" stroke="#F47F20" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 18H28" stroke="#F47F20" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    name: 'Non-Profit & NGOs',
    description:
      'Non-profit organizations must maintain impeccable financial transparency to satisfy donors, grant-makers, and regulatory bodies. Fund accounting, restricted versus unrestricted funds, and Form 990 preparation require specialized knowledge that general accountants often lack.',
    help:
      'Amara Partners specializes in non-profit accounting, including fund accounting, grant compliance tracking, and Form 990 preparation. We help organizations maintain donor trust through transparent reporting while ensuring every dollar is accounted for and mission-aligned.',
  },
];

const Industries: React.FC = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const styles: Record<string, React.CSSProperties> = {
    /* ─── Hero Banner ─── */
    hero: {
      position: 'relative',
      backgroundColor: '#043049',
      padding: isMobile ? '60px 16px 48px' : '100px 24px 80px',
      overflow: 'hidden',
    },
    heroAngle: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: 80,
      background: '#F7F9FC',
      clipPath: 'polygon(0 60%, 100% 0, 100% 100%, 0 100%)',
    },
    heroContent: {
      maxWidth: 1200,
      margin: '0 auto',
      position: 'relative',
      zIndex: 1,
    },
    breadcrumb: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 20,
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.6)',
    },
    breadcrumbLink: {
      color: 'rgba(255, 255, 255, 0.6)',
      textDecoration: 'none',
      transition: 'color 0.2s ease',
    },
    breadcrumbSeparator: {
      color: 'rgba(255, 255, 255, 0.4)',
    },
    breadcrumbCurrent: {
      color: '#F47F20',
      fontWeight: 500,
    },
    heroTitle: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: 'clamp(2rem, 1.5rem + 2vw, 3rem)',
      fontWeight: 700,
      color: '#FFFFFF',
      margin: '0 0 16px',
      lineHeight: 1.15,
      letterSpacing: '-0.025em',
    },
    heroSubtitle: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '18px',
      fontWeight: 400,
      color: 'rgba(255, 255, 255, 0.8)',
      margin: 0,
      maxWidth: 640,
      lineHeight: 1.625,
    },
    heroAccent: {
      position: 'absolute',
      top: -60,
      right: -60,
      width: 300,
      height: 300,
      borderRadius: '50%',
      background: 'rgba(244, 127, 32, 0.08)',
    },

    /* ─── Industries Grid ─── */
    gridSection: {
      backgroundColor: '#F7F9FC',
      padding: isMobile ? '40px 16px 60px' : '80px 24px 100px',
    },
    gridContainer: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: isMobile ? '0 16px' : undefined,
    },
    gridHeader: {
      textAlign: 'center' as const,
      marginBottom: 60,
    },
    gridLabel: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '12px',
      fontWeight: 700,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.1em',
      color: '#F47F20',
      marginBottom: 12,
    },
    gridTitle: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: 'clamp(1.75rem, 1.25rem + 1.5vw, 2.25rem)',
      fontWeight: 700,
      color: 'var(--foreground)',
      margin: '0 0 16px',
      lineHeight: 1.15,
      letterSpacing: '-0.015em',
    },
    gridSubtitle: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '15px',
      color: 'var(--muted-foreground)',
      maxWidth: 600,
      margin: '0 auto',
      lineHeight: 1.625,
      fontWeight: 400,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(360px, 1fr))',
      gap: 32,
    },

    /* ─── Industry Card ─── */
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      padding: isMobile ? '28px 20px' : '40px 32px',
      boxShadow: '0 2px 16px rgba(0, 0, 0, 0.06)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      borderTop: '4px solid #F47F20',
    },
    cardIcon: {
      width: 64,
      height: 64,
      borderRadius: 12,
      backgroundColor: 'rgba(244, 127, 32, 0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    cardName: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '16px',
      fontWeight: 700,
      color: 'var(--foreground)',
      margin: '0 0 14px',
      lineHeight: 1.25,
      letterSpacing: '-0.01em',
    },
    cardDescription: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '14px',
      color: 'var(--muted-foreground)',
      lineHeight: 1.625,
      margin: '0 0 16px',
    },
    cardHelp: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '14px',
      color: '#2B2B2B',
      lineHeight: 1.625,
      margin: 0,
      paddingTop: 16,
      borderTop: '1px solid #F7F9FC',
    },
    cardHelpLabel: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontWeight: 700,
      color: '#D82929',
      fontSize: '12px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.1em',
      display: 'block',
      marginBottom: 8,
    },

    /* ─── CTA Section ─── */
    cta: {
      backgroundColor: '#043049',
      padding: isMobile ? '48px 16px' : '80px 24px',
      textAlign: 'center' as const,
      position: 'relative' as const,
      overflow: 'hidden' as const,
    },
    ctaContainer: {
      maxWidth: 700,
      margin: '0 auto',
    },
    ctaTitle: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: 'clamp(1.75rem, 1.25rem + 1.5vw, 2.25rem)',
      fontWeight: 700,
      color: '#FFFFFF',
      margin: '0 0 16px',
      lineHeight: 1.15,
      letterSpacing: '-0.015em',
    },
    ctaText: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '15px',
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: 1.625,
      fontWeight: 400,
      margin: '0 0 32px',
    },
    ctaButton: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      display: 'inline-block',
      backgroundColor: '#F47F20',
      color: '#FFFFFF',
      padding: '14px 36px',
      borderRadius: 6,
      fontSize: 16,
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'background-color 0.2s ease, transform 0.2s ease',
    },
  };

  return (
    <div>
      <Helmet>
        <title>Industries We Serve | Amara Partners - Sector-Specific Accounting Uganda</title>
        <meta name="description" content="Amara Partners provides tailored accounting and advisory services to diverse industries in Uganda including Financial Services, Healthcare, Education, Manufacturing, Real Estate, and NGOs. Industry-specific expertise for your business needs." />
        <meta name="keywords" content="accounting for NGOs Uganda, healthcare accounting Kampala, education sector audit, manufacturing bookkeeping Uganda, real estate accounting, financial services audit Uganda, industry-specific accounting, sector expertise Uganda, non-profit accounting Kampala, construction accounting Uganda" />
        <link rel="canonical" href="https://www.amara-partners.com/industries" />
        <meta property="og:title" content="Industries We Serve | Amara Partners Uganda" />
        <meta property="og:description" content="Tailored accounting and advisory services for Financial Services, Healthcare, Education, Manufacturing, Real Estate, and NGOs in Uganda." />
        <meta property="og:url" content="https://www.amara-partners.com/industries" />
      </Helmet>

      {/* ─── Hero Banner ─── */}
      <section style={styles.hero}>
        <div style={styles.heroAccent} />
        <div style={styles.heroContent}>
          <nav style={styles.breadcrumb}>
            <Link
              to="/"
              style={styles.breadcrumbLink}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'rgba(255, 255, 255, 0.6)';
              }}
            >
              Home
            </Link>
            <span style={styles.breadcrumbSeparator}>/</span>
            <span style={styles.breadcrumbCurrent}>Industries</span>
          </nav>
          <h1 style={styles.heroTitle}>Industries We Serve</h1>
          <p style={styles.heroSubtitle}>
            Every industry has unique financial challenges. Amara Partners brings
            specialized expertise to help businesses across sectors achieve clarity,
            compliance, and growth.
          </p>
        </div>
        <div style={styles.heroAngle} />
      </section>

      {/* ─── Industries Grid ─── */}
      <section style={styles.gridSection}>
        <div style={styles.gridContainer}>
          <div style={styles.gridHeader}>
            <p style={styles.gridLabel}>Our Expertise</p>
            <h2 style={styles.gridTitle}>Sector-Specific Financial Solutions</h2>
            <p style={styles.gridSubtitle}>
              We understand the regulations, standards, and nuances that define each
              industry — so you can focus on what you do best.
            </p>
          </div>
          <div style={styles.grid}>
            {industries.map((industry) => (
              <div
                key={industry.name}
                style={styles.card}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 12px 32px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 2px 16px rgba(0, 0, 0, 0.06)';
                }}
              >
                <div style={styles.cardIcon}>{industry.icon}</div>
                <h3 style={styles.cardName}>{industry.name}</h3>
                <p style={styles.cardDescription}>{industry.description}</p>
                <div style={styles.cardHelp}>
                  <span style={styles.cardHelpLabel}>How We Help</span>
                  {industry.help}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={styles.cta}>
        {/* Decorative circle rings */}
        {[
          { size: 320, top: '-80px', left: '-70px', opacity: 0.12, bw: 2 },
          { size: 200, top: '25%', right: '-50px', opacity: 0.1, bw: 1.5 },
          { size: 350, top: '-60px', right: '10%', opacity: 0.08, bw: 2.5 },
          { size: 160, bottom: '-50px', left: '30%', opacity: 0.14, bw: 1.5 },
          { size: 240, bottom: '-60px', right: '30%', opacity: 0.1, bw: 2 },
          { size: 180, top: '35%', left: '50%', opacity: 0.08, bw: 1 },
        ].map((r, i) => (
          <div key={i} style={{
            position: 'absolute' as const,
            width: r.size, height: r.size,
            borderRadius: '50%',
            border: `${r.bw}px solid rgba(255,255,255,${r.opacity})`,
            top: (r as any).top, left: (r as any).left, right: (r as any).right, bottom: (r as any).bottom,
            pointerEvents: 'none' as const, zIndex: 0,
          }} />
        ))}
        <div style={{ ...styles.ctaContainer, position: 'relative' as const, zIndex: 1 }}>
          <h2 style={styles.ctaTitle}>
            Don&rsquo;t See Your Industry Listed?
          </h2>
          <p style={styles.ctaText}>
            Our expertise extends beyond these sectors. Get in touch to learn how
            Amara Partners can deliver tailored financial solutions for your
            business.
          </p>
          <Link
            to="/contact"
            style={styles.ctaButton}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#e06d10';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#F47F20';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Industries;
