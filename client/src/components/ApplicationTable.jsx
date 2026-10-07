import React from 'react';
import {
  ExternalLink,
  Mail,
  Edit2,
  Trash2,
  MapPin,
  Calendar
} from 'lucide-react';

export default function ApplicationTable({
  applications,
  onEdit,
  onDelete,
  onStatusChange
}) {
  const getBadgeClass = (status) => {
    switch (status) {
      case 'wishlist': return 'badge-wishlist';
      case 'applied': return 'badge-applied';
      case 'interviewing': return 'badge-interviewing';
      case 'offer': return 'badge-offer';
      case 'rejected': return 'badge-rejected';
      default: return 'badge-applied';
    }
  };

  if (!applications || applications.length === 0) {
    return (
      <div
        className="table-container"
        style={{ padding: '3rem', textAlign: 'center' }}
      >
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          No applications match your filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div style={{ overflowX: 'auto' }}>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Location & Model</th>
              <th>Status</th>
              <th>Stipend</th>
              <th>Applied Date</th>
              <th>Recruiter</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                {/* Company */}
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div className="company-logo-avatar" style={{ width: '28px', height: '28px', fontSize: '0.75rem' }}>
                      {app.company.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <span style={{ fontWeight: 700, color: '#fff' }}>{app.company}</span>
                      {app.jobUrl && (
                        <a
                          href={app.jobUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{ marginLeft: '0.35rem', color: 'var(--text-dim)', verticalAlign: 'middle' }}
                        >
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td>
                  <div style={{ fontWeight: 600 }}>{app.role}</div>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                    {app.jobType}
                  </span>
                </td>

                {/* Location */}
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem' }}>
                    <MapPin size={12} color="var(--text-dim)" />
                    <span>{app.location || 'Remote'}</span>
                  </div>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    {app.workModel}
                  </span>
                </td>

                {/* Status selector */}
                <td>
                  <select
                    className="form-select"
                    style={{
                      padding: '0.3rem 0.6rem',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      borderRadius: 'var(--radius-full)'
                    }}
                    value={app.status}
                    onChange={(e) => onStatusChange(app.id, e.target.value)}
                  >
                    <option value="wishlist">💡 Wishlist</option>
                    <option value="applied">📨 Applied</option>
                    <option value="interviewing">🎯 Interviewing</option>
                    <option value="offer">🎉 Offer</option>
                    <option value="rejected">📋 Archived</option>
                  </select>
                </td>

                {/* Stipend */}
                <td>
                  {app.stipend ? (
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: '#34d399',
                        fontWeight: 600,
                        fontSize: '0.85rem'
                      }}
                    >
                      ${app.stipend}/{app.stipendPeriod === 'hourly' ? 'hr' : 'mo'}
                    </span>
                  ) : (
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>—</span>
                  )}
                </td>

                {/* Applied Date */}
                <td>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {app.applyDate || 'Pending'}
                  </span>
                </td>

                {/* Recruiter */}
                <td>
                  {app.recruiterName || app.recruiterEmail ? (
                    <div style={{ fontSize: '0.82rem' }}>
                      <div>{app.recruiterName || 'Contact'}</div>
                      {app.recruiterEmail && (
                        <a
                          href={`mailto:${app.recruiterEmail}`}
                          style={{
                            fontSize: '0.74rem',
                            color: 'var(--primary)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.2rem',
                            textDecoration: 'none'
                          }}
                        >
                          <Mail size={11} />
                          <span>{app.recruiterEmail}</span>
                        </a>
                      )}
                    </div>
                  ) : (
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>—</span>
                  )}
                </td>

                {/* Actions */}
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '0.25rem' }}>
                    <button
                      className="icon-btn"
                      onClick={() => onEdit(app)}
                      title="Edit"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      className="icon-btn"
                      onClick={() => onDelete(app.id)}
                      title="Delete"
                    >
                      <Trash2 size={13} color="#f43f5e" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
