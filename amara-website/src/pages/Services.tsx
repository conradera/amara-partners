import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useIsMobile } from '../hooks/useIsMobile';

/* ─── Brand Palette ─── */
const C = {
  navy: '#043049',
  red: '#D82929',
  orange: '#F47F20',
  white: '#FFFFFF',
  offWhite: '#F7F9FC',
  charcoal: '#2B2B2B',
  textGray: '#6B7280',
};

/* ─── SVG Icons ─── */
const AuditIcon: React.FC<{ size?: number }> = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="4" width="30" height="40" rx="3" stroke={C.orange} strokeWidth="2.5" fill="none" />
    <line x1="14" y1="14" x2="32" y2="14" stroke={C.orange} strokeWidth="2" strokeLinecap="round" />
    <line x1="14" y1="20" x2="32" y2="20" stroke={C.orange} strokeWidth="2" strokeLinecap="round" />
    <line x1="14" y1="26" x2="26" y2="26" stroke={C.orange} strokeWidth="2" strokeLinecap="round" />
    <circle cx="38" cy="38" r="12" stroke={C.navy} strokeWidth="2.5" fill={C.offWhite} />
    <line x1="47" y1="47" x2="52" y2="52" stroke={C.navy} strokeWidth="3" strokeLinecap="round" />
    <path d="M33 38l3 3 6-7" stroke={C.orange} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TaxIcon: React.FC<{ size?: number }> = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="8" width="34" height="42" rx="3" stroke={C.orange} strokeWidth="2.5" fill="none" />
    <line x1="12" y1="18" x2="34" y2="18" stroke={C.orange} strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="24" x2="34" y2="24" stroke={C.orange} strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="30" x2="28" y2="30" stroke={C.orange} strokeWidth="2" strokeLinecap="round" />
    <circle cx="42" cy="16" r="10" stroke={C.navy} strokeWidth="2.5" fill={C.offWhite} />
    <text x="42" y="21" textAnchor="middle" fill={C.navy} fontWeight="bold" fontSize="14" fontFamily="sans-serif">%</text>
  </svg>
);

const AccountingIcon: React.FC<{ size?: number }> = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="38" height="44" rx="4" stroke={C.orange} strokeWidth="2.5" fill="none" />
    <line x1="4" y1="18" x2="42" y2="18" stroke={C.orange} strokeWidth="2" />
    <line x1="22" y1="18" x2="22" y2="50" stroke={C.orange} strokeWidth="1.5" />
    <line x1="4" y1="30" x2="42" y2="30" stroke={C.orange} strokeWidth="1.5" />
    <line x1="4" y1="40" x2="42" y2="40" stroke={C.orange} strokeWidth="1.5" />
    <rect x="36" y="2" width="18" height="24" rx="3" stroke={C.navy} strokeWidth="2.5" fill={C.offWhite} />
    <text x="45" y="18" textAnchor="middle" fill={C.navy} fontWeight="bold" fontSize="12" fontFamily="monospace">$</text>
  </svg>
);

const AdvisoryIcon: React.FC<{ size?: number }> = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 44 L8 30 L16 30 L16 44 Z" fill={C.orange} opacity="0.25" stroke={C.orange} strokeWidth="2" />
    <path d="M20 44 L20 22 L28 22 L28 44 Z" fill={C.orange} opacity="0.45" stroke={C.orange} strokeWidth="2" />
    <path d="M32 44 L32 14 L40 14 L40 44 Z" fill={C.orange} opacity="0.7" stroke={C.orange} strokeWidth="2" />
    <path d="M44 44 L44 6 L52 6 L52 44 Z" fill={C.orange} stroke={C.orange} strokeWidth="2" />
    <line x1="4" y1="44" x2="56" y2="44" stroke={C.navy} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M10 28 L24 18 L36 10 L48 4" stroke={C.navy} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="48" cy="4" r="3" fill={C.navy} />
  </svg>
);

