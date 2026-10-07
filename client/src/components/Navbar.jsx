import React, { useState } from 'react';
import { ArrowRight, LogOut, Plus, ChevronDown, Layers, Compass } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({
  onOpenAddModal,
  onOpenAuthModal,
  onOpenWorkspace,
  currentView,
  setCurrentView
}) {
  const { user, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const scrollToArchitecture = () => {
    if (currentView === 'landing') {
      const el = document.getElementById('the-architecture-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentView('landing');
      setTimeout(() => {
        const el = document.getElementById('the-architecture-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Brand */}
        <div className="brand-wrapper" onClick={() => setCurrentView('landing')}>
          <div className="brand-mark">
            <Compass size={20} strokeWidth={2.4} />
          </div>
          <span className="brand-text">Vantage</span>
        </div>

        {/* Nav Links */}
        <div className="nav-links">
          <button className="nav-link" onClick={scrollToArchitecture}>
            The Architecture
          </button>

          {currentView === 'landing' ? (
            <>
              {isAuthenticated ? (
                <button
                  className="nav-link"
                  onClick={() => setCurrentView('workspace')}
                >
                  Workspace
                </button>
              ) : (
                <button
                  className="nav-link"
                  onClick={onOpenAuthModal}
                >
                  Sign In
                </button>
              )}

              <button
                id="header-launch-workspace-cta"
                className="btn-pill-primary"
                onClick={onOpenWorkspace}
              >
                <span>Launch Workspace</span>
                <ArrowRight size={15} />
              </button>
            </>
          ) : (
            /* Inside Workspace */
            <>
              <button
                className="nav-link"
                onClick={() => setCurrentView('landing')}
              >
                Overview
              </button>

              <button
                id="nav-track-opportunity-btn"
                className="btn-pill-primary"
                style={{ padding: '0.55rem 1.15rem' }}
                onClick={onOpenAddModal}
              >
                <Plus size={15} strokeWidth={2.5} />
                <span>Track Opportunity</span>
              </button>

              {isAuthenticated ? (
                <div style={{ position: 'relative' }}>
                  <button
                    className="btn-pill-secondary"
                    style={{ padding: '0.45rem 0.95rem', fontSize: '0.84rem' }}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <span>{user?.name || 'Account'}</span>
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
                        boxShadow: 'var(--shadow-floating)',
                        zIndex: 110
                      }}
                    >
                      <div style={{ padding: '0.45rem 0.65rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '0.35rem' }}>
                        <p style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--pine-800)', fontFamily: 'var(--font-serif)' }}>{user?.name}</p>
                        <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{user?.email}</p>
                      </div>

                      <button
                        className="nav-link"
                        style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 0.65rem', fontSize: '0.82rem' }}
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
                  className="btn-pill-secondary"
                  style={{ padding: '0.45rem 1rem' }}
                  onClick={onOpenAuthModal}
                >
                  Sign In
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
