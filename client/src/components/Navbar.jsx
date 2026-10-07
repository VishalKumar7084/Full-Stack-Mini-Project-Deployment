import React, { useState } from 'react';
import {
  ArrowRight,
  LogOut,
  Plus,
  LayoutGrid,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({
  onOpenAddModal,
  onOpenAuthModal,
  onStartTracking,
  currentView,
  setCurrentView
}) {
  const { user, isAuthenticated, logout, demoLogin } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const scrollToMethod = () => {
    if (currentView === 'landing') {
      const el = document.getElementById('the-method-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentView('landing');
      setTimeout(() => {
        const el = document.getElementById('the-method-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className="site-navbar">
      <div className="navbar-container">
        {/* Brand: nextstep. */}
        <div className="brand-logo" onClick={() => setCurrentView('landing')}>
          <div className="brand-logo-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
          <span className="brand-title">nextstep.</span>
        </div>

        {/* Right Navigation */}
        <div className="nav-links-right">
          <button className="nav-link-item" onClick={scrollToMethod}>
            How it works
          </button>

          {currentView === 'landing' ? (
            <>
              {isAuthenticated ? (
                <button
                  className="nav-link-item"
                  onClick={() => setCurrentView('workspace')}
                >
                  Go to Workspace
                </button>
              ) : (
                <button
                  className="nav-link-item"
                  onClick={onOpenAuthModal}
                >
                  Sign in
                </button>
              )}

              <button
                id="navbar-get-started-btn"
                className="btn-forest-pill"
                onClick={onStartTracking}
              >
                <span>Get started</span>
                <ArrowRight size={15} />
              </button>
            </>
          ) : (
            /* Inside Workspace */
            <>
              <button
                className="nav-link-item"
                onClick={() => setCurrentView('landing')}
              >
                Overview
              </button>

              <button
                id="btn-add-opportunity"
                className="btn-forest-pill"
                style={{ padding: '0.55rem 1.15rem' }}
                onClick={onOpenAddModal}
              >
                <Plus size={15} strokeWidth={2.5} />
                <span>Add Opportunity</span>
              </button>

              {isAuthenticated ? (
                <div style={{ position: 'relative' }}>
                  <button
                    className="btn-outline-pill"
                    style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <span>{user?.name || 'My Workspace'}</span>
                    <ChevronDown size={14} />
                  </button>

                  {dropdownOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 'calc(100% + 8px)',
                        background: '#FFFFFF',
                        border: '1px solid var(--border-card)',
                        borderRadius: 'var(--radius-md)',
                        width: '210px',
                        padding: '0.5rem',
                        boxShadow: 'var(--shadow-float)',
                        zIndex: 110
                      }}
                    >
                      <div style={{ padding: '0.4rem 0.6rem', borderBottom: '1px solid var(--border-light)', marginBottom: '0.35rem' }}>
                        <p style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--forest-green)' }}>{user?.name}</p>
                        <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{user?.email}</p>
                      </div>

                      <button
                        className="nav-link-item"
                        style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 0.6rem', fontSize: '0.82rem' }}
                        onClick={() => {
                          setDropdownOpen(false);
                          logout();
                        }}
                      >
                        <LogOut size={14} />
                        <span>Sign out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="btn-outline-pill"
                  style={{ padding: '0.45rem 1rem' }}
                  onClick={onOpenAuthModal}
                >
                  Sign in
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
