import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useIsMobile, useIsTablet } from '../hooks/useIsMobile';
import heroImg1 from '../assets/hero-slide-1.jpg';
import heroImg2 from '../assets/hero-slide-2.jpg';
import heroImg3 from '../assets/hero-slide-3.jpg';

/* ─── Slider Data ─── */
const heroSlides = [
  {
    label: 'Trusted Accounting',
    heading: 'Precision Accounting\nThat Powers Your Business',
    subtitle:
      'From bookkeeping to financial reporting, our meticulous accounting services give you a clear, accurate picture of your financial health — so you can make decisions with confidence.',
    image: heroImg1,
    btnText: 'Our Services',
    btnLink: '/services',
    accent: 'var(--orange)',
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
  },
  {
    label: 'Trusted Advisory',
    heading: 'Strategic Advisory\nfor Sustainable Growth',
    subtitle:
      'Our seasoned advisors partner with you to craft forward-thinking strategies — from tax optimization to corporate restructuring — that unlock your business potential.',
    image: heroImg2,
    btnText: 'Learn More',
    btnLink: '/about',
    accent: 'var(--red)',
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: 'Financial Excellence',
    heading: 'Financial Excellence\nYou Can Count On',
    subtitle:
      'We combine deep industry expertise with cutting-edge financial practices to deliver results that drive profitability, ensure compliance, and fuel long-term success.',
    image: heroImg3,
    btnText: 'Get In Touch',
    btnLink: '/contact',
    accent: 'var(--orange)',
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8">
        <line x1="12" y1="20" x2="12" y2="10" />
        <line x1="18" y1="20" x2="18" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <polyline points="4 10 8 6 12 8 18 2" />
      </svg>
    ),
  },
];

