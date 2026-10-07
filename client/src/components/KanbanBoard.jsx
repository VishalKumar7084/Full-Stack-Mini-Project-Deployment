import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ApplicationCard from './ApplicationCard';

const COLUMNS = [
  { id: 'wishlist', title: 'Wishlist', color: 'var(--stage-wishlist)' },
  { id: 'applied', title: 'Applied', color: 'var(--stage-applied)' },
  { id: 'interviewing', title: 'Interviewing', color: 'var(--stage-interviewing)' },
  { id: 'offer', title: 'Offer Received', color: 'var(--stage-offer)' },
  { id: 'rejected', title: 'Archived', color: 'var(--stage-rejected)' }
];

export default function KanbanBoard({
  applications,
  onEdit,
  onDelete,
  onStatusChange,
  onOpenAddModalWithStatus
}) {
  const [draggedAppId, setDraggedAppId] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const handleDragStart = (e, appId) => {
    setDraggedAppId(appId);
    e.dataTransfer.setData('text/plain', appId);
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    if (dragOverColumn !== columnId) {
      setDragOverColumn(columnId);
    }
  };

  const handleDragLeave = (columnId) => {
    if (dragOverColumn === columnId) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    const appId = e.dataTransfer.getData('text/plain') || draggedAppId;
    if (appId) {
      onStatusChange(appId, columnId);
    }
    setDraggedAppId(null);
    setDragOverColumn(null);
  };

  return (
    <div className="kanban-board-container">
      {COLUMNS.map((col) => {
        const colApps = applications.filter((a) => a.status === col.id);

        return (
          <div
            key={col.id}
            id={`kanban-col-${col.id}`}
            className={`kanban-column ${dragOverColumn === col.id ? 'drag-over' : ''}`}
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDragLeave={() => handleDragLeave(col.id)}
            onDrop={(e) => handleDrop(e, col.id)}
          >
            {/* Column Header */}
            <div className="column-header">
              <div className="column-title-group">
                <span
                  className="column-indicator"
                  style={{ backgroundColor: col.color }}
                />
                <span className="column-title">{col.title}</span>
              </div>
              <span className="column-count-badge">{colApps.length}</span>
            </div>

            {/* Cards List */}
            <div className="column-cards-list">
              {colApps.map((app) => (
                <ApplicationCard
                  key={app.id}
                  app={app}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onStatusChange={onStatusChange}
                  onDragStart={handleDragStart}
                />
              ))}

              {colApps.length === 0 && (
                <div
                  style={{
                    padding: '2rem 1rem',
                    textAlign: 'center',
                    border: '1px dashed var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    marginTop: '0.5rem'
                  }}
                >
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.75rem' }}>
                    No applications here
                  </p>
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                    onClick={() => onOpenAddModalWithStatus(col.id)}
                  >
                    <Plus size={12} />
                    <span>Add to {col.title}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
