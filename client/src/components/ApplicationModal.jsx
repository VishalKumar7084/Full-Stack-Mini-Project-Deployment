import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Calendar, Clock, DollarSign, Building } from 'lucide-react';

export default function ApplicationModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  initialStatus = 'applied'
}) {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    jobType: 'Full-time',
    workModel: 'Hybrid',
    location: '',
    stipend: '',
    stipendPeriod: 'hourly',
    status: initialStatus,
    applyDate: new Date().toISOString().split('T')[0],
    deadline: '',
    jobUrl: '',
    recruiterName: '',
    recruiterEmail: '',
    tags: '',
    notes: '',
    interviews: []
  });

  const [newRound, setNewRound] = useState({
    roundName: '',
    date: new Date().toISOString().split('T')[0],
    status: 'scheduled',
    notes: ''
  });
  const [showAddRound, setShowAddRound] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        stipend: initialData.stipend !== null ? String(initialData.stipend) : '',
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : (initialData.tags || ''),
        interviews: Array.isArray(initialData.interviews) ? initialData.interviews : []
      });
    } else {
      setFormData({
        company: '',
        role: '',
        jobType: 'Full-time',
        workModel: 'Hybrid',
        location: '',
        stipend: '',
        stipendPeriod: 'hourly',
        status: initialStatus || 'applied',
        applyDate: new Date().toISOString().split('T')[0],
        deadline: '',
        jobUrl: '',
        recruiterName: '',
        recruiterEmail: '',
        tags: '',
        notes: '',
        interviews: []
      });
    }
  }, [initialData, initialStatus, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRound = () => {
    if (!newRound.roundName.trim()) return;
    setFormData((prev) => ({
      ...prev,
      interviews: [
        ...prev.interviews,
        {
          id: `int_${Date.now()}`,
          roundName: newRound.roundName.trim(),
          date: newRound.date,
          status: newRound.status,
          notes: newRound.notes.trim()
        }
      ]
    }));
    setNewRound({
      roundName: '',
      date: new Date().toISOString().split('T')[0],
      status: 'scheduled',
      notes: ''
    });
    setShowAddRound(false);
  };

  const handleRemoveRound = (index) => {
    setFormData((prev) => ({
      ...prev,
      interviews: prev.interviews.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.company.trim() || !formData.role.trim()) {
      alert('Company Name and Role Title are required.');
      return;
    }

    const payload = {
      ...formData,
      stipend: formData.stipend ? Number(formData.stipend) : null,
      tags: formData.tags ? formData.tags.split(',').map((s) => s.trim()).filter(Boolean) : []
    };

    onSubmit(payload);
  };

  return (
    <div className="editorial-modal-backdrop" onClick={onClose}>
      <div className="editorial-modal-window" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-editorial">
          <h3>
            {initialData ? 'Edit Opportunity' : 'Track New Opportunity'}
          </h3>
          <button className="nav-link" onClick={onClose} style={{ padding: '0.25rem' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body-editorial">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1rem' }}>
              {/* Company */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--pine-800)', display: 'block', marginBottom: '0.35rem' }}>
                  Company Name *
                </label>
                <input
                  id="modal-input-company"
                  type="text"
                  name="company"
                  className="search-field-input"
                  style={{ borderRadius: 'var(--radius-md)', padding: '0.65rem 0.9rem' }}
                  required
                  placeholder="e.g. Stripe, Linear, Figma"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              {/* Role */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--pine-800)', display: 'block', marginBottom: '0.35rem' }}>
                  Role / Position *
                </label>
                <input
                  id="modal-input-role"
                  type="text"
                  name="role"
                  className="search-field-input"
                  style={{ borderRadius: 'var(--radius-md)', padding: '0.65rem 0.9rem' }}
                  required
                  placeholder="e.g. Frontend Engineer"
                  value={formData.role}
                  onChange={handleChange}
                />
              </div>

              {/* Status */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--pine-800)', display: 'block', marginBottom: '0.35rem' }}>
                  Pipeline Stage
                </label>
                <select
                  id="modal-select-status"
                  name="status"
                  className="search-field-input"
                  style={{ borderRadius: 'var(--radius-md)', padding: '0.65rem 0.9rem', background: '#FFFFFF' }}
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="wishlist">Target Wishlist</option>
                  <option value="applied">In Motion (Applied)</option>
                  <option value="interviewing">Active Loops</option>
                  <option value="offer">Offer Extended</option>
                  <option value="rejected">Retrospective</option>
                </select>
              </div>

              {/* Work Model */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--pine-800)', display: 'block', marginBottom: '0.35rem' }}>
                  Work Model
                </label>
                <select
                  name="workModel"
                  className="search-field-input"
                  style={{ borderRadius: 'var(--radius-md)', padding: '0.65rem 0.9rem', background: '#FFFFFF' }}
                  value={formData.workModel}
                  onChange={handleChange}
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--pine-800)', display: 'block', marginBottom: '0.35rem' }}>
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  className="search-field-input"
                  style={{ borderRadius: 'var(--radius-md)', padding: '0.65rem 0.9rem' }}
                  placeholder="e.g. San Francisco, CA / Remote"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              {/* Stipend */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--pine-800)', display: 'block', marginBottom: '0.35rem' }}>
                  Compensation ($)
                </label>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <input
                    type="number"
                    name="stipend"
                    className="search-field-input"
                    style={{ flex: 1, borderRadius: 'var(--radius-md)', padding: '0.65rem 0.9rem' }}
                    placeholder="e.g. 55"
                    value={formData.stipend}
                    onChange={handleChange}
                  />
                  <select
                    name="stipendPeriod"
                    className="search-field-input"
                    style={{ width: '90px', borderRadius: 'var(--radius-md)', padding: '0.65rem', background: '#FFFFFF' }}
                    value={formData.stipendPeriod}
                    onChange={handleChange}
                  >
                    <option value="hourly">/hr</option>
                    <option value="monthly">/mo</option>
                  </select>
                </div>
              </div>

              {/* Deadline */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--pine-800)', display: 'block', marginBottom: '0.35rem' }}>
                  Target Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  className="search-field-input"
                  style={{ borderRadius: 'var(--radius-md)', padding: '0.65rem 0.9rem' }}
                  value={formData.deadline}
                  onChange={handleChange}
                />
              </div>

              {/* Job URL */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--pine-800)', display: 'block', marginBottom: '0.35rem' }}>
                  Job Listing Link
                </label>
                <input
                  type="url"
                  name="jobUrl"
                  className="search-field-input"
                  style={{ borderRadius: 'var(--radius-md)', padding: '0.65rem 0.9rem' }}
                  placeholder="https://company.com/careers"
                  value={formData.jobUrl}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Tags */}
            <div style={{ marginTop: '1rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--pine-800)', display: 'block', marginBottom: '0.35rem' }}>
                Skills & Technologies (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                className="search-field-input"
                style={{ borderRadius: 'var(--radius-md)', padding: '0.65rem 0.9rem' }}
                placeholder="React, TypeScript, Node.js, GraphQL"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>

            {/* Notes */}
            <div style={{ marginTop: '1rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--pine-800)', display: 'block', marginBottom: '0.35rem' }}>
                Context & Interview Notes
              </label>
              <textarea
                name="notes"
                className="search-field-input"
                style={{ width: '100%', minHeight: '80px', borderRadius: 'var(--radius-md)', padding: '0.65rem 0.9rem', resize: 'vertical' }}
                placeholder="Key interviewer names, referral context, talking points..."
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            {/* Interview Rounds */}
            <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-divider)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--pine-800)' }}>
                  Interview Loops ({formData.interviews?.length || 0})
                </span>
                {!showAddRound && (
                  <button
                    type="button"
                    className="btn-pill-secondary"
                    style={{ padding: '0.35rem 0.8rem', fontSize: '0.78rem' }}
                    onClick={() => setShowAddRound(true)}
                  >
                    <Plus size={13} />
                    <span>Add Round</span>
                  </button>
                )}
              </div>

              {formData.interviews?.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  {formData.interviews.map((round, idx) => (
                    <div
                      key={round.id || idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        background: '#FFFFFF',
                        border: '1px solid var(--border-card)',
                        fontSize: '0.84rem'
                      }}
                    >
                      <div>
                        <strong>{round.roundName}</strong> • <span style={{ color: 'var(--text-muted)' }}>{round.date}</span>
                      </div>
                      <button
                        type="button"
                        className="nav-link"
                        style={{ padding: '0.2rem', color: '#DC2626' }}
                        onClick={() => handleRemoveRound(idx)}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {showAddRound && (
                <div style={{ padding: '1rem', background: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-card)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                    <input
                      type="text"
                      className="search-field-input"
                      style={{ borderRadius: 'var(--radius-sm)', padding: '0.5rem 0.75rem' }}
                      placeholder="Round Title (e.g. Technical Phone Screen)"
                      value={newRound.roundName}
                      onChange={(e) => setNewRound({ ...newRound, roundName: e.target.value })}
                    />
                    <input
                      type="date"
                      className="search-field-input"
                      style={{ borderRadius: 'var(--radius-sm)', padding: '0.5rem 0.75rem' }}
                      value={newRound.date}
                      onChange={(e) => setNewRound({ ...newRound, date: e.target.value })}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button
                      type="button"
                      className="nav-link"
                      onClick={() => setShowAddRound(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn-pill-primary"
                      style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}
                      onClick={handleAddRound}
                    >
                      Save Round
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="modal-footer-editorial">
            <button type="button" className="nav-link" onClick={onClose}>
              Cancel
            </button>
            <button id="modal-save-btn" type="submit" className="btn-pill-primary">
              {initialData ? 'Update Opportunity' : 'Save Opportunity'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
