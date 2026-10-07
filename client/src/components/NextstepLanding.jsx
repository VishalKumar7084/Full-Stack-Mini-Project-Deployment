import React from 'react';
import { ArrowRight, ArrowUpRight, Check, Target, Compass } from 'lucide-react';

export default function NextstepLanding({ onStartTracking, onSignIn, onHowItWorks }) {
  return (
    <div>
      {/* ====================================================================
          1. HERO SECTION (Screenshot 3)
          ==================================================================== */}
      <section className="hero-section">
        {/* Left Content */}
        <div>
          <div className="tagline-badge">
            <span className="tagline-dot" />
            <span>YOUR NEXT CHAPTER, IN MOTION</span>
          </div>

          <h1 className="hero-main-title">
            Good<br />
            opportunities<br />
            deserve good<br />
            <span className="copper-text">follow-through.</span>
          </h1>

          <p className="hero-description">
            A clear place to keep every application, next step, and deadline in view. Make the search feel a little less like a juggling act.
          </p>

          <div className="hero-actions-row">
            <button
              id="hero-start-tracking-btn"
              className="btn-forest-pill"
              onClick={onStartTracking}
            >
              <span>Start tracking</span>
              <ArrowRight size={16} />
            </button>

            <button
              id="hero-have-account-btn"
              className="btn-outline-pill"
              onClick={onSignIn}
            >
              <span>I have an account</span>
            </button>
          </div>

          {/* Social Proof */}
          <div className="social-proof-bar">
            <div className="avatar-stack">
              <span className="avatar-bubble">J</span>
              <span className="avatar-bubble">M</span>
              <span className="avatar-bubble">A</span>
              <span className="avatar-bubble">+</span>
            </div>
            <span>Built for the whole search, not just the application.</span>
          </div>
        </div>

        {/* Right Visual Graphic (Screenshot 3) */}
        <div className="hero-visual-canvas">
          {/* Decorative Background Elements */}
          <div className="decor-sun" />
          <div className="decor-circle-rings" />

          {/* Paper Card */}
          <div className="hero-paper-card">
            <div className="paper-card-pretitle">THE WEEK AHEAD</div>
            <h3 className="paper-card-title">A little progress adds up.</h3>

            <div className="paper-todo-list">
              <div className="paper-todo-item">
                <div className="todo-check-icon">
                  <Check size={11} strokeWidth={3} />
                </div>
                <span>Follow up with design team</span>
              </div>

              <div className="paper-todo-item">
                <span className="todo-dot amber" />
                <span>Prep for product interview</span>
              </div>

              <div className="paper-todo-item">
                <span className="todo-dot gray" />
                <span>Review new roles</span>
              </div>
            </div>
          </div>

          {/* Floating Badge: Application Saved */}
          <div className="floating-badge badge-saved-app">
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'var(--sage-tint)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--sage-text)'
              }}
            >
              <Check size={16} strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--forest-green)' }}>
                Application saved
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Your context stays with it
              </div>
            </div>
          </div>

          {/* Floating Badge: Keep Momentum */}
          <div className="floating-badge badge-momentum">
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: '#FAF3E3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--copper-gold)'
              }}
            >
              <Compass size={16} />
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--forest-green)' }}>
                Keep momentum
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                One next step at a time
              </div>
            </div>
          </div>

          {/* Subtle text */}
          <div className="subtle-badge-text">A SEARCH WITH SHAPE</div>
        </div>
      </section>

      {/* Ticker Bar (Screenshot 3 bottom) */}
      <div className="ticker-bar">
        <span>ONE HOME FOR THE SEARCH</span>
        <span>———</span>
        <span>LESS MENTAL TAB-SWITCHING</span>
        <span>———</span>
        <span>MORE ROOM TO DO YOUR BEST</span>
      </div>

      {/* ====================================================================
          2. METHOD SECTION (Screenshot 2)
          ==================================================================== */}
      <section id="the-method-section" className="method-section">
        {/* Left Column */}
        <div className="method-left-col">
          <div className="method-tag">01 / THE METHOD</div>
          <div className="method-star-icon">✱</div>
        </div>

        {/* Right Column */}
        <div className="method-right-col">
          <h2 className="method-heading">
            Keep the details.<br />
            <span className="copper-sub">Keep your head clear.</span>
          </h2>

          <p className="method-desc">
            Applications move quickly, and the small details matter. Nextstep gives every opportunity its own place for notes, dates, links, and the one thing you want to remember before you walk into the room.
          </p>

          <div className="method-accordion-list">
            <div className="method-accordion-item" onClick={onStartTracking}>
              <span className="accordion-index">01</span>
              <div className="accordion-content">
                <h4>See the full pipeline</h4>
                <p>Know what's saved, sent, moving, or waiting at a glance.</p>
              </div>
              <div className="accordion-arrow">
                <ArrowUpRight size={18} />
              </div>
            </div>

            <div className="method-accordion-item" onClick={onStartTracking}>
              <span className="accordion-index">02</span>
              <div className="accordion-content">
                <h4>Stay ahead of dates</h4>
                <p>Bring upcoming deadlines and follow-ups back into view.</p>
              </div>
              <div className="accordion-arrow">
                <ArrowUpRight size={18} />
              </div>
            </div>

            <div className="method-accordion-item" onClick={onStartTracking}>
              <span className="accordion-index">03</span>
              <div className="accordion-content">
                <h4>Keep useful context close</h4>
                <p>Carry notes and links with every role, from first look to final round.</p>
              </div>
              <div className="accordion-arrow">
                <ArrowUpRight size={18} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. QUOTE BANNER & LOWER CTA (Screenshot 1)
          ==================================================================== */}
      <div className="quote-banner-container">
        <div className="quote-forest-card">
          <div className="quote-circle-arcs" />
          <span className="quote-gold-icon">“</span>
          <h3 className="quote-main-text">
            The best next step is the one you can actually see.
          </h3>
          <div className="quote-sub-meta">MAKE THE SEARCH YOURS</div>
        </div>
      </div>

      <section className="lower-cta-section">
        <div>
          <div className="tagline-badge" style={{ marginBottom: '0.85rem' }}>
            <span className="tagline-dot" />
            <span>YOUR MOMENTUM STARTS HERE</span>
          </div>
          <h2 className="lower-cta-title">
            Ready for a search<br />
            that feels <span className="copper-text">more like yours?</span>
          </h2>
        </div>

        <button
          id="btn-create-workspace-lower"
          className="btn-forest-pill"
          style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}
          onClick={onStartTracking}
        >
          <span>Create your workspace</span>
          <ArrowRight size={18} />
        </button>
      </section>
    </div>
  );
}
