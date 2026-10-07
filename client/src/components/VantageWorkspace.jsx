import React, { useState } from 'react';
import {
  Search,
  Plus,
  LayoutGrid,
  List,
  BarChart3,
  ExternalLink,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  PieChart,
  Award
} from 'lucide-react';

const PIPELINE_STAGES = [
  { id: 'wishlist', label: 'Target Wishlist', color: '#9E9484' },
  { id: 'applied', label: 'In Motion (Applied)', color: '#B8733E' },
  { id: 'interviewing', label: 'Active Loops', color: '#CF864F' },
  { id: 'offer', label: 'Offer Extended', color: '#19463E' },
  { id: 'rejected', label: 'Retrospective', color: '#889893' }
];

export default function VantageWorkspace({
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
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban', 'table', 'analytics'
  const [draggedId, setDraggedId] = useState(null);

  const handleDragStart = (e, appId) => {
    setDraggedId(appId);
    e.dataTransfer.setData('text/plain', appId);
  };

  const handleDrop = (e, stageId) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain') || draggedId;
    if (id) {
      onStatusChange(id, stageId);
    }
    setDraggedId(null);
  };

  const filteredApps = applications.filter((app) => {
    if (selectedStage !== 'all' && app.status !== selectedStage) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        app.company.toLowerCase().includes(q) ||
        app.role.toLowerCase().includes(q) ||
        (app.location && app.location.toLowerCase().includes(q)) ||
        (app.tags && app.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }
    return true;
  });

  return (
    <div className="workspace-page">
      {/* Workspace Header */}
      <div className="workspace-banner-head">
        <div className="workspace-title-box">
          <h2>Opportunity Pipeline</h2>
          <p>Orchestrate active searches, scheduled loops, and compensation offers.</p>
        </div>

        <button
          id="workspace-add-opportunity-btn"
          className="btn-pill-primary"
          onClick={() => onOpenAddModal('applied')}
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Track Opportunity</span>
        </button>
      </div>

      {/* Metrics Strip */}
      <div className="pipeline-metrics-grid">
        <div className="metric-vantage-card">
          <div>
            <div className="metric-digit">{stats?.total || 0}</div>
            <div className="metric-caption">Total Tracked</div>
          </div>
          <div style={{ color: 'var(--pine-600)', opacity: 0.7 }}>
            <TrendingUp size={22} />
          </div>
        </div>

        <div className="metric-vantage-card">
          <div>
            <div className="metric-digit" style={{ color: 'var(--copper-600)' }}>
              {(stats?.counts?.applied || 0) + (stats?.counts?.interviewing || 0)}
            </div>
            <div className="metric-caption">In Active Motion</div>
          </div>
          <div style={{ color: 'var(--copper-600)', opacity: 0.7 }}>
            <Clock size={22} />
          </div>
        </div>

        <div className="metric-vantage-card">
          <div>
            <div className="metric-digit" style={{ color: 'var(--pine-800)' }}>
              {stats?.counts?.offer || 0}
            </div>
            <div className="metric-caption">Offers Extended</div>
          </div>
          <div style={{ color: 'var(--pine-800)', opacity: 0.7 }}>
            <Award size={22} />
          </div>
        </div>

        <div className="metric-vantage-card">
          <div>
            <div className="metric-digit" style={{ color: '#C0883E' }}>
              {stats?.totalScheduledInterviews || 0}
            </div>
            <div className="metric-caption">Scheduled Rounds</div>
          </div>
          <div style={{ color: '#C0883E', opacity: 0.7 }}>
            <Calendar size={22} />
          </div>
        </div>
      </div>

      {/* Controls & Filter Strip */}
      <div className="workspace-action-strip">
        <div className="search-field-wrapper">
          <Search size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
          <input
            id="workspace-search-input"
            type="text"
            className="search-field-input"
            placeholder="Filter companies, roles, technologies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* View Switchers */}
        <div style={{ display: 'flex', gap: '0.35rem', background: 'var(--bg-parchment)', padding: '0.3rem', borderRadius: 'var(--radius-full)' }}>
          <button
            className="btn-pill-secondary"
            style={{
              padding: '0.45rem 1rem',
              fontSize: '0.82rem',
              background: viewMode === 'kanban' ? 'var(--pine-800)' : 'transparent',
              color: viewMode === 'kanban' ? '#fff' : 'var(--pine-800)',
              border: 'none',
              boxShadow: viewMode === 'kanban' ? 'var(--shadow-sm)' : 'none'
            }}
            onClick={() => setViewMode('kanban')}
          >
            <LayoutGrid size={14} />
            <span>Kanban</span>
          </button>

          <button
            className="btn-pill-secondary"
            style={{
              padding: '0.45rem 1rem',
              fontSize: '0.82rem',
              background: viewMode === 'table' ? 'var(--pine-800)' : 'transparent',
              color: viewMode === 'table' ? '#fff' : 'var(--pine-800)',
              border: 'none',
              boxShadow: viewMode === 'table' ? 'var(--shadow-sm)' : 'none'
            }}
            onClick={() => setViewMode('table')}
          >
            <List size={14} />
            <span>Table</span>
          </button>

          <button
            className="btn-pill-secondary"
            style={{
              padding: '0.45rem 1rem',
              fontSize: '0.82rem',
              background: viewMode === 'analytics' ? 'var(--pine-800)' : 'transparent',
              color: viewMode === 'analytics' ? '#fff' : 'var(--pine-800)',
              border: 'none',
              boxShadow: viewMode === 'analytics' ? 'var(--shadow-sm)' : 'none'
            }}
            onClick={() => setViewMode('analytics')}
          >
            <BarChart3 size={14} />
            <span>Velocity</span>
          </button>
        </div>
      </div>

      {/* 1. KANBAN VIEW */}
      {viewMode === 'kanban' && (
        <div className="kanban-stage-board">
          {PIPELINE_STAGES.map((lane) => {
            const laneApps = filteredApps.filter((a) => a.status === lane.id);

            return (
              <div
                key={lane.id}
                className="kanban-lane-card"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, lane.id)}
              >
                <div className="lane-top-bar">
                  <div className="lane-label-group">
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: lane.color }} />
                    <span>{lane.label}</span>
                  </div>
                  <span className="lane-count-pill">{laneApps.length}</span>
                </div>

                <div className="lane-items-scroller">
                  {laneApps.map((app) => {
                    const upcomingRound = app.interviews?.find((i) => i.status === 'scheduled');

                    return (
                      <div
                        key={app.id}
                        className="opportunity-card-element"
                        draggable
                        onDragStart={(e) => handleDragStart(e, app.id)}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                          <h4 className="opp-company-brand">{app.company}</h4>
                          {app.jobUrl && (
                            <a href={app.jobUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)' }}>
                              <ExternalLink size={13} />
                            </a>
                          )}
                        </div>

                        <div className="opp-position-text">{app.role}</div>

                        <div className="opp-tags-row">
                          {app.location && (
                            <span className="opp-tag-chip">
                              <MapPin size={10} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '3px' }} />
                              {app.location}
                            </span>
                          )}
                          {app.workModel && <span className="opp-tag-chip">{app.workModel}</span>}
                          {app.stipend && (
                            <span className="opp-tag-chip stipend-tag">
                              ${app.stipend}/{app.stipendPeriod === 'hourly' ? 'hr' : 'mo'}
                            </span>
                          )}
                        </div>

                        {/* Scheduled interview highlight */}
                        {upcomingRound && (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              fontSize: '0.74rem',
                              fontWeight: 600,
                              color: 'var(--copper-700)',
                              background: 'var(--copper-100)',
                              padding: '0.3rem 0.55rem',
                              borderRadius: '4px',
                              marginBottom: '0.65rem'
                            }}
                          >
                            <Clock size={12} />
                            <span>{upcomingRound.roundName}: {upcomingRound.date}</span>
                          </div>
                        )}

                        {app.deadline && (
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
                            Deadline: {app.deadline}
                          </div>
                        )}

                        {/* Card Footer Actions */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.55rem' }}>
                          <div style={{ display: 'flex', gap: '0.2rem' }}>
                            <button
                              className="nav-link"
                              style={{ padding: '0.2rem 0.45rem', fontSize: '0.75rem' }}
                              onClick={() => {
                                const currIdx = PIPELINE_STAGES.findIndex((s) => s.id === app.status);
                                if (currIdx > 0) onStatusChange(app.id, PIPELINE_STAGES[currIdx - 1].id);
                              }}
                              title="Previous stage"
                            >
                              <ChevronLeft size={13} />
                            </button>
                            <button
                              className="nav-link"
                              style={{ padding: '0.2rem 0.45rem', fontSize: '0.75rem' }}
                              onClick={() => {
                                const currIdx = PIPELINE_STAGES.findIndex((s) => s.id === app.status);
                                if (currIdx < PIPELINE_STAGES.length - 1) onStatusChange(app.id, PIPELINE_STAGES[currIdx + 1].id);
                              }}
                              title="Advance stage"
                            >
                              <ChevronRight size={13} />
                            </button>
                          </div>

                          <div style={{ display: 'flex', gap: '0.2rem' }}>
                            <button
                              className="nav-link"
                              style={{ padding: '0.2rem', color: 'var(--text-muted)' }}
                              onClick={() => onEdit(app)}
                              title="Edit Opportunity"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              className="nav-link"
                              style={{ padding: '0.2rem', color: '#DC2626' }}
                              onClick={() => onDelete(app.id)}
                              title="Delete"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {laneApps.length === 0 && (
                    <div
                      style={{
                        padding: '2.5rem 1rem',
                        textAlign: 'center',
                        color: 'var(--text-dim)',
                        fontSize: '0.82rem',
                        border: '1px dashed var(--border-card)',
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      No records in this stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. TABLE VIEW */}
      {viewMode === 'table' && (
        <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-card)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-parchment-subtle)', borderBottom: '1px solid var(--border-divider)' }}>
                <th style={{ padding: '0.95rem 1.4rem', color: 'var(--pine-800)', fontWeight: 700 }}>Company</th>
                <th style={{ padding: '0.95rem 1.4rem', color: 'var(--pine-800)', fontWeight: 700 }}>Position</th>
                <th style={{ padding: '0.95rem 1.4rem', color: 'var(--pine-800)', fontWeight: 700 }}>Stage</th>
                <th style={{ padding: '0.95rem 1.4rem', color: 'var(--pine-800)', fontWeight: 700 }}>Compensation</th>
                <th style={{ padding: '0.95rem 1.4rem', color: 'var(--pine-800)', fontWeight: 700 }}>Work Model</th>
                <th style={{ padding: '0.95rem 1.4rem', textAlign: 'right', color: 'var(--pine-800)', fontWeight: 700 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map((app) => (
                <tr key={app.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '1rem 1.4rem', fontWeight: 700, color: 'var(--pine-800)', fontFamily: 'var(--font-serif)' }}>
                    {app.company}
                  </td>
                  <td style={{ padding: '1rem 1.4rem' }}>{app.role}</td>
                  <td style={{ padding: '1rem 1.4rem' }}>
                    <select
                      value={app.status}
                      onChange={(e) => onStatusChange(app.id, e.target.value)}
                      style={{
                        padding: '0.3rem 0.6rem',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border-card)',
                        fontSize: '0.8rem',
                        background: '#FFFFFF',
                        fontWeight: 600,
                        color: 'var(--pine-800)'
                      }}
                    >
                      {PIPELINE_STAGES.map((s) => (
                        <option key={s.id} value={s.id}>{s.label}</option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: '1rem 1.4rem', color: 'var(--sage-badge-text)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                    {app.stipend ? `$${app.stipend}/${app.stipendPeriod === 'hourly' ? 'hr' : 'mo'}` : '—'}
                  </td>
                  <td style={{ padding: '1rem 1.4rem', color: 'var(--text-muted)' }}>
                    {app.workModel || 'Remote'}
                  </td>
                  <td style={{ padding: '1rem 1.4rem', textAlign: 'right' }}>
                    <button className="nav-link" style={{ padding: '0.25rem' }} onClick={() => onEdit(app)}>
                      <Edit2 size={13} />
                    </button>
                    <button className="nav-link" style={{ padding: '0.25rem', color: '#DC2626' }} onClick={() => onDelete(app.id)}>
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 3. VELOCITY ANALYTICS */}
      {viewMode === 'analytics' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.6rem' }}>
          {/* Conversion Funnel */}
          <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-card)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--pine-800)', marginBottom: '1.4rem' }}>
              Pipeline Conversion Velocity
            </h3>
            {PIPELINE_STAGES.map((s) => {
              const count = stats?.counts?.[s.id] || 0;
              const total = stats?.total || 1;
              const pct = Math.round((count / total) * 100);

              return (
                <div key={s.id} style={{ marginBottom: '1.1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    <span>{s.label}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{count} ({pct}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '10px', background: 'var(--bg-parchment)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: s.color, borderRadius: '999px' }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Work Model & Insights */}
          <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-card)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--pine-800)', marginBottom: '1rem' }}>
              Strategic Momentum Insights
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
              Maintaining active loops with 3 to 6 targeted organizations maintains leverage and accelerates negotiation confidence without spreading preparation thin.
            </p>

            <div style={{ padding: '1rem', background: 'var(--sage-badge-bg)', borderRadius: 'var(--radius-md)', color: 'var(--sage-badge-text)', fontSize: '0.84rem', fontWeight: 600, marginBottom: '1rem' }}>
              ✓ Offer Conversion Rate: {stats?.offerRate || 0}% across all logged opportunities.
            </div>

            <div style={{ padding: '1rem', background: 'var(--amber-badge-bg)', borderRadius: 'var(--radius-md)', color: 'var(--amber-badge-text)', fontSize: '0.84rem', fontWeight: 600 }}>
              ⏱ Upcoming Interview Rounds: {stats?.totalScheduledInterviews || 0} scheduled.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
