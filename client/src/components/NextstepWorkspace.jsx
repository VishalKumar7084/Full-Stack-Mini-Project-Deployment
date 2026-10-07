import React, { useState } from 'react';
import {
  Search,
  Plus,
  LayoutGrid,
  List,
  BarChart3,
  ArrowRight,
  ExternalLink,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  CheckCircle2
} from 'lucide-react';

const STAGES = [
  { id: 'wishlist', label: 'Saved / Wishlist', color: '#BDB4A1' },
  { id: 'applied', label: 'Applied & Moving', color: '#B27B4D' },
  { id: 'interviewing', label: 'Interviewing', color: '#C89466' },
  { id: 'offer', label: 'Offer Received', color: '#163B34' },
  { id: 'rejected', label: 'Archived', color: '#94A3B8' }
];

export default function NextstepWorkspace({
  applications,
  stats,
  search,
  setSearch,
  selectedStage,
  setSelectedStage,
  onEdit,
  onDelete,
  onStatusChange,
  onOpenAddModal
}) {
  const [viewTab, setViewTab] = useState('kanban'); // 'kanban', 'table', 'insights'
  const [draggedAppId, setDraggedAppId] = useState(null);

  const handleDragStart = (e, appId) => {
    setDraggedAppId(appId);
    e.dataTransfer.setData('text/plain', appId);
  };

  const handleDrop = (e, targetStage) => {
    e.preventDefault();
    const appId = e.dataTransfer.getData('text/plain') || draggedAppId;
    if (appId) {
      onStatusChange(appId, targetStage);
    }
    setDraggedAppId(null);
  };

  const filteredApps = applications.filter((app) => {
    if (selectedStage !== 'all' && app.status !== selectedStage) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        app.company.toLowerCase().includes(q) ||
        app.role.toLowerCase().includes(q) ||
        (app.location && app.location.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="workspace-wrapper">
      {/* Top Header */}
      <div className="workspace-header">
        <div className="workspace-title-box">
          <h2>Opportunity Workspace</h2>
          <p>Keep every application, interview round, and follow-up in clear focus.</p>
        </div>

        <button
          className="btn-forest-pill"
          onClick={() => onOpenAddModal('applied')}
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>New Opportunity</span>
        </button>
      </div>

      {/* Metrics Strip */}
      <div className="metrics-strip">
        <div className="metric-pill-card">
          <div>
            <div className="metric-val">{stats?.total || 0}</div>
            <div className="metric-lbl">Total Opportunities</div>
          </div>
        </div>

        <div className="metric-pill-card">
          <div>
            <div className="metric-val" style={{ color: 'var(--copper-gold)' }}>
              {(stats?.counts?.applied || 0) + (stats?.counts?.interviewing || 0)}
            </div>
            <div className="metric-lbl">In Active Motion</div>
          </div>
        </div>

        <div className="metric-pill-card">
          <div>
            <div className="metric-val" style={{ color: 'var(--forest-green)' }}>
              {stats?.counts?.offer || 0}
            </div>
            <div className="metric-lbl">Offers Received</div>
          </div>
        </div>

        <div className="metric-pill-card">
          <div>
            <div className="metric-val" style={{ color: '#C4924A' }}>
              {stats?.totalScheduledInterviews || 0}
            </div>
            <div className="metric-lbl">Scheduled Rounds</div>
          </div>
        </div>
      </div>

      {/* Search and Controls Toolbar */}
      <div className="tracker-toolbar">
        <div className="tracker-search-wrap">
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
          <input
            type="text"
            className="tracker-search-input"
            placeholder="Search roles, companies, or locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* View Switchers */}
        <div style={{ display: 'flex', gap: '0.4rem', background: 'var(--bg-card-subtle)', padding: '0.25rem', borderRadius: 'var(--radius-full)' }}>
          <button
            className={`btn-outline-pill ${viewTab === 'kanban' ? 'active' : ''}`}
            style={{
              padding: '0.4rem 0.9rem',
              fontSize: '0.8rem',
              background: viewTab === 'kanban' ? 'var(--forest-green)' : 'transparent',
              color: viewTab === 'kanban' ? '#fff' : 'var(--text-dark)',
              border: 'none'
            }}
            onClick={() => setViewTab('kanban')}
          >
            <LayoutGrid size={14} />
            <span>Pipeline</span>
          </button>

          <button
            className={`btn-outline-pill ${viewTab === 'table' ? 'active' : ''}`}
            style={{
              padding: '0.4rem 0.9rem',
              fontSize: '0.8rem',
              background: viewTab === 'table' ? 'var(--forest-green)' : 'transparent',
              color: viewTab === 'table' ? '#fff' : 'var(--text-dark)',
              border: 'none'
            }}
            onClick={() => setViewTab('table')}
          >
            <List size={14} />
            <span>Table</span>
          </button>

          <button
            className={`btn-outline-pill ${viewTab === 'insights' ? 'active' : ''}`}
            style={{
              padding: '0.4rem 0.9rem',
              fontSize: '0.8rem',
              background: viewTab === 'insights' ? 'var(--forest-green)' : 'transparent',
              color: viewTab === 'insights' ? '#fff' : 'var(--text-dark)',
              border: 'none'
            }}
            onClick={() => setViewTab('insights')}
          >
            <BarChart3 size={14} />
            <span>Funnel</span>
          </button>
        </div>
      </div>

      {/* 1. KANBAN VIEW */}
      {viewTab === 'kanban' && (
        <div className="kanban-grid">
          {STAGES.map((col) => {
            const colApps = filteredApps.filter((a) => a.status === col.id);

            return (
              <div
                key={col.id}
                className="kanban-stage-col"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, col.id)}
              >
                <div className="kanban-col-head">
                  <div className="kanban-col-title">
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: col.color }} />
                    <span>{col.label}</span>
                  </div>
                  <span className="kanban-badge-count">{colApps.length}</span>
                </div>

                <div className="kanban-cards-wrapper">
                  {colApps.map((app) => (
                    <div
                      key={app.id}
                      className="opportunity-card"
                      draggable
                      onDragStart={(e) => handleDragStart(e, app.id)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                        <h4 className="opp-company">{app.company}</h4>
                        {app.jobUrl && (
                          <a href={app.jobUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)' }}>
                            <ExternalLink size={13} />
                          </a>
                        )}
                      </div>

                      <div className="opp-role">{app.role}</div>

                      <div className="opp-meta-pills">
                        {app.location && (
                          <span className="opp-pill">
                            <MapPin size={10} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '2px' }} />
                            {app.location}
                          </span>
                        )}
                        {app.workModel && <span className="opp-pill">{app.workModel}</span>}
                        {app.stipend && (
                          <span className="opp-pill stipend">
                            ${app.stipend}/{app.stipendPeriod === 'hourly' ? 'hr' : 'mo'}
                          </span>
                        )}
                      </div>

                      {app.deadline && (
                        <div style={{ fontSize: '0.72rem', color: '#9CA3AF', marginBottom: '0.65rem' }}>
                          Due: {app.deadline}
                        </div>
                      )}

                      {/* Card Bottom Actions */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '0.5rem' }}>
                        <div style={{ display: 'flex', gap: '0.2rem' }}>
                          <button
                            className="nav-link-item"
                            style={{ padding: '0.2rem 0.4rem', fontSize: '0.75rem' }}
                            onClick={() => {
                              const currIdx = STAGES.findIndex((s) => s.id === app.status);
                              if (currIdx > 0) onStatusChange(app.id, STAGES[currIdx - 1].id);
                            }}
                            title="Move Back"
                          >
                            <ChevronLeft size={13} />
                          </button>
                          <button
                            className="nav-link-item"
                            style={{ padding: '0.2rem 0.4rem', fontSize: '0.75rem' }}
                            onClick={() => {
                              const currIdx = STAGES.findIndex((s) => s.id === app.status);
                              if (currIdx < STAGES.length - 1) onStatusChange(app.id, STAGES[currIdx + 1].id);
                            }}
                            title="Promote Forward"
                          >
                            <ChevronRight size={13} />
                          </button>
                        </div>

                        <div style={{ display: 'flex', gap: '0.2rem' }}>
                          <button
                            className="nav-link-item"
                            style={{ padding: '0.2rem', color: 'var(--text-muted)' }}
                            onClick={() => onEdit(app)}
                            title="Edit"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            className="nav-link-item"
                            style={{ padding: '0.2rem', color: '#EF4444' }}
                            onClick={() => onDelete(app.id)}
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {colApps.length === 0 && (
                    <div style={{ padding: '2rem 1rem', textAlign: 'center', color: '#A8A29E', fontSize: '0.8rem', border: '1px dashed #D6CEBD', borderRadius: 'var(--radius-md)' }}>
                      No opportunities here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. TABLE VIEW */}
      {viewTab === 'table' && (
        <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-card)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-card-subtle)', borderBottom: '1px solid var(--border-light)' }}>
                <th style={{ padding: '0.85rem 1.25rem', color: 'var(--forest-green)', fontWeight: 700 }}>Company</th>
                <th style={{ padding: '0.85rem 1.25rem', color: 'var(--forest-green)', fontWeight: 700 }}>Role</th>
                <th style={{ padding: '0.85rem 1.25rem', color: 'var(--forest-green)', fontWeight: 700 }}>Stage</th>
                <th style={{ padding: '0.85rem 1.25rem', color: 'var(--forest-green)', fontWeight: 700 }}>Compensation</th>
                <th style={{ padding: '0.85rem 1.25rem', color: 'var(--forest-green)', fontWeight: 700 }}>Location</th>
                <th style={{ padding: '0.85rem 1.25rem', textAlign: 'right', color: 'var(--forest-green)', fontWeight: 700 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map((app) => (
                <tr key={app.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '0.9rem 1.25rem', fontWeight: 700, color: 'var(--forest-green)' }}>{app.company}</td>
                  <td style={{ padding: '0.9rem 1.25rem' }}>{app.role}</td>
                  <td style={{ padding: '0.9rem 1.25rem' }}>
                    <select
                      value={app.status}
                      onChange={(e) => onStatusChange(app.id, e.target.value)}
                      style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-card)', fontSize: '0.8rem', background: '#FFFFFF' }}
                    >
                      {STAGES.map((s) => (
                        <option key={s.id} value={s.id}>{s.label}</option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: '0.9rem 1.25rem', color: 'var(--sage-text)', fontWeight: 600 }}>
                    {app.stipend ? `$${app.stipend}/${app.stipendPeriod === 'hourly' ? 'hr' : 'mo'}` : '—'}
                  </td>
                  <td style={{ padding: '0.9rem 1.25rem', color: 'var(--text-muted)' }}>{app.location || 'Remote'}</td>
                  <td style={{ padding: '0.9rem 1.25rem', textAlign: 'right' }}>
                    <button className="nav-link-item" style={{ padding: '0.25rem' }} onClick={() => onEdit(app)}>
                      <Edit2 size={13} />
                    </button>
                    <button className="nav-link-item" style={{ padding: '0.25rem', color: '#EF4444' }} onClick={() => onDelete(app.id)}>
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 3. FUNNEL INSIGHTS */}
      {viewTab === 'insights' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          <div style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-card)' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--forest-green)', marginBottom: '1.25rem' }}>
              Pipeline Funnel Velocity
            </h3>
            {STAGES.map((s) => {
              const count = stats?.counts?.[s.id] || 0;
              const total = stats?.total || 1;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={s.id} style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    <span>{s.label}</span>
                    <span>{count} ({pct}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '10px', background: 'var(--bg-card-subtle)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: s.color, borderRadius: '999px' }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-card)' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--forest-green)', marginBottom: '1rem' }}>
              Search Momentum Tips
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1rem' }}>
              "The best next step is the one you can actually see." Keeping 5 to 10 active opportunities in moving stages creates consistent interview loops without overwhelming your schedule.
            </p>
            <div style={{ padding: '0.85rem', background: 'var(--sage-tint)', borderRadius: 'var(--radius-md)', color: 'var(--sage-text)', fontSize: '0.82rem', fontWeight: 600 }}>
              ✓ Offer Rate: {stats?.offerRate || 0}% across all logged opportunities.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
