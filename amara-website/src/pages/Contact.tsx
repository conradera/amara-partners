import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useIsMobile } from '../hooks/useIsMobile';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

const Contact: React.FC = () => {
  const isMobile = useIsMobile();

  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Thank you, ${form.name}! Your message has been received. An Amara Partners team member will be in touch shortly.`
    );
    setForm({ name: '', email: '', phone: '', company: '', message: '' });
  };

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
      maxWidth: 600,
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

    /* ─── Contact Section ─── */
    contactSection: {
      backgroundColor: '#F7F9FC',
      padding: isMobile ? '40px 16px 60px' : '80px 24px 100px',
    },
    contactContainer: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: isMobile ? '0 16px' : undefined,
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr',
      gap: isMobile ? 24 : 48,
      alignItems: 'start',
    },

    /* ─── Left: Info ─── */
    infoSide: {
      backgroundColor: '#043049',
      borderRadius: 12,
      padding: isMobile ? '28px 20px' : '40px 32px',
      color: '#FFFFFF',
    },
    infoTitle: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: 'clamp(1.75rem, 1.25rem + 1.5vw, 2.25rem)',
      fontWeight: 700,
      margin: '0 0 8px',
      color: '#FFFFFF',
      lineHeight: 1.15,
      letterSpacing: '-0.015em',
    },
    infoSubtitle: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '15px',
      fontWeight: 400,
      color: 'rgba(255, 255, 255, 0.7)',
      margin: '0 0 32px',
      lineHeight: 1.625,
    },
    infoBlock: {
      marginBottom: 28,
    },
    infoLabel: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '12px',
      fontWeight: 700,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.1em',
      color: '#F47F20',
      marginBottom: 8,
    },
    infoText: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '15px',
      lineHeight: 1.625,
      fontWeight: 400,
      color: 'rgba(255, 255, 255, 0.9)',
      margin: 0,
    },
    infoLink: {
      color: 'rgba(255, 255, 255, 0.9)',
      textDecoration: 'none',
      transition: 'color 0.2s ease',
    },
    infoDivider: {
      border: 'none',
      borderTop: '1px solid rgba(255, 255, 255, 0.12)',
      margin: '28px 0',
    },
    hoursGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '6px 16px',
      fontSize: 14,
    },
    hoursDay: {
      color: 'rgba(255, 255, 255, 0.6)',
    },
    hoursTime: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontWeight: 500,
      textAlign: 'right' as const,
    },

    /* ─── Right: Form ─── */
    formSide: {
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      padding: isMobile ? '28px 20px' : '40px 36px',
      boxShadow: '0 2px 16px rgba(0, 0, 0, 0.06)',
    },
    formTitle: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: 'clamp(1.75rem, 1.25rem + 1.5vw, 2.25rem)',
      fontWeight: 700,
      color: 'var(--foreground)',
      margin: '0 0 4px',
      lineHeight: 1.15,
      letterSpacing: '-0.015em',
    },
    formSubtitle: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '15px',
      fontWeight: 400,
      color: 'var(--muted-foreground)',
      margin: '0 0 28px',
      lineHeight: 1.625,
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: 16,
      marginBottom: 16,
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
      marginBottom: 16,
    },
    label: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '12px',
      fontWeight: 700,
      letterSpacing: '0.1em',
      color: '#2B2B2B',
      marginBottom: 6,
    },
    required: {
      color: '#D82929',
      marginLeft: 2,
    },
    input: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      padding: '12px 14px',
      fontSize: '15px',
      lineHeight: 1.625,
      border: '1.5px solid #E5E7EB',
      borderRadius: 6,
      outline: 'none',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      color: '#2B2B2B',
      backgroundColor: '#FFFFFF',
    },
    textarea: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      padding: '12px 14px',
      fontSize: '15px',
      lineHeight: 1.625,
      border: '1.5px solid #E5E7EB',
      borderRadius: 6,
      outline: 'none',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      color: '#2B2B2B',
      backgroundColor: '#FFFFFF',
      resize: 'vertical' as const,
      minHeight: 120,
    },
    submitButton: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      width: '100%',
      padding: '14px 24px',
      backgroundColor: '#F47F20',
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 600,
      border: 'none',
      borderRadius: 6,
      cursor: 'pointer',
      transition: 'background-color 0.2s ease, transform 0.2s ease',
      marginTop: 8,
    },

    /* ─── Map Placeholder ─── */
    mapSection: {
      padding: isMobile ? '0 16px 48px' : '0 24px 80px',
      backgroundColor: '#F7F9FC',
    },
    mapContainer: {
      maxWidth: 1200,
      margin: '0 auto',
    },
    mapPlaceholder: {
      width: '100%',
      height: isMobile ? 200 : 320,
      backgroundColor: '#E5E7EB',
      borderRadius: 12,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column' as const,
      gap: 12,
    },
    mapIcon: {
      color: '#6B7280',
    },
    mapText: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '18px',
      fontWeight: 600,
      color: 'var(--muted-foreground)',
      margin: 0,
    },
    mapSubtext: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '14px',
      lineHeight: 1.625,
      color: '#9CA3AF',
      margin: 0,
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
      fontWeight: 400,
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: 1.625,
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

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = '#F47F20';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(244, 127, 32, 0.12)';
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = '#E5E7EB';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <div>
      <Helmet>
        <title>Contact Us | Amara Partners - Get In Touch for a Free Consultation</title>
        <meta name="description" content="Contact Amara Partners for professional accounting, tax, and advisory services in Kampala, Uganda. Visit us at Bulabira Road, Najjera or call +256 757 813787. Book a free, no-obligation consultation with our certified accountants today." />
        <meta name="keywords" content="contact Amara Partners, accounting firm Kampala address, free consultation accountant Uganda, hire accountant Kampala, tax advisor contact Uganda, bookkeeper Kampala phone number, Bulabira Road Najjera accountants, accounting firm near me Uganda, schedule consultation accountant" />
        <link rel="canonical" href="https://www.amara-partners.com/contact" />
        <meta property="og:title" content="Contact Amara Partners | Free Consultation in Kampala" />
        <meta property="og:description" content="Get in touch with Amara Partners. Call +256 757 813787 or visit our Kampala office for expert accounting and advisory services." />
        <meta property="og:url" content="https://www.amara-partners.com/contact" />
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
            <span style={styles.breadcrumbCurrent}>Contact Us</span>
          </nav>
          <h1 style={styles.heroTitle}>Contact Us</h1>
          <p style={styles.heroSubtitle}>
            Have a question or ready to get started? Reach out to the Amara Partners
            team and let us know how we can help your business thrive.
          </p>
        </div>
        <div style={styles.heroAngle} />
      </section>

      {/* ─── Contact Info + Form ─── */}
      <section style={styles.contactSection}>
        <div style={styles.contactContainer}>
          {/* Left: Contact Details */}
          <div style={styles.infoSide}>
            <h2 style={styles.infoTitle}>Get in Touch</h2>
            <p style={styles.infoSubtitle}>
              We would love to hear from you. Reach out using any of the methods
              below or fill out the form.
            </p>

            <div style={styles.infoBlock}>
              <p style={styles.infoLabel}>Office Address</p>
              <p style={styles.infoText}>
                Amara Partners LLP
                <br />
                Bulabira Road, Najjera, Kampala, Uganda
                <br />
                P.O. Box 152713, Kampala
              </p>
            </div>

            <div style={styles.infoBlock}>
              <p style={styles.infoLabel}>Phone</p>
              <p style={styles.infoText}>
                <a
                  href="tel:+256757813787"
                  style={styles.infoLink}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#F47F20';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255, 255, 255, 0.9)';
                  }}
                >
                  +256 757 813787
                </a>
              </p>
            </div>

            <div style={styles.infoBlock}>
              <p style={styles.infoLabel}>Email</p>
              <p style={styles.infoText}>
                <a
                  href="mailto:admin@amara-partners.com"
                  style={styles.infoLink}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#F47F20';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255, 255, 255, 0.9)';
                  }}
                >
                  admin@amara-partners.com
                </a>
              </p>
            </div>

            <hr style={styles.infoDivider} />

            <div>
              <p style={styles.infoLabel}>Office Hours</p>
              <div style={styles.hoursGrid}>
                <span style={styles.hoursDay}>Monday - Friday</span>
                <span style={styles.hoursTime}>8:00 AM - 6:00 PM</span>
                <span style={styles.hoursDay}>Saturday</span>
                <span style={styles.hoursTime}>9:00 AM - 1:00 PM</span>
                <span style={styles.hoursDay}>Sunday</span>
                <span style={styles.hoursTime}>Closed</span>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div style={styles.formSide}>
            <h2 style={styles.formTitle}>Send Us a Message</h2>
            <p style={styles.formSubtitle}>
              Fill out the form below and we will get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={styles.formRow}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={styles.label}>
                    Full Name<span style={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder="John Doe"
                    required
                    style={styles.input}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={styles.label}>
                    Email Address<span style={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder="john@company.com"
                    required
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={styles.label}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder="+256 757 813787"
                    style={styles.input}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={styles.label}>Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder="Your Company Ltd"
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Message<span style={styles.required}>*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder="Tell us about your business needs and how we can help..."
                  required
                  style={styles.textarea}
                />
              </div>

              <button
                type="submit"
                style={styles.submitButton}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#e06d10';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#F47F20';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── Map Placeholder ─── */}
      <section style={styles.mapSection}>
        <div style={styles.mapContainer}>
          <div style={styles.mapPlaceholder}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              style={styles.mapIcon}
            >
              <path
                d="M24 4C16.27 4 10 10.27 10 18C10 28.5 24 44 24 44C24 44 38 28.5 38 18C38 10.27 31.73 4 24 4Z"
                stroke="#6B7280"
                strokeWidth="2.5"
                fill="none"
              />
              <circle cx="24" cy="18" r="5" stroke="#6B7280" strokeWidth="2.5" fill="none" />
            </svg>
            <p style={styles.mapText}>Map Location</p>
            <p style={styles.mapSubtext}>
              Bulabira Road, Najjera, Kampala, Uganda
            </p>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={styles.cta}>
        {/* Decorative circle rings */}
        {[
          { size: 300, top: '-70px', left: '-60px', opacity: 0.12, bw: 2 },
          { size: 210, top: '20%', right: '-60px', opacity: 0.1, bw: 1.5 },
          { size: 370, top: '-80px', right: '12%', opacity: 0.08, bw: 2.5 },
          { size: 150, bottom: '-40px', left: '22%', opacity: 0.14, bw: 1.5 },
          { size: 250, bottom: '-70px', right: '28%', opacity: 0.1, bw: 2 },
          { size: 170, top: '45%', left: '48%', opacity: 0.08, bw: 1 },
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
          <h2 style={styles.ctaTitle}>Schedule a Consultation</h2>
          <p style={styles.ctaText}>
            Book a free, no-obligation consultation with one of our accounting
            experts. We will review your current financial setup and recommend a
            tailored plan to help you reach your goals.
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
            Book a Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Contact;
