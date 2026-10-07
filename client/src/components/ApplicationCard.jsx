import React from 'react';
import {
  MapPin,
  Calendar,
  DollarSign,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Trash2,
  Clock,
  Sparkles
} from 'lucide-react';

const STAGES = ['wishlist', 'applied', 'interviewing', 'offer', 'rejected'];

export default function ApplicationCard({
  app,
  onEdit,
  onDelete,
  onStatusChange,
  onDragStart
}) {
  const currentStageIndex = STAGES.indexOf(app.status);

  const canMoveLeft = currentStageIndex > 0;
  const canMoveRight = currentStageIndex < STAGES.length - 1;

  const moveLeft = (e) => {
    e.stopPropagation();
    if (canMoveLeft) {
      onStatusChange(app.id, STAGES[currentStageIndex - 1]);
    }
  };

  const moveRight = (e) => {
    e.stopPropagation();
    if (canMoveRight) {
      onStatusChange(app.id, STAGES[currentStageIndex + 1]);
    }
  };

  // Find upcoming scheduled interview round
  const upcomingInterview = app.interviews?.find(
    (i) => i.status === 'scheduled'
  );

  return (
    <div
      className="application-card"
      draggable
      onDragStart={(e) => onDragStart(e, app.id)}
      id={`app-card-${app.id}`}
    >
      {/* Top Header */}
      <div className="card-top">
        <div className="card-company-group">
          <div className="company-logo-avatar">
            {app.company.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h4 className="card-company-name">{app.company}</h4>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
              {app.jobType || 'Internship'}
            </span>
          </div>
        </div>

        {app.jobUrl && (
          <a
            href={app.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn"
            title="Open Job Listing"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={13} />
          </a>
        )}
      </div>

      {/* Role */}
      <p className="card-role-title">{app.role}</p>

      {/* Metadata chips */}
      <div className="card-meta-row">
        {app.location && (
          <span className="meta-chip">
            <MapPin size={11} />
            <span>{app.location}</span>
          </span>
        )}

        {app.workModel && (
          <span className="meta-chip" style={{ color: '#cbd5e1' }}>
            {app.workModel}
          </span>
        )}

        {app.stipend && (
          <span className="meta-chip stipend">
            <DollarSign size={11} />
            <span>
              ${app.stipend}/{app.stipendPeriod === 'hourly' ? 'hr' : 'mo'}
            </span>
          </span>
        )}
      </div>

      {/* Deadline alert if set */}
      {app.deadline && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '0.73rem',
            color: 'var(--text-muted)',
            marginBottom: '0.65rem'
          }}
        >
          <Calendar size={12} color="#94a3b8" />
          <span>Deadline: {app.deadline}</span>
        </div>
      )}

      {/* Upcoming interview alert */}
      {upcomingInterview && (
        <div className="interview-alert-pill">
          <Clock size={12} />
          <span>
            {upcomingInterview.roundName}: {upcomingInterview.date}
          </span>
        </div>
      )}

      {/* Tags */}
      {app.tags && app.tags.length > 0 && (
        <div className="card-tags">
          {app.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="tag-badge">
              {tag}
            </span>
          ))}
          {app.tags.length > 3 && (
            <span className="tag-badge" style={{ opacity: 0.7 }}>
              +{app.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Card Footer with quick pipeline move & edit */}
      <div className="card-footer">
        <div className="stage-move-buttons">
          <button
            className="icon-btn"
            onClick={moveLeft}
            disabled={!canMoveLeft}
            style={{ opacity: canMoveLeft ? 1 : 0.3 }}
            title="Move back a stage"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            className="icon-btn"
            onClick={moveRight}
            disabled={!canMoveRight}
            style={{ opacity: canMoveRight ? 1 : 0.3 }}
            title="Promote to next stage"
          >
            <ChevronRight size={14} />
          </button>
        </div>

        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <button
            className="icon-btn"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(app);
            }}
            title="Edit Application"
          >
            <Edit2 size={13} />
          </button>
          <button
            className="icon-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(app.id);
            }}
            title="Delete Application"
          >
            <Trash2 size={13} color="#f43f5e" />
          </button>
        </div>
      </div>
    </div>
  );
}