const RiskIcon: React.FC<{ size?: number }> = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M28 4 L52 48 L4 48 Z" stroke={C.orange} strokeWidth="2.5" fill="none" strokeLinejoin="round" />
    <circle cx="28" cy="38" r="2.5" fill={C.navy} />
    <line x1="28" y1="20" x2="28" y2="32" stroke={C.navy} strokeWidth="3" strokeLinecap="round" />
    <rect x="10" y="10" width="14" height="14" rx="3" stroke={C.navy} strokeWidth="2" fill={C.offWhite} />
    <path d="M14 17l2 2 4-5" stroke={C.navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
    <circle cx="10" cy="10" r="10" fill={C.orange} />
    <path d="M6 10l3 3 5-6" stroke={C.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── Service Data ─── */
interface ServiceData {
  id: string;
  title: string;
  description: string;
  subServices: string[];
  icon: React.ReactNode;
}

const services: ServiceData[] = [
  {
    id: 'audit',
    title: 'Audit & Assurance',
    description:
      'Our audit and assurance services are designed to provide stakeholders with confidence in the accuracy and integrity of financial information. We employ rigorous methodologies, industry best practices, and a deep understanding of regulatory frameworks to deliver reliable, independent assessments that strengthen trust and transparency.',
    subServices: [
      'Financial statement audits',
      'Internal audits',
      'Compliance audits',
      'Agreed-upon procedures engagements',
      'Review and compilation engagements',
    ],
    icon: <AuditIcon />,
  },
  {
    id: 'tax',
    title: 'Tax Advisory',
    description:
      'Navigating the complexities of tax legislation requires expert guidance. Our tax advisory team helps businesses and individuals optimise their tax positions while maintaining full compliance with local and international tax regulations. We deliver proactive, strategic advice tailored to your unique circumstances.',
    subServices: [
      'Corporate tax planning and advisory',
      'Tax compliance and return preparation',
      'International tax advisory',
      'Transfer pricing consulting',
      'VAT and indirect tax advisory',
    ],
    icon: <TaxIcon />,
  },
  {
    id: 'accounting',
    title: 'Accounting & Bookkeeping',
    description:
      'Accurate financial records are the foundation of sound business decisions. Our accounting and bookkeeping services ensure your financial data is meticulously maintained, giving you clear visibility into your business performance and freeing you to focus on growth.',
    subServices: [
      'Financial reporting and analysis',
      'Day-to-day bookkeeping and record keeping',
      'Payroll management and processing',
      'Financial statements preparation',
      'Accounts payable and receivable management',
    ],
    icon: <AccountingIcon />,
  },
  {
    id: 'advisory',
    title: 'Business Advisory',
    description:
      'Beyond numbers, we are strategic partners invested in your success. Our business advisory services combine financial expertise with commercial insight to help you identify opportunities, navigate challenges, and achieve sustainable growth in an ever-changing business landscape.',
    subServices: [
      'Financial strategy and forecasting',
      'Business growth and expansion advisory',
      'Corporate restructuring and turnaround',
      'Mergers and acquisitions support',
      'Business valuations',
    ],
    icon: <AdvisoryIcon />,
  },
  {
    id: 'risk',
    title: 'Risk & Compliance',
    description:
      'In today\'s regulatory environment, robust risk management and compliance frameworks are essential. We help organisations build resilient systems that identify, assess, and mitigate risks while ensuring adherence to evolving regulations and industry standards.',
    subServices: [
      'Internal control system design and review',
      'Risk management consulting',
      'Regulatory compliance support',
      'Anti-money laundering (AML) advisory',
      'Corporate governance advisory',
    ],
    icon: <RiskIcon />,
  },
];

/* ─── Styles ─── */
const styles: Record<string, React.CSSProperties> = {
  /* Hero */
  heroWrapper: {
    position: 'relative',
    background: C.navy,
    overflow: 'hidden',
  },
  heroAngle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '80px',
    background: C.white,
    clipPath: 'polygon(0 100%, 100% 0, 100% 100%)',
  },
  heroContent: {
    maxWidth: 1140,
    margin: '0 auto',
    padding: '80px 24px 100px',
    position: 'relative',
    zIndex: 1,
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
    fontSize: 14,
    color: 'rgba(255,255,255,0.65)',
  },
  breadcrumbLink: {
    color: C.orange,
    textDecoration: 'none',
    fontWeight: 500,
    cursor: 'pointer',
  },
  breadcrumbSep: {
    color: 'rgba(255,255,255,0.4)',
  },
  breadcrumbCurrent: {
    color: C.white,
  },
  heroHeading: {
    fontSize: 'clamp(2rem, 1.5rem + 2vw, 3rem)',
    fontWeight: 700,
    color: C.white,
    margin: 0,
    lineHeight: 1.15,
    letterSpacing: '-0.025em',
  },
  heroAccent: {
    display: 'block',
    width: 60,
    height: 4,
    background: C.orange,
    borderRadius: 2,
    margin: '20px 0',
  },
  heroSub: {
    fontSize: '18px',
    fontWeight: 400,
    color: 'rgba(255,255,255,0.8)',
    maxWidth: 620,
    lineHeight: 1.625,
    margin: 0,
  },

  /* Service Section */
  sectionOuter: {
    padding: '80px 24px',
  },
  sectionInner: {
    maxWidth: 1140,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: 64,
    flexWrap: 'wrap' as const,
  },
  sectionText: {
    flex: '1 1 480px',
    minWidth: 280,
  },
  sectionVisual: {
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 110,
    height: 110,
    borderRadius: '50%',
    background: C.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 30px rgba(4,48,73,0.10)',
  },
  sectionTitle: {
    fontSize: 'clamp(1.75rem, 1.25rem + 1.5vw, 2.25rem)',
    fontWeight: 700,
    color: 'var(--foreground)',
    margin: '0 0 8px',
    lineHeight: 1.15,
    letterSpacing: '-0.015em',
  },
  titleBar: {
    width: 48,
    height: 4,
    background: C.orange,
    borderRadius: 2,
    marginBottom: 20,
  },
  sectionDesc: {
    fontSize: '15px',
    lineHeight: 1.625,
    fontWeight: 400,
    color: 'var(--muted-foreground)',
    margin: '0 0 28px',
  },
  bulletList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 14,
  },
  bulletItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    fontSize: '15px',
    lineHeight: 1.625,
    fontWeight: 400,
    color: C.charcoal,
  },

  /* CTA */
  ctaOuter: {
    background: C.navy,
    padding: '80px 24px',
    textAlign: 'center' as const,
    position: 'relative' as const,
    overflow: 'hidden' as const,
  },
  ctaHeading: {
    fontSize: 'clamp(1.75rem, 1.25rem + 1.5vw, 2.25rem)',
    fontWeight: 700,
    color: C.white,
    margin: '0 0 16px',
    lineHeight: 1.15,
    letterSpacing: '-0.015em',
  },
  ctaSub: {
    fontSize: '15px',
    lineHeight: 1.625,
    fontWeight: 400,
    color: 'rgba(255,255,255,0.75)',
    maxWidth: 540,
    margin: '0 auto 36px',
  },
  ctaBtn: {
    display: 'inline-block',
    padding: '16px 44px',
    fontSize: 16,
    fontWeight: 600,
    color: C.white,
    background: C.orange,
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background 0.25s',
  },
};