const styles: Record<string, React.CSSProperties> = {
  /* ───────────── HERO SLIDER ───────────── */
  hero: {
    position: 'relative',
    background: 'var(--navy)',
    minHeight: '92vh',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
  },
  heroBgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    transition: 'opacity 0.8s ease',
    zIndex: 0,
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(4,48,73,0.88) 0%, rgba(4,48,73,0.75) 40%, rgba(0,0,0,0.65) 100%)',
    zIndex: 1,
  },
  heroClip: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '45%',
    background: 'rgba(3,34,56,0.4)',
    clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)',
    zIndex: 2,
  },
  heroDecoCircle: {
    position: 'absolute',
    width: 420,
    height: 420,
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.07)',
    top: -100,
    right: '10%',
    zIndex: 3,
  },
  heroDecoCircle2: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.05)',
    bottom: 100,
    right: '25%',
    zIndex: 3,
  },
  heroDecoDiamond: {
    position: 'absolute',
    width: 60,
    height: 60,
    border: '1px solid rgba(255,255,255,0.1)',
    transform: 'rotate(45deg)',
    top: '25%',
    right: '18%',
    zIndex: 3,
  },
  heroDecoLine: {
    position: 'absolute',
    width: 120,
    height: 2,
    background: 'rgba(244,127,32,0.3)',
    bottom: '30%',
    right: '30%',
    transform: 'rotate(-25deg)',
    zIndex: 3,
  },
  heroDecoPlus: {
    position: 'absolute',
    fontSize: 36,
    color: 'rgba(255,255,255,0.08)',
    top: '18%',
    right: '38%',
    fontWeight: 300,
    zIndex: 3,
  },
  heroSlideIcon: {
    position: 'absolute',
    top: '20%',
    right: '12%',
    zIndex: 3,
    opacity: 0.6,
  },
  heroContainer: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
    position: 'relative',
    zIndex: 4,
    width: '100%',
  },
  heroContent: {
    maxWidth: 640,
  },
  heroLabel: {
    display: 'inline-block',
    fontSize: '0.8rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    color: 'var(--orange)',
    marginBottom: 20,
    padding: '8px 16px',
    background: 'rgba(244,127,32,0.1)',
    borderRadius: 4,
    border: '1px solid rgba(244,127,32,0.2)',
  },
  heroHeading: {
    fontSize: 'clamp(2rem, 1.5rem + 2vw, 3rem)',
    fontWeight: 700,
    color: 'var(--white)',
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
    marginBottom: 24,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    whiteSpace: 'pre-line',
  },
  heroSubtitle: {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 1.625,
    marginBottom: 40,
    maxWidth: 540,
    fontWeight: 400,
  },
  heroBtns: {
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  btnOrange: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '16px 36px',
    borderRadius: 6,
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    border: 'none',
    background: 'var(--orange)',
    color: 'var(--white)',
    fontFamily: "'Inter', sans-serif",
    transition: 'all 0.3s ease',
  },
  btnOutlineWhite: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '14px 36px',
    borderRadius: 6,
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    background: 'transparent',
    color: 'var(--white)',
    border: '2px solid rgba(255,255,255,0.4)',
    fontFamily: "'Inter', sans-serif",
    transition: 'all 0.3s ease',
  },

  /* Slider Controls */
  sliderControls: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    zIndex: 5,
  },
  sliderControlsInner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  sliderDot: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    border: '2px solid rgba(255,255,255,0.4)',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    padding: 0,
  },
  sliderDotActive: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    border: '2px solid var(--orange)',
    background: 'var(--orange)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    padding: 0,
  },
  sliderProgress: {
    width: 60,
    height: 3,
    background: 'rgba(255,255,255,0.15)',
    borderRadius: 3,
    overflow: 'hidden',
    marginLeft: 12,
  },
  sliderProgressBar: {
    height: '100%',
    background: 'var(--orange)',
    borderRadius: 3,
    transition: 'width 0.3s ease',
  },
  sliderArrows: {
    display: 'flex',
    gap: 8,
    marginLeft: 'auto',
  },
  sliderArrow: {
    width: 44,
    height: 44,
    borderRadius: '50%',
    border: '2px solid rgba(255,255,255,0.2)',
    background: 'rgba(255,255,255,0.05)',
    color: 'var(--white)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(4px)',
  },
  sliderCounter: {
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.5)',
    fontWeight: 500,
    fontFamily: "'Inter', -apple-system, sans-serif",
    marginLeft: 16,
  },

  /* Stats bar */
  statsBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(12px)',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    zIndex: 5,
  },
  statsInner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '28px 24px',
    display: 'flex',
    justifyContent: 'center',
    gap: 80,
    flexWrap: 'wrap',
  },
  statItem: {
    textAlign: 'center' as const,
  },
  statNumber: {
    fontSize: '1.65rem',
    fontWeight: 800,
    color: 'var(--orange)',
    fontFamily: "'Inter', -apple-system, sans-serif",
  },
  statText: {
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
    fontWeight: 500,
    letterSpacing: 0.5,
  },

  /* ───────────── ABOUT SNAPSHOT ───────────── */
  aboutSection: {
    padding: '100px 0',
    background: 'var(--white)',
  },
  aboutGrid: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 60,
    alignItems: 'center',
  },
  aboutTextBlock: {},
  aboutImgPlaceholder: {
    width: '100%',
    aspectRatio: '4/3',
    background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  aboutImgIcon: {
    opacity: 0.15,
  },
  aboutImgAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    background: 'var(--orange)',
  },
  sectionLabel: {
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--orange)',
    marginBottom: 12,
    display: 'block',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  sectionTitle: {
    fontSize: 'clamp(1.75rem, 1.25rem + 1.5vw, 2.25rem)',
    color: 'var(--foreground)',
    marginBottom: 20,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: '-0.015em',
  },
  aboutParagraph: {
    fontSize: '15px',
    color: 'var(--muted-foreground)',
    lineHeight: 1.625,
    marginBottom: 16,
    fontWeight: 400,
  },
  btnNavy: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '14px 32px',
    borderRadius: 6,
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    border: 'none',
    background: 'var(--navy)',
    color: 'var(--white)',
    fontFamily: "'Inter', sans-serif",
    transition: 'all 0.3s ease',
    marginTop: 12,
    textDecoration: 'none',
  },

  /* ───────────── SERVICES ───────────── */
  servicesSection: {
    padding: '100px 0',
    background: 'var(--off-white)',
  },
  servicesContainer: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
  },
  servicesHeader: {
    textAlign: 'center' as const,
    marginBottom: 60,
  },
  sectionSubtitle: {
    fontSize: '15px',
    color: 'var(--muted-foreground)',
    maxWidth: 600,
    lineHeight: 1.625,
    margin: '0 auto',
    fontWeight: 400,
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 30,
  },
  serviceCard: {
    background: 'var(--white)',
    borderRadius: 12,
    padding: '36px 30px',
    transition: 'all 0.35s ease',
    cursor: 'pointer',
    border: '1px solid var(--light-gray)',
    position: 'relative',
    overflow: 'hidden',
  },
  serviceIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 12,
    background: 'rgba(244,127,32,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  serviceTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: 'var(--foreground)',
    marginBottom: 10,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    letterSpacing: '-0.01em',
    lineHeight: 1.25,
  },
  serviceDesc: {
    fontSize: '14px',
    color: 'var(--muted-foreground)',
    lineHeight: 1.625,
  },
  serviceAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    background: 'var(--orange)',
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.35s ease',
  },

  /* ───────────── INDUSTRIES ───────────── */
  industriesSection: {
    padding: '100px 0',
    background: 'var(--white)',
  },
  industriesContainer: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
  },
  industriesHeader: {
    textAlign: 'center' as const,
    marginBottom: 60,
  },
  industriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 30,
  },
  industryCard: {
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.35s ease',
    border: '1px solid var(--light-gray)',
    background: 'var(--white)',
  },
  industryCardImage: {
    width: '100%',
    height: 200,
    objectFit: 'cover' as const,
    display: 'block',
    transition: 'transform 0.4s ease',
  },
  industryCardBody: {
    padding: '20px 24px',
  },
  industryTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: 'var(--foreground)',
    marginBottom: 8,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    letterSpacing: '-0.01em',
    lineHeight: 1.25,
  },
  industryDesc: {
    fontSize: '14px',
    color: 'var(--muted-foreground)',
    lineHeight: 1.625,
  },

  /* ───────────── WHY CHOOSE US ───────────── */
  whySection: {
    padding: '100px 0',
    background: 'var(--navy)',
    position: 'relative',
    overflow: 'hidden',
  },
  whyBgCircle: {
    position: 'absolute',
    width: 500,
    height: 500,
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.04)',
    top: -200,
    right: -100,
  },
  whyContainer: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
    position: 'relative',
    zIndex: 1,
  },
  whyHeader: {
    textAlign: 'center' as const,
    marginBottom: 60,
  },
  whyTitleWhite: {
    fontSize: 'clamp(1.75rem, 1.25rem + 1.5vw, 2.25rem)',
    color: 'var(--white)',
    marginBottom: 20,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: '-0.015em',
  },
  whySubtitle: {
    fontSize: '15px',
    color: 'rgba(255,255,255,0.6)',
    maxWidth: 600,
    lineHeight: 1.625,
    margin: '0 auto',
    fontWeight: 400,
  },
  whyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 30,
  },
  whyCard: {
    textAlign: 'center' as const,
    padding: '36px 24px',
    borderRadius: 12,
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    transition: 'all 0.3s ease',
  },
  whyIconWrap: {
    width: 64,
    height: 64,
    borderRadius: '50%',
    background: 'rgba(244,127,32,0.12)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
  },
  whyCardTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: 'var(--white)',
    marginBottom: 10,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    letterSpacing: '-0.01em',
    lineHeight: 1.25,
  },
  whyCardDesc: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 1.625,
  },

  /* ───────────── CTA ───────────── */
  ctaSection: {
    padding: '80px 0',
    background: 'var(--off-white)',
    position: 'relative',
    overflow: 'hidden',
  },
  ctaAccentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: 'var(--orange)',
  },
  ctaContainer: {
    maxWidth: 800,
    margin: '0 auto',
    padding: '0 24px',
    textAlign: 'center' as const,
  },
  ctaHeading: {
    fontSize: 'clamp(1.75rem, 1.25rem + 1.5vw, 2.25rem)',
    color: 'var(--foreground)',
    marginBottom: 16,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: '-0.015em',
  },
  ctaSubtitle: {
    fontSize: '15px',
    color: 'var(--muted-foreground)',
    lineHeight: 1.625,
    marginBottom: 36,
    maxWidth: 580,
    margin: '0 auto 36px',
    fontWeight: 400,
  },
};

