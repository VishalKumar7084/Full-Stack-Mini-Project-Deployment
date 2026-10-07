import React from 'react';
import { ArrowRight, ArrowUpRight, Check, Compass, Award, TrendingUp, Sparkles } from 'lucide-react';

export default function VantageLanding({ onOpenWorkspace, onSignIn, onScrollToArchitecture }) {
  return (
    <div>
      {/* ====================================================================
          1. EDITORIAL HERO SECTION
          ==================================================================== */}
      <section className="hero-block">
        <div>
          <div className="kicker-tag">
            <span className="kicker-dot" />
            <span>THE INTENTIONAL SEARCH SYSTEM</span>
          </div>

          <h1 className="hero-editorial-title">
            Turn opportunities into momentum.<br />
            <span className="serif-accent">From first look to final offer.</span>
          </h1>

          <p className="hero-lead-text">
            Vantage is the modern operating system for your career trajectory. Keep every application, interview round, and compensation detail in sharp, actionable focus.
          </p>

          <div className="hero-cta-group">
            <button
              id="hero-launch-workspace-btn"
              className="btn-pill-primary"
              onClick={onOpenWorkspace}
            >
              <span>Launch Workspace</span>
              <ArrowRight size={16} />
            </button>

            <button
              id="hero-explore-architecture-btn"
              className="btn-pill-secondary"
              onClick={onScrollToArchitecture}
            >
              <span>Explore The Architecture</span>
            </button>
          </div>

          <div className="credibility-strip">
            <div className="initials-cluster">
              <span className="initial-pill">S</span>
              <span className="initial-pill">G</span>
              <span className="initial-pill">V</span>
              <span className="initial-pill">+</span>
            </div>
            <span>Engineered for high-agency candidates targeting top roles.</span>
          </div>
        </div>

        {/* Right Interactive Visual Showcase */}
        <div className="hero-stage-canvas">
          <div className="backdrop-orb" />
          <div className="backdrop-rings" />

          {/* Paper Sheet Preview Card */}
          <div className="parchment-sheet-card">
            <div className="sheet-header-meta">THIS WEEK'S MOMENTUM</div>
            <h3 className="sheet-main-heading">Active Pipeline Loops</h3>

            <div className="sheet-flow-list">
              <div className="flow-step-item">
                <div className="flow-icon-circle">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span>Stripe • Technical Architecture passed</span>
              </div>

              <div className="flow-step-item">
                <span className="flow-dot amber" />
                <span>Google • Algorithmic Round tomorrow</span>
              </div>

              <div className="flow-step-item">
                <span className="flow-dot gray" />
                <span>Vercel • Engineering Discussion prep</span>
              </div>
            </div>
          </div>

          {/* Floating Chip: Offer Received */}
          <div className="floating-sheet-chip chip-saved-role">
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: 'var(--sage-badge-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--sage-badge-text)'
              }}
            >
              <Award size={16} />
            </div>
            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--pine-800)' }}>
                Offer Extended
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                $55/hr • Summer 2026
              </div>
            </div>
          </div>

          {/* Floating Chip: Velocity */}
          <div className="floating-sheet-chip chip-velocity">
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: 'var(--amber-badge-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--copper-600)'
              }}
            >
              <Compass size={16} />
            </div>
            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--pine-800)' }}>
                Velocity Index
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                84% Response Rate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Ribbon */}
      <div className="feature-ticker-ribbon">
        <span>STRUCTURED PIPELINE</span>
        <span>———</span>
        <span>COMPENSATION INTELLIGENCE</span>
        <span>———</span>
        <span>MULTI-ROUND INTERVIEW CRM</span>
        <span>———</span>
        <span>ZERO SPREADSHEET NOISE</span>
      </div>

      {/* ====================================================================
          2. CAPABILITIES / PHILOSOPHY SECTION
          ==================================================================== */}
      <section id="the-architecture-section" className="pillars-section">
        <div className="pillar-meta-col">
          <div className="pillar-index-tag">01 / THE ARCHITECTURE</div>
          <div className="pillar-star-symbol">✱</div>
        </div>

        <div>
          <h2 className="pillar-main-heading">
            Keep the momentum.<br />
            <span className="accent-italic">Keep your conviction clear.</span>
          </h2>

          <p className="pillar-intro-text">
            Modern hiring runs across multiple parallel stages: resume screens, take-home exercises, algorithmic assessments, and executive conversations. Vantage anchors each opportunity in structured clarity so no lead falls behind.
          </p>

          <div className="pillar-breakdown-list">
            <div className="pillar-row-item" onClick={onOpenWorkspace}>
              <span className="row-num">01</span>
              <div className="row-headline">
                <h4>Visual Pipeline Orchestration</h4>
                <p>Move fluidly through Wishlist, Applied, Active Interviewing, Offer, and Retrospective.</p>
              </div>
              <div className="row-action-arrow">
                <ArrowUpRight size={19} />
              </div>
            </div>

            <div className="pillar-row-item" onClick={onOpenWorkspace}>
              <span className="row-num">02</span>
              <div className="row-headline">
                <h4>Multi-Round Interview Manager</h4>
                <p>Attach notes, specific round names, scheduled dates, and interview questions directly to each company.</p>
              </div>
              <div className="row-action-arrow">
                <ArrowUpRight size={19} />
              </div>
            </div>

            <div className="pillar-row-item" onClick={onOpenWorkspace}>
              <span className="row-num">03</span>
              <div className="row-headline">
                <h4>Funnel Velocity & Compensation Analytics</h4>
                <p>Understand your true conversion metrics, work model breakdown (Remote vs. Hybrid), and offer rates.</p>
              </div>
              <div className="row-action-arrow">
                <ArrowUpRight size={19} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. EDITORIAL QUOTE BANNER
          ==================================================================== */}
      <div className="quote-highlight-container">
        <div className="quote-canvas-card">
          <div className="quote-arc-lines" />
          <span className="quote-stylized-mark">“</span>
          <h3 className="quote-heroic-phrase">
            The best career decisions come from the clearest pipelines.
          </h3>
          <div className="quote-attribution">PRECISION IN MOTION • VANTAGE OPERATING SYSTEM</div>
        </div>
      </div>

      {/* ====================================================================
          4. CONVERSION LOWER BANNER
          ==================================================================== */}
      <section className="conversion-lower-banner">
        <div className="conversion-title-group">
          <div className="kicker-tag" style={{ marginBottom: '0.85rem' }}>
            <span className="kicker-dot" />
            <span>READY WHEN YOU ARE</span>
          </div>
          <h2>
            Build your search<br />
            with <span className="serif-italic">total confidence.</span>
          </h2>
        </div>

        <button
          id="btn-create-workspace-cta"
          className="btn-pill-primary"
          style={{ padding: '0.85rem 1.85rem', fontSize: '1rem' }}
          onClick={onOpenWorkspace}
        >
          <span>Open Interactive Workspace</span>
          <ArrowRight size={18} />
        </button>
      </section>
    </div>
  );
}