/* ─── Component ─── */
const Services: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <Helmet>
        <title>Our Services | Audit, Tax, Bookkeeping & Advisory - Amara Partners Uganda</title>
        <meta name="description" content="Explore Amara Partners' professional services: Audit & Assurance, Tax Advisory & Planning, Accounting & Bookkeeping, Business Advisory, Payroll Services, and Risk & Compliance. Expert financial solutions for businesses in Kampala and across Uganda." />
        <meta name="keywords" content="audit services Uganda, tax advisory Kampala, bookkeeping services Uganda, payroll outsourcing Kampala, business advisory Uganda, risk and compliance services, financial statement audit, URA tax filing, VAT compliance Uganda, corporate tax planning, IFRS compliance, internal audit Uganda, external audit Kampala, management accounting" />
        <link rel="canonical" href="https://www.amara-partners.com/services" />
        <meta property="og:title" content="Services | Amara Partners - Audit, Tax & Advisory" />
        <meta property="og:description" content="Audit & Assurance, Tax Planning, Bookkeeping, Business Advisory, Payroll, and Compliance services in Uganda." />
        <meta property="og:url" content="https://www.amara-partners.com/services" />
      </Helmet>

      {/* ── Hero Banner ── */}
      <section style={styles.heroWrapper}>
        <div style={{
          ...styles.heroContent,
          padding: isMobile ? '50px 16px 70px' : '80px 24px 100px',
        }}>
          <nav style={styles.breadcrumb}>
            <a href="/" style={styles.breadcrumbLink}>Home</a>
            <span style={styles.breadcrumbSep}>/</span>
            <span style={styles.breadcrumbCurrent}>Services</span>
          </nav>
          <h1 style={styles.heroHeading}>Our Services</h1>
          <span style={styles.heroAccent} />
          <p style={styles.heroSub}>
            We deliver comprehensive accounting, audit, tax, and advisory
            solutions designed to empower businesses of every size. Our
            experienced professionals work alongside you to protect your
            interests and unlock new opportunities for growth.
          </p>
        </div>
        <div style={styles.heroAngle} />
      </section>

      {/* ── Service Sections ── */}
      {services.map((svc, idx) => {
        const isEven = idx % 2 === 0;
        const bg = isEven ? C.white : C.offWhite;
        const iconBg = isEven ? C.offWhite : C.white;

        return (
          <section
            key={svc.id}
            style={{
              ...styles.sectionOuter,
              background: bg,
              padding: isMobile ? '50px 16px' : '80px 24px',
            }}
          >
            <div
              style={{
                ...styles.sectionInner,
                flexDirection: isMobile ? 'column' : (isEven ? 'row' : 'row-reverse'),
                gap: isMobile ? 32 : 64,
              }}
            >
              {/* Text */}
              <div style={styles.sectionText}>
                <h2 style={styles.sectionTitle}>{svc.title}</h2>
                <div style={styles.titleBar} />
                <p style={styles.sectionDesc}>{svc.description}</p>
                <ul style={styles.bulletList}>
                  {svc.subServices.map((item) => (
                    <li key={item} style={styles.bulletItem}>
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Icon */}
              <div style={styles.sectionVisual}>
                <div style={{ ...styles.iconCircle, background: iconBg }}>
                  {svc.icon}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── CTA Section ── */}
      <section style={{
        ...styles.ctaOuter,
        padding: isMobile ? '50px 16px' : '80px 24px',
      }}>
        {/* Decorative circle rings */}
        {[
          { size: 280, top: '-70px', left: '-60px', opacity: 0.12, bw: 2 },
          { size: 220, top: '20%', right: '-70px', opacity: 0.1, bw: 1.5 },
          { size: 380, top: '-90px', right: '15%', opacity: 0.08, bw: 2.5 },
          { size: 140, bottom: '-30px', left: '25%', opacity: 0.14, bw: 1.5 },
          { size: 260, bottom: '-70px', right: '20%', opacity: 0.1, bw: 2 },
          { size: 170, top: '40%', left: '45%', opacity: 0.08, bw: 1 },
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
        <h2 style={{ ...styles.ctaHeading, position: 'relative' as const, zIndex: 1 }}>Ready to Get Started?</h2>
        <p style={{ ...styles.ctaSub, position: 'relative' as const, zIndex: 1 }}>
          Let our team of experienced professionals help you navigate the
          complexities of finance, tax, and compliance. Reach out today for a
          no-obligation consultation.
        </p>
        <a
          href="/contact"
          style={{ ...styles.ctaBtn, position: 'relative' as const, zIndex: 1 }}
          onMouseEnter={(e) =>
            ((e.target as HTMLElement).style.background = C.red)
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.background = C.orange)
          }
        >
          Contact Us
        </a>
      </section>
    </div>
  );
};

export default Services;
