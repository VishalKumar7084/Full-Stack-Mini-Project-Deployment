import React, { useState, useEffect, useCallback } from 'react';
import {
  Briefcase,
  Sparkles,
  TrendingUp,
  LayoutGrid,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

import { useAuth } from './context/AuthContext';
import { api } from './services/api';

import Navbar from './components/Navbar';
import StatCards from './components/StatCards';
import FilterBar from './components/FilterBar';
import KanbanBoard from './components/KanbanBoard';
import ApplicationTable from './components/ApplicationTable';
import AnalyticsView from './components/AnalyticsView';
import ApplicationModal from './components/ApplicationModal';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';

export default function App() {
  const { user, isAuthenticated, isLoading, demoLogin } = useAuth();

  // App Data State
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState(null);
  const [loadingData, setLoadingData] = useState(false);

  // Filters & Views
  const [search, setSearch] = useState('');
  const [selectedStage, setSelectedStage] = useState('all');
  const [sortBy, setSortBy] = useState('updatedAt_desc');
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban', 'table', 'analytics'

  // Modals
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [modalDefaultStatus, setModalDefaultStatus] = useState('applied');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch applications & stats from server
  const loadData = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoadingData(true);
    try {
      const [sortField, sortDirection] = sortBy.split('_');
      const [appsRes, statsRes] = await Promise.all([
        api.getApplications({
          search,
          status: selectedStage,
          sortBy: sortField,
          sortOrder: sortDirection
        }),
        api.getStats()
      ]);

      if (appsRes.success) {
        setApplications(appsRes.data || []);
      }
      if (statsRes.success) {
        setStats(statsRes.data || null);
      }
    } catch (err) {
      console.error('Data load error:', err);
      addToast('Error synchronizing with server', 'error');
    } finally {
      setLoadingData(false);
    }
  }, [isAuthenticated, search, selectedStage, sortBy]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Stage transition (Kanban drag or button move)
  const handleStatusChange = async (appId, newStatus) => {
    // Optimistic update
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
    );

    try {
      const res = await api.updateStatus(appId, newStatus);
      if (res.success) {
        addToast(`Application moved to ${newStatus.toUpperCase()}!`, 'success');
        // Refresh stats
        const statsRes = await api.getStats();
        if (statsRes.success) setStats(statsRes.data);
      } else {
        addToast(res.message || 'Failed to update status', 'error');
        loadData(); // rollback
      }
    } catch (err) {
      addToast('Failed to update status', 'error');
      loadData();
    }
  };

  // Create or Update Application
  const handleModalSubmit = async (formData) => {
    try {
      if (editingApp) {
        // Update existing
        const res = await api.updateApplication(editingApp.id, formData);
        if (res.success) {
          addToast(`Updated ${formData.company} application!`, 'success');
          setIsAppModalOpen(false);
          setEditingApp(null);
          loadData();
        } else {
          addToast(res.message || 'Update failed', 'error');
        }
      } else {
        // Create new
        const res = await api.createApplication(formData);
        if (res.success) {
          addToast(`Tracked application for ${formData.company}!`, 'success');
          setIsAppModalOpen(false);
          loadData();
        } else {
          addToast(res.message || 'Creation failed', 'error');
        }
      }
    } catch (err) {
      addToast('Error saving application', 'error');
    }
  };

  // Delete Application
  const handleDeleteApp = async (appId) => {
    const target = applications.find((a) => a.id === appId);
    if (!window.confirm(`Are you sure you want to delete application for ${target?.company || 'this role'}?`)) {
      return;
    }

    try {
      const res = await api.deleteApplication(appId);
      if (res.success) {
        addToast('Application deleted', 'info');
        loadData();
      } else {
        addToast(res.message || 'Delete failed', 'error');
      }
    } catch (err) {
      addToast('Error deleting application', 'error');
    }
  };

  // Open modal helpers
  const openAddModal = (defaultStatus = 'applied') => {
    setEditingApp(null);
    setModalDefaultStatus(defaultStatus);
    setIsAppModalOpen(true);
  };

  const openEditModal = (app) => {
    setEditingApp(app);
    setIsAppModalOpen(true);
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <Navbar
        onOpenAddModal={() => openAddModal('applied')}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        stats={stats}
      />

      <main className="main-content">
        {/* If user is NOT logged in: Show High-Impact Hero Experience */}
        {!isAuthenticated ? (
          <div style={{ padding: '3.5rem 0', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 1rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(99, 102, 241, 0.12)',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                color: '#a5b4fc',
                fontSize: '0.85rem',
                fontWeight: 600,
                marginBottom: '1.5rem'
              }}
            >
              <Sparkles size={16} color="#818cf8" />
              <span>Full-Stack Web Development Internship • Task 4 Project</span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: '1.25rem',
                letterSpacing: '-0.03em'
              }}
            >
              Supercharge Your{' '}
              <span
                style={{
                  background: 'var(--gradient-brand)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Internship & Job Search
              </span>{' '}
              Pipeline
            </h1>

            <p
              style={{
                fontSize: '1.15rem',
                color: 'var(--text-muted)',
                maxWidth: '680px',
                margin: '0 auto 2.5rem',
                lineHeight: 1.6
              }}
            >
              CareerFlow is a full-stack internship tracking platform featuring interactive Kanban stage management, interview round calendars, automated response analytics, and candidate metrics.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
              <button
                id="hero-demo-btn"
                className="btn btn-primary"
                style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}
                onClick={() => demoLogin()}
              >
                <Sparkles size={18} color="#fbbf24" />
                <span>Launch 1-Click Interactive Demo</span>
              </button>

              <button
                id="hero-register-btn"
                className="btn btn-secondary"
                style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}
                onClick={() => setIsAuthModalOpen(true)}
              >
                <span>Sign In or Register</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Feature Highlights Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
              <div className="stat-card" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.8rem' }}>
                <div className="stat-icon-wrap" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
                  <LayoutGrid size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.3rem' }}>
                    Interactive Kanban Board
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                    Drag-and-drop or single-click stage transitions across Wishlist, Applied, Interviewing, Offer, and Archived columns.
                  </p>
                </div>
              </div>

              <div className="stat-card" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.8rem' }}>
                <div className="stat-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
                  <TrendingUp size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.3rem' }}>
                    Visual Funnel Analytics
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                    Real-time conversion rates, work model distribution, top demanded tech stack skills, and interview success metrics.
                  </p>
                </div>
              </div>

              <div className="stat-card" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.8rem' }}>
                <div className="stat-icon-wrap" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
                  <Calendar size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.3rem' }}>
                    Multi-Round Interview Manager
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                    Track technical screens, take-homes, recruiter calls, deadlines, and salary/stipend rates in one place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* When Logged In: Full Interactive Dashboard */
          <>
            {/* Top Stat Summary Cards */}
            <StatCards stats={stats} />

            {/* Filter, Search & View Switcher */}
            <FilterBar
              search={search}
              setSearch={setSearch}
              selectedStage={selectedStage}
              setSelectedStage={setSelectedStage}
              sortBy={sortBy}
              setSortBy={setSortBy}
              viewMode={viewMode}
              setViewMode={setViewMode}
              counts={stats?.counts}
            />

            {/* Main Interactive Views */}
            {viewMode === 'kanban' && (
              <KanbanBoard
                applications={applications}
                onEdit={openEditModal}
                onDelete={handleDeleteApp}
                onStatusChange={handleStatusChange}
                onOpenAddModalWithStatus={(st) => openAddModal(st)}
              />
            )}

            {viewMode === 'table' && (
              <ApplicationTable
                applications={applications}
                onEdit={openEditModal}
                onDelete={handleDeleteApp}
                onStatusChange={handleStatusChange}
              />
            )}

            {viewMode === 'analytics' && (
              <AnalyticsView stats={stats} applications={applications} />
            )}
          </>
        )}
      </main>

      {/* Application Add / Edit Modal */}
      <ApplicationModal
        isOpen={isAppModalOpen}
        onClose={() => {
          setIsAppModalOpen(false);
          setEditingApp(null);
        }}
        onSubmit={handleModalSubmit}
        initialData={editingApp}
        initialStatus={modalDefaultStatus}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(msg) => addToast(msg, 'success')}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
