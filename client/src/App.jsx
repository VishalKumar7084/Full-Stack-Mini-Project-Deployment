import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from './context/AuthContext';
import { api } from './services/api';

import Navbar from './components/Navbar';
import NextstepLanding from './components/NextstepLanding';
import NextstepWorkspace from './components/NextstepWorkspace';
import ApplicationModal from './components/ApplicationModal';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';

export default function App() {
  const { user, isAuthenticated, demoLogin } = useAuth();

  // Navigation View: 'landing' or 'workspace'
  const [currentView, setCurrentView] = useState('landing');

  // Applications & Stats State
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedStage, setSelectedStage] = useState('all');

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

  // Fetch data from backend API
  const loadData = useCallback(async () => {
    try {
      const [appsRes, statsRes] = await Promise.all([
        api.getApplications({ search, status: selectedStage }),
        api.getStats()
      ]);

      if (appsRes.success) {
        setApplications(appsRes.data || []);
      }
      if (statsRes.success) {
        setStats(statsRes.data || null);
      }
    } catch (err) {
      console.error('Data loading error:', err);
    }
  }, [search, selectedStage]);

  useEffect(() => {
    loadData();
  }, [loadData, isAuthenticated]);

  // Handle stage change (Kanban move)
  const handleStatusChange = async (appId, newStatus) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
    );

    try {
      const res = await api.updateStatus(appId, newStatus);
      if (res.success) {
        addToast(`Opportunity stage updated to ${newStatus.toUpperCase()}`);
        const statsRes = await api.getStats();
        if (statsRes.success) setStats(statsRes.data);
      } else {
        loadData();
      }
    } catch (err) {
      loadData();
    }
  };

  // Handle Modal Save (Create or Update)
  const handleModalSubmit = async (formData) => {
    try {
      if (editingApp) {
        const res = await api.updateApplication(editingApp.id, formData);
        if (res.success) {
          addToast(`Updated ${formData.company}`);
          setIsAppModalOpen(false);
          setEditingApp(null);
          loadData();
        } else {
          addToast(res.message || 'Update failed', 'error');
        }
      } else {
        const res = await api.createApplication(formData);
        if (res.success) {
          addToast(`Added ${formData.company} to pipeline`);
          setIsAppModalOpen(false);
          loadData();
        } else {
          addToast(res.message || 'Creation failed', 'error');
        }
      }
    } catch (err) {
      addToast('Error saving opportunity', 'error');
    }
  };

  // Delete
  const handleDelete = async (appId) => {
    if (!window.confirm('Remove this opportunity from your pipeline?')) return;
    try {
      const res = await api.deleteApplication(appId);
      if (res.success) {
        addToast('Opportunity removed', 'info');
        loadData();
      }
    } catch (err) {
      addToast('Error deleting opportunity', 'error');
    }
  };

  // Quick Start Flow: If user clicks "Start tracking" on landing, ensure authenticated and switch view
  const handleStartTracking = async () => {
    if (!isAuthenticated) {
      await demoLogin();
    }
    setCurrentView('workspace');
  };

  const openAddModal = (status = 'applied') => {
    setEditingApp(null);
    setModalDefaultStatus(status);
    setIsAppModalOpen(true);
  };

  const openEditModal = (app) => {
    setEditingApp(app);
    setIsAppModalOpen(true);
  };

  return (
    <div className="site-wrapper">
      {/* Top Navbar */}
      <Navbar
        onOpenAddModal={() => openAddModal('applied')}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onStartTracking={handleStartTracking}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      <main style={{ flex: 1 }}>
        {/* Exact Landing Page from Screenshots */}
        {currentView === 'landing' ? (
          <NextstepLanding
            onStartTracking={handleStartTracking}
            onSignIn={() => setIsAuthModalOpen(true)}
            onHowItWorks={() => {
              const el = document.getElementById('the-method-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        ) : (
          /* MERN Stack Interactive Workspace */
          <NextstepWorkspace
            applications={applications}
            stats={stats}
            search={search}
            setSearch={setSearch}
            selectedStage={selectedStage}
            setSelectedStage={setSelectedStage}
            onEdit={openEditModal}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            onOpenAddModal={openAddModal}
          />
        )}
      </main>

      {/* Add / Edit Opportunity Modal */}
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
        onSuccess={(msg) => {
          addToast(msg);
          setCurrentView('workspace');
        }}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
