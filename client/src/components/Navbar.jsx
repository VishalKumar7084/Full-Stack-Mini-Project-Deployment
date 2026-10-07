import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Sparkles,
  LogOut,
  User,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenAddModal, onOpenAuthModal, stats }) {
  const { user, isAuthenticated, logout, demoLogin } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <div className="logo-brand">
          <div className="logo-icon">
            <Briefcase size={22} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span className="logo-text">CareerFlow</span>
              <span className="logo-badge">Full-Stack</span>
            </div>
          </div>
        </div>

        {/* Center quick status if authenticated */}
        {isAuthenticated && stats && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-subtle)',
              padding: '0.4rem 1rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 600
            }}
          >
            <span style={{ color: 'var(--text-muted)' }}>
              Total: <strong style={{ color: '#fff' }}>{stats.total || 0}</strong>
            </span>
            <span style={{ color: 'var(--stage-interviewing)' }}>
              🎯 Interviews: <strong>{stats.counts?.interviewing || 0}</strong>
            </span>
            <span style={{ color: 'var(--stage-offer)' }}>
              🎉 Offers: <strong>{stats.counts?.offer || 0}</strong>
            </span>
          </div>
        )}

        {/* Right action buttons */}
        <div className="navbar-actions">
          {isAuthenticated ? (
            <>
              <button
                id="btn-add-application"
                className="btn btn-primary"
                onClick={onOpenAddModal}
              >
                <Plus size={16} strokeWidth={2.5} />
                <span>New Application</span>
              </button>

              <div style={{ position: 'relative' }}>
                <button
                  id="btn-user-menu"
                  className="user-menu-btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img
                    src={user?.avatarUrl || 'https://api.dicebear.com/7.x/initials/svg?seed=User'}
                    alt={user?.name || 'User'}
                    className="user-avatar"
                  />
                  <span className="user-name-text">{user?.name}</span>
                  <ChevronDown size={14} color="var(--text-dim)" />
                </button>

                {dropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 'calc(100% + 8px)',
                      background: 'var(--bg-modal)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      width: '230px',
                      padding: '0.6rem',
                      boxShadow: 'var(--shadow-lg)',
                      zIndex: 60,
                      animation: 'slideUp 0.15s ease'
                    }}
                  >
                    <div style={{ padding: '0.5rem 0.6rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '0.4rem' }}>
                      <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>{user?.name}</p>
                      <p style={{ fontSize: '0.74rem', color: 'var(--text-dim)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</p>
                    </div>

                    <button
                      className="btn btn-ghost"
                      style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.82rem', padding: '0.5rem 0.6rem' }}
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                      }}
                    >
                      <LogOut size={15} />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                id="btn-demo-quick-login"
                className="btn btn-secondary"
                onClick={() => demoLogin()}
              >
                <Sparkles size={16} color="#fbbf24" />
                <span>1-Click Demo Login</span>
              </button>

              <button
                id="btn-login-open"
                className="btn btn-primary"
                onClick={onOpenAuthModal}
              >
                <User size={16} />
                <span>Sign In / Register</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
