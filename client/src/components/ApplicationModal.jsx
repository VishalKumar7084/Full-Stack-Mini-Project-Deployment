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
    jobType: 'Internship',
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
        jobType: 'Internship',
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            {initialData ? 'Edit Application' : 'Track New Application'}
          </h3>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              {/* Company */}
              <div className="form-group">
                <label className="form-label">Company Name *</label>
                <input
                  id="modal-input-company"
                  type="text"
                  name="company"
                  className="form-input"
                  required
                  placeholder="e.g. Stripe, Google, Spotify"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              {/* Role */}
              <div className="form-group">
                <label className="form-label">Role / Position *</label>
                <input
                  id="modal-input-role"
                  type="text"
                  name="role"
                  className="form-input"
                  required
                  placeholder="e.g. Frontend Developer Intern"
                  value={formData.role}
                  onChange={handleChange}
                />
              </div>

              {/* Pipeline Status */}
              <div className="form-group">
                <label className="form-label">Pipeline Stage</label>
                <select
                  id="modal-select-status"
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="wishlist">💡 Wishlist (Target)</option>
                  <option value="applied">📨 Applied (Submitted)</option>
                  <option value="interviewing">🎯 Interviewing</option>
                  <option value="offer">🎉 Offer Received</option>
                  <option value="rejected">📋 Archived / Rejected</option>
                </select>
              </div>

              {/* Job Type */}
              <div className="form-group">
                <label className="form-label">Job Type</label>
                <select
                  id="modal-select-jobType"
                  name="jobType"
                  className="form-select"
                  value={formData.jobType}
                  onChange={handleChange}
                >
                  <option value="Internship">Internship</option>
                  <option value="Co-op">Co-op (College Semester)</option>
                  <option value="Full-time">Full-time (Graduate)</option>
                  <option value="Part-time">Part-time</option>
                </select>
              </div>

              {/* Work Model */}
              <div className="form-group">
                <label className="form-label">Work Model</label>
                <select
                  id="modal-select-workModel"
                  name="workModel"
                  className="form-select"
                  value={formData.workModel}
                  onChange={handleChange}
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>

              {/* Location */}
              <div className="form-group">
                <label className="form-label">Location / City</label>
                <input
                  id="modal-input-location"
                  type="text"
                  name="location"
                  className="form-input"
                  placeholder="e.g. San Francisco, CA / Remote"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              {/* Stipend Rate */}
              <div className="form-group">
                <label className="form-label">Stipend / Compensation ($)</label>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <input
                    id="modal-input-stipend"
                    type="number"
                    name="stipend"
                    className="form-input"
                    style={{ flex: 1 }}
                    placeholder="e.g. 50"
                    value={formData.stipend}
                    onChange={handleChange}
                  />
                  <select
                    name="stipendPeriod"
                    className="form-select"
                    style={{ width: '90px' }}
                    value={formData.stipendPeriod}
                    onChange={handleChange}
                  >
                    <option value="hourly">/hr</option>
                    <option value="monthly">/mo</option>
                  </select>
                </div>
              </div>

              {/* Application Date */}
              <div className="form-group">
                <label className="form-label">Date Applied</label>
                <input
                  id="modal-input-applyDate"
                  type="date"
                  name="applyDate"
                  className="form-input"
                  value={formData.applyDate}
                  onChange={handleChange}
                />
              </div>

              {/* Deadline */}
              <div className="form-group">
                <label className="form-label">Application Deadline</label>
                <input
                  id="modal-input-deadline"
                  type="date"
                  name="deadline"
                  className="form-input"
                  value={formData.deadline}
                  onChange={handleChange}
                />
              </div>

              {/* Job Posting URL */}
              <div className="form-group full-width">
                <label className="form-label">Job Listing URL</label>
                <input
                  id="modal-input-jobUrl"
                  type="url"
                  name="jobUrl"
                  className="form-input"
                  placeholder="https://company.com/careers/internship"
                  value={formData.jobUrl}
                  onChange={handleChange}
                />
              </div>

              {/* Recruiter Contact */}
              <div className="form-group">
                <label className="form-label">Recruiter / Contact Name</label>
                <input
                  id="modal-input-recruiterName"
                  type="text"
                  name="recruiterName"
                  className="form-input"
                  placeholder="e.g. Sarah Connor"
                  value={formData.recruiterName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Recruiter Email</label>
                <input
                  id="modal-input-recruiterEmail"
                  type="email"
                  name="recruiterEmail"
                  className="form-input"
                  placeholder="sarah@company.com"
                  value={formData.recruiterEmail}
                  onChange={handleChange}
                />
              </div>

              {/* Tags / Skills */}
              <div className="form-group full-width">
                <label className="form-label">Skills & Tech Stack Tags (comma separated)</label>
                <input
                  id="modal-input-tags"
                  type="text"
                  name="tags"
                  className="form-input"
                  placeholder="React, TypeScript, Node.js, GraphQL"
                  value={formData.tags}
                  onChange={handleChange}
                />
              </div>

              {/* Notes */}
              <div className="form-group full-width">
                <label className="form-label">Preparation Notes & Follow-ups</label>
                <textarea
                  id="modal-textarea-notes"
                  name="notes"
                  className="form-textarea"
                  placeholder="Key talking points, resume customizations, referral names, interview questions..."
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>

              {/* Interview Rounds Manager */}
              <div className="form-group full-width">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label className="form-label" style={{ marginBottom: 0 }}>
                    Interview Rounds ({formData.interviews?.length || 0})
                  </label>
                  {!showAddRound && (
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => setShowAddRound(true)}
                    >
                      <Plus size={13} />
                      <span>Add Round</span>
                    </button>
                  )}
                </div>

                {/* Existing rounds */}
                {formData.interviews?.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.75rem' }}>
                    {formData.interviews.map((round, idx) => (
                      <div
                        key={round.id || idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.4rem 0.75rem',
                          borderRadius: 'var(--radius-sm)',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid var(--border-subtle)',
                          fontSize: '0.82rem'
                        }}
                      >
                        <div>
                          <strong>{round.roundName}</strong> — <span>{round.date}</span> ({round.status})
                        </div>
                        <button
                          type="button"
                          className="icon-btn"
                          onClick={() => handleRemoveRound(idx)}
                          title="Remove round"
                        >
                          <Trash2 size={13} color="#f43f5e" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Form to add a new round */}
                {showAddRound && (
                  <div
                    style={{
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px dashed var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Round Name (e.g. Technical Phone Screen)"
                        value={newRound.roundName}
                        onChange={(e) => setNewRound({ ...newRound, roundName: e.target.value })}
                      />
                      <input
                        type="date"
                        className="form-input"
                        value={newRound.date}
                        onChange={(e) => setNewRound({ ...newRound, date: e.target.value })}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => setShowAddRound(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={handleAddRound}
                      >
                        Save Round
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button id="modal-submit-btn" type="submit" className="btn btn-primary">
              {initialData ? 'Save Changes' : 'Create Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