/* ─── Service data ─── */
const services = [
  {
    title: 'Audit & Assurance',
    desc: 'Independent and thorough audit services that provide stakeholders with confidence in your financial reporting and compliance.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Tax Advisory',
    desc: 'Strategic tax planning and advisory services to minimize liabilities, ensure compliance, and optimize your financial position.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <path d="M7 15h4" />
      </svg>
    ),
  },
  {
    title: 'Accounting & Bookkeeping',
    desc: 'Accurate, reliable bookkeeping and accounting services that keep your financial records organized and audit-ready.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
  },
  {
    title: 'Financial Consulting',
    desc: 'Data-driven financial consulting that helps you make informed decisions, improve cash flow, and achieve sustainable growth.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10" />
        <line x1="18" y1="20" x2="18" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    title: 'Business Advisory',
    desc: 'Expert advisory services covering strategy, operations, and growth planning to help your business reach its full potential.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: 'Risk & Compliance',
    desc: 'Comprehensive risk assessment and regulatory compliance services to protect your business and ensure operational integrity.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

/* ─── Industry data ─── */
const industries = [
  {
    title: 'Financial Services',
    desc: 'Regulatory compliance, financial reporting, and advisory for banks, insurance firms, and investment companies.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
  },
  {
    title: 'Technology',
    desc: 'Specialized accounting for tech startups and established firms including R&D credits and equity compensation.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
  },
  {
    title: 'Real Estate',
    desc: 'Property accounting, tax optimization, and financial advisory for developers, investors, and property managers.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
  },
  {
    title: 'Healthcare',
    desc: 'Financial management, billing compliance, and advisory for healthcare providers, clinics, and medical practices.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop',
  },
  {
    title: 'Manufacturing',
    desc: 'Cost accounting, inventory management, and financial planning for manufacturing and production companies.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
  },
  {
    title: 'Non-Profit',
    desc: 'Fund accounting, grant management, and compliance services tailored for non-profit organizations and foundations.',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop',
  },
];

/* ─── Why-Choose data ─── */
const pillars = [
  {
    title: 'Experienced Financial Professionals',
    desc: 'Our team of certified accountants and advisors brings decades of combined experience across diverse industries.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Trusted Advisory Services',
    desc: 'We build lasting partnerships based on transparency, reliability, and a genuine commitment to your success.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Strategic Financial Insight',
    desc: 'We go beyond numbers to provide actionable insights that drive smarter decisions and stronger financial outcomes.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="8" y1="11" x2="14" y2="11" />
        <line x1="11" y1="8" x2="11" y2="14" />
      </svg>
    ),
  },
  {
    title: 'Client-Centered Approach',
    desc: 'Every engagement is tailored to your unique goals, ensuring personalized strategies and measurable results.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

/* ═══════════════════ COMPONENT ═══════════════════ */

const SLIDE_INTERVAL = 5000;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setProgress(0);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning]
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % heroSlides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
  }, [currentSlide, goToSlide]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 100 / (SLIDE_INTERVAL / 50);
      });
    }, 50);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = heroSlides[currentSlide];

  /* ─── Responsive overrides ─── */
  const rHero: React.CSSProperties = {
    ...styles.hero,
    ...(isMobile ? { minHeight: 'auto', padding: '120px 0 100px' } : {}),
  };
  const rHeroHeading: React.CSSProperties = {
    ...styles.heroHeading,
    ...(isMobile ? { fontSize: 'clamp(1.5rem, 1rem + 3vw, 2.2rem)' } : {}),
  };
  const rHeroSubtitle: React.CSSProperties = {
    ...styles.heroSubtitle,
    ...(isMobile ? { fontSize: '15px' } : {}),
  };
  const rHeroBtns: React.CSSProperties = {
    ...styles.heroBtns,
    ...(isMobile ? { flexDirection: 'column', width: '100%' } : {}),
  };
  const rBtnOrange: React.CSSProperties = {
    ...styles.btnOrange,
    ...(isMobile ? { width: '100%', justifyContent: 'center' } : {}),
  };
  const rBtnOutlineWhite: React.CSSProperties = {
    ...styles.btnOutlineWhite,
    ...(isMobile ? { width: '100%', justifyContent: 'center' } : {}),
  };
  const rStatsInner: React.CSSProperties = {
    ...styles.statsInner,
    ...(isMobile ? { gap: 30, padding: '20px 16px' } : isTablet ? { gap: 40 } : {}),
  };
  const rSliderControls: React.CSSProperties = {
    ...styles.sliderControls,
    ...(isMobile ? { bottom: 20 } : {}),
  };
  const rSliderControlsInner: React.CSSProperties = {
    ...styles.sliderControlsInner,
    ...(isMobile ? { padding: '0 16px', gap: 10 } : {}),
  };
  const rSliderCounter: React.CSSProperties = {
    ...styles.sliderCounter,
    ...(isMobile ? { display: 'none' } : {}),
  };
  const rAboutSection: React.CSSProperties = {
    ...styles.aboutSection,
    ...(isMobile ? { padding: '60px 0' } : {}),
  };
  const rAboutGrid: React.CSSProperties = {
    ...styles.aboutGrid,
    ...(isMobile ? { gridTemplateColumns: '1fr', gap: 30, padding: '0 16px' } : {}),
  };
  const rServicesSection: React.CSSProperties = {
    ...styles.servicesSection,
    ...(isMobile ? { padding: '60px 0' } : {}),
  };
  const rServicesContainer: React.CSSProperties = {
    ...styles.servicesContainer,
    ...(isMobile ? { padding: '0 16px' } : {}),
  };
  const rServicesGrid: React.CSSProperties = {
    ...styles.servicesGrid,
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
  };
  const rIndustriesSection: React.CSSProperties = {
    ...styles.industriesSection,
    ...(isMobile ? { padding: '60px 0' } : {}),
  };
  const rIndustriesContainer: React.CSSProperties = {
    ...styles.industriesContainer,
    ...(isMobile ? { padding: '0 16px' } : {}),
  };
  const rIndustriesGrid: React.CSSProperties = {
    ...styles.industriesGrid,
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
  };
  const rWhySection: React.CSSProperties = {
    ...styles.whySection,
    ...(isMobile ? { padding: '60px 0' } : {}),
  };
  const rWhyContainer: React.CSSProperties = {
    ...styles.whyContainer,
    ...(isMobile ? { padding: '0 16px' } : {}),
  };
  const rWhyGrid: React.CSSProperties = {
    ...styles.whyGrid,
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
  };
  const rCtaSection: React.CSSProperties = {
    ...styles.ctaSection,
    ...(isMobile ? { padding: '60px 0' } : {}),
  };
  const rCtaContainer: React.CSSProperties = {
    ...styles.ctaContainer,
    ...(isMobile ? { padding: '0 16px' } : {}),
  };
  const rHeroContainer: React.CSSProperties = {
    ...styles.heroContainer,
    ...(isMobile ? { padding: '0 16px' } : {}),
  };

  return (
    <>
      <Helmet>
        <title>Amara Partners | Trusted Accounting, Tax & Advisory Firm in Kampala, Uganda</title>
        <meta name="description" content="Amara Partners is a leading accounting firm in Kampala, Uganda offering professional audit & assurance, tax planning, bookkeeping, payroll, business advisory, and risk & compliance services. Trusted by 500+ clients across East Africa." />
        <meta name="keywords" content="accounting firm Kampala, tax advisory Uganda, audit services Kampala, bookkeeping Uganda, business advisory East Africa, payroll services Uganda, financial consulting Kampala, Amara Partners, certified public accountants Uganda, ICPAU registered firm, URA tax compliance, NSSF payroll Uganda, IFRS reporting Uganda, trusted accountants Kampala" />
        <link rel="canonical" href="https://www.amara-partners.com/" />
        <meta property="og:title" content="Amara Partners | Trusted Accounting & Advisory Firm in Uganda" />
        <meta property="og:description" content="Professional accounting, audit, tax planning, bookkeeping, and business advisory services in Kampala, Uganda." />
        <meta property="og:url" content="https://www.amara-partners.com/" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ──────── HERO SLIDER ──────── */}
      <section style={rHero}>
        {/* Background image per slide */}
        {heroSlides.map((s, i) => (
          <div
            key={i}
            style={{
              ...styles.heroBgImage,
              backgroundImage: `url(${s.image})`,
              opacity: i === currentSlide ? 1 : 0,
            }}
          />
        ))}

        {/* Dark overlay for readability */}
        <div style={styles.heroOverlay} />

        {/* Decorative elements */}
        <div style={styles.heroClip} />
        <div style={styles.heroDecoCircle} />
        <div style={styles.heroDecoCircle2} />
        <div style={styles.heroDecoDiamond} />
        <div style={styles.heroDecoLine} />
        <div style={styles.heroDecoPlus}>+</div>

        {/* Slide-specific large icon */}
        <div style={styles.heroSlideIcon}>{slide.icon}</div>

        <div style={rHeroContainer}>
          <div
            key={currentSlide}
            style={{
              ...styles.heroContent,
              animation: 'heroFadeIn 0.6s ease forwards',
            }}
          >
            <span style={styles.heroLabel}>{slide.label}</span>
            <h1 style={rHeroHeading}>{slide.heading}</h1>
            <p style={rHeroSubtitle}>{slide.subtitle}</p>
            <div style={rHeroBtns}>
              <button style={rBtnOrange} onClick={() => navigate(slide.btnLink)}>
                {slide.btnText}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <button
                style={rBtnOutlineWhite}
                onClick={() => navigate('/contact')}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        <div style={rSliderControls}>
          <div style={rSliderControlsInner}>
            {heroSlides.map((_, i) => (
              <button
                key={i}
                style={
                  i === currentSlide ? styles.sliderDotActive : styles.sliderDot
                }
                onClick={() => goToSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
            <div style={styles.sliderProgress}>
              <div
                style={{
                  ...styles.sliderProgressBar,
                  width: `${progress}%`,
                }}
              />
            </div>
            <div style={styles.sliderArrows}>
              <button
                style={styles.sliderArrow}
                onClick={prevSlide}
                aria-label="Previous slide"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.borderColor = 'var(--orange)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                style={styles.sliderArrow}
                onClick={nextSlide}
                aria-label="Next slide"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.borderColor = 'var(--orange)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* ──────── ABOUT SNAPSHOT ──────── */}
      <section style={rAboutSection}>
        <div style={rAboutGrid}>
          <div style={styles.aboutTextBlock}>
            <span style={styles.sectionLabel}>About Us</span>
            <h2 style={styles.sectionTitle}>
              Financial Excellence Built on Trust &amp; Integrity
            </h2>
            <p style={styles.aboutParagraph}>
              At Amara Partners, we are a dedicated team of financial professionals committed
              to delivering exceptional accounting, tax, and advisory services. With a
              client-first philosophy, we work closely with businesses and individuals to
              navigate complex financial landscapes with confidence and clarity.
            </p>
            <p style={styles.aboutParagraph}>
              Our commitment to integrity, accuracy, and proactive financial guidance has made
              us a trusted partner for hundreds of businesses. We believe that sound financial
              management is the foundation of lasting success, and we are here to help you
              build it.
            </p>
            <Link to="/about" style={styles.btnNavy}>
              Learn More
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          <div style={styles.aboutImgPlaceholder}>
            <svg style={styles.aboutImgIcon} width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="var(--white)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
              <line x1="7" y1="8" x2="7" y2="13" />
              <line x1="10" y1="10" x2="10" y2="13" />
              <line x1="13" y1="6" x2="13" y2="13" />
              <line x1="16" y1="9" x2="16" y2="13" />
            </svg>
            <div style={styles.aboutImgAccent} />
          </div>
        </div>
      </section>

      {/* ──────── CORE SERVICES PREVIEW ──────── */}
      <section style={rServicesSection}>
        <div style={rServicesContainer}>
          <div style={styles.servicesHeader}>
            <span style={styles.sectionLabel}>Our Services</span>
            <h2 style={styles.sectionTitle}>Comprehensive Financial Solutions</h2>
            <p style={styles.sectionSubtitle}>
              From audit and assurance to strategic advisory, we deliver end-to-end financial
              services designed to drive growth and ensure compliance.
            </p>
          </div>

          <div style={rServicesGrid}>
            {services.map((svc) => (
              <div
                key={svc.title}
                style={styles.serviceCard}
                onMouseEnter={(e) => {
                  const card = e.currentTarget;
                  card.style.transform = 'translateY(-6px)';
                  card.style.boxShadow = '0 16px 40px rgba(4,48,73,0.1)';
                  const accent = card.querySelector('[data-accent]') as HTMLElement | null;
                  if (accent) accent.style.transform = 'scaleX(1)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget;
                  card.style.transform = 'translateY(0)';
                  card.style.boxShadow = 'none';
                  const accent = card.querySelector('[data-accent]') as HTMLElement | null;
                  if (accent) accent.style.transform = 'scaleX(0)';
                }}
              >
                <div data-accent style={styles.serviceAccent} />
                <div style={styles.serviceIconWrap}>{svc.icon}</div>
                <h3 style={styles.serviceTitle}>{svc.title}</h3>
                <p style={styles.serviceDesc}>{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── INDUSTRIES ──────── */}
      <section style={rIndustriesSection}>
        <div style={rIndustriesContainer}>
          <div style={styles.industriesHeader}>
            <span style={styles.sectionLabel}>Industries We Serve</span>
            <h2 style={styles.sectionTitle}>Expertise Across Key Industries</h2>
            <p style={styles.sectionSubtitle}>
              We bring deep domain knowledge to every engagement, delivering tailored
              financial solutions for a diverse range of sectors.
            </p>
          </div>

          <div style={rIndustriesGrid}>
            {industries.map((ind) => (
              <div
                key={ind.title}
                style={styles.industryCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(4,48,73,0.12)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                <div style={{ overflow: 'hidden' }}>
                  <img
                    src={ind.image}
                    alt={ind.title}
                    style={styles.industryCardImage}
                    loading="lazy"
                  />
                </div>
                <div style={styles.industryCardBody}>
                  <h3 style={styles.industryTitle}>{ind.title}</h3>
                  <p style={styles.industryDesc}>{ind.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── WHY CHOOSE US ──────── */}
      <section style={rWhySection}>
        <div style={styles.whyBgCircle} />
        <div style={rWhyContainer}>
          <div style={styles.whyHeader}>
            <span style={{ ...styles.sectionLabel, color: 'var(--orange)' }}>
              Why Choose Us
            </span>
            <h2 style={styles.whyTitleWhite}>The Amara Partners Difference</h2>
            <p style={styles.whySubtitle}>
              We combine deep expertise with a personal touch, delivering financial services
              that create real, lasting value for our clients.
            </p>
          </div>

          <div style={rWhyGrid}>
            {pillars.map((p) => (
              <div
                key={p.title}
                style={styles.whyCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(244,127,32,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                }}
              >
                <div style={styles.whyIconWrap}>{p.icon}</div>
                <h3 style={styles.whyCardTitle}>{p.title}</h3>
                <p style={styles.whyCardDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── OUR PARTNERS ──────── */}
      <section style={{
        padding: isMobile ? '50px 0' : '80px 0',
        background: 'var(--off-white)',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: isMobile ? '0 16px' : '0 24px',
          textAlign: 'center' as const,
        }}>
          <span style={styles.sectionLabel}>Our Partners</span>
          <h2 style={{ ...styles.sectionTitle, textAlign: 'center' as const }}>
            Trusted By Leading Organizations
          </h2>
          <p style={{
            ...styles.sectionSubtitle,
            margin: '0 auto 48px',
            textAlign: 'center' as const,
          }}>
            We are proud to collaborate with organizations that share our commitment to
            financial excellence and integrity.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)',
            gap: isMobile ? 16 : 24,
            alignItems: 'center',
          }}>
            {[
              { name: 'ICPAU', full: 'Institute of Certified Public Accountants of Uganda' },
              { name: 'URA', full: 'Uganda Revenue Authority' },
              { name: 'URSB', full: 'Uganda Registration Services Bureau' },
              { name: 'NSSF', full: 'National Social Security Fund' },
              { name: 'IFRS', full: 'International Financial Reporting Standards' },
              { name: 'ACCA', full: 'Association of Chartered Certified Accountants' },
            ].map((partner) => (
              <div
                key={partner.name}
                style={{
                  background: 'var(--white)',
                  borderRadius: 10,
                  padding: isMobile ? '20px 12px' : '28px 20px',
                  border: '1px solid var(--light-gray)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                  minHeight: isMobile ? 90 : 110,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(4,48,73,0.08)';
                  e.currentTarget.style.borderColor = 'var(--orange)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--light-gray)';
                }}
              >
                <span style={{
                  fontSize: isMobile ? '18px' : '22px',
                  fontWeight: 800,
                  color: 'var(--navy)',
                  letterSpacing: '0.05em',
                  fontFamily: "'Inter', -apple-system, sans-serif",
                }}>
                  {partner.name}
                </span>
                <span style={{
                  fontSize: '11px',
                  color: 'var(--muted-foreground)',
                  lineHeight: 1.3,
                  textAlign: 'center' as const,
                }}>
                  {partner.full}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── CTA (navy, matching other pages) ──────── */}
      <section style={{
        background: 'var(--navy)',
        padding: isMobile ? '50px 16px' : '80px 24px',
        textAlign: 'center' as const,
        position: 'relative' as const,
        overflow: 'hidden',
      }}>
        {/* Decorative circle rings */}
        {[
          { size: 300, top: '-60px', left: '-80px', opacity: 0.12, bw: 2 },
          { size: 200, top: '30%', right: '-60px', opacity: 0.1, bw: 1.5 },
          { size: 400, top: '-100px', right: '10%', opacity: 0.08, bw: 2.5 },
          { size: 150, bottom: '-40px', left: '20%', opacity: 0.14, bw: 1.5 },
          { size: 250, bottom: '-80px', right: '25%', opacity: 0.1, bw: 2 },
          { size: 180, top: '50%', left: '40%', opacity: 0.08, bw: 1 },
        ].map((r, i) => (
          <div key={i} style={{
            position: 'absolute' as const,
            width: r.size, height: r.size,
            borderRadius: '50%',
            border: `${r.bw}px solid rgba(255,255,255,${r.opacity})`,
            top: r.top, left: r.left, right: (r as any).right, bottom: (r as any).bottom,
            pointerEvents: 'none' as const, zIndex: 0,
          }} />
        ))}
        <h2 style={{
          fontSize: 'clamp(1.75rem, 1.25rem + 1.5vw, 2.25rem)',
          fontWeight: 700,
          color: 'var(--white)',
          margin: '0 0 16px',
          lineHeight: 1.15,
          letterSpacing: '-0.015em',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          position: 'relative' as const,
          zIndex: 1,
        }}>
          Need Expert Financial Guidance?
        </h2>
        <p style={{
          fontSize: '15px',
          lineHeight: 1.625,
          fontWeight: 400,
          color: 'rgba(255,255,255,0.75)',
          maxWidth: 540,
          margin: '0 auto 36px',
          position: 'relative' as const,
          zIndex: 1,
        }}>
          Whether you need audit support, tax planning, or strategic advisory, our team is
          ready to help you navigate your financial future with confidence.
        </p>
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '16px 44px',
            fontSize: 16,
            fontWeight: 600,
            color: 'var(--white)',
            background: 'var(--orange)',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            transition: 'background 0.25s, transform 0.2s',
            fontFamily: "'Inter', -apple-system, sans-serif",
            position: 'relative' as const,
            zIndex: 1,
          }}
          onClick={() => navigate('/contact')}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#e0710f';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--orange)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Contact Us
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </section>
    </>
  );
};

export default Home;
