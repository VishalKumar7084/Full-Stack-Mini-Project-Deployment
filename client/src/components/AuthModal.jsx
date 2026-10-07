import React, { useState } from 'react';
import { X, Sparkles, Mail, Lock, User, GraduationCap, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose, onSuccess }) {
  const { login, register, demoLogin } = useAuth();
  const [tab, setTab] = useState('login'); // 'login' or 'register'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    title: '',
    university: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleDemo = async () => {
    setLoading(true);
    setError('');
    const res = await demoLogin();
    setLoading(false);
    if (res.success) {
      onSuccess?.('Welcome to the CareerFlow Demo Experience!');
      onClose();
    } else {
      setError(res.message || 'Demo login failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (tab === 'login') {
        const res = await login(formData.email, formData.password);
        if (res.success) {
          onSuccess?.(`Welcome back, ${res.user.name}!`);
          onClose();
        } else {
          setError(res.message || 'Invalid email or password');
        }
      } else {
        const res = await register(formData);
        if (res.success) {
          onSuccess?.(`Welcome to CareerFlow, ${res.user.name}!`);
          onClose();
        } else {
          setError(res.message || 'Registration failed');
        }
      }
    } catch (err) {
      setError('Network or server connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h3 className="modal-title">
              {tab === 'login' ? 'Sign In to CareerFlow' : 'Create Candidate Account'}
            </h3>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* 1-Click Demo Login Banner */}
        <div style={{ padding: '1.25rem 1.5rem 0.5rem' }}>
          <button
            id="auth-modal-demo-btn"
            type="button"
            className="btn btn-secondary"
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15))',
              borderColor: 'rgba(99, 102, 241, 0.35)',
              color: '#c7d2fe',
              padding: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            onClick={handleDemo}
            disabled={loading}
          >
            <Sparkles size={16} color="#fbbf24" />
            <span style={{ fontWeight: 700 }}>1-Click Evaluator Demo Login</span>
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '1.2rem 0 0.8rem',
              color: 'var(--text-dim)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
            <span style={{ padding: '0 0.75rem' }}>or use credentials</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
          </div>

          {/* Tab Selector */}
          <div className="view-tabs" style={{ marginBottom: '1rem', width: '100%' }}>
            <button
              type="button"
              className={`view-tab-btn ${tab === 'login' ? 'active' : ''}`}
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={() => { setTab('login'); setError(''); }}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`view-tab-btn ${tab === 'register' ? 'active' : ''}`}
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={() => { setTab('register'); setError(''); }}
            >
              Register
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ paddingTop: 0 }}>
            {error && (
              <div
                style={{
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(244, 63, 94, 0.12)',
                  border: '1px solid rgba(244, 63, 94, 0.3)',
                  color: '#fb7185',
                  fontSize: '0.82rem',
                  marginBottom: '1rem'
                }}
              >
                {error}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {tab === 'register' && (
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    id="auth-input-name"
                    type="text"
                    name="name"
                    className="form-input"
                    required
                    placeholder="Alex Rivera"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  id="auth-input-email"
                  type="email"
                  name="email"
                  className="form-input"
                  required
                  placeholder="alex@university.edu"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  id="auth-input-password"
                  type="password"
                  name="password"
                  className="form-input"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {tab === 'register' && (
                <>
                  <div className="form-group">
                    <label className="form-label">University / College</label>
                    <input
                      type="text"
                      name="university"
                      className="form-input"
                      placeholder="e.g. Stanford University"
                      value={formData.university}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Major / Target Role</label>
                    <input
                      type="text"
                      name="title"
                      className="form-input"
                      placeholder="e.g. Computer Science Student"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button
              id="auth-submit-btn"
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ minWidth: '110px' }}
            >
              {loading ? 'Processing...' : (tab === 'login' ? 'Sign In' : 'Register')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
