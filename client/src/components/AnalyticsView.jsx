import React from 'react';
import {
  TrendingUp,
  PieChart,
  Calendar,
  Code2,
  CheckCircle,
  Award,
  Clock,
  Sparkles
} from 'lucide-react';

export default function AnalyticsView({ stats, applications }) {
  if (!stats) return null;

  const total = stats.total || 0;
  const counts = stats.counts || { wishlist: 0, applied: 0, interviewing: 0, offer: 0, rejected: 0 };
  const workModels = stats.workModelBreakdown || { Remote: 0, Hybrid: 0, 'On-site': 0 };
  const upcoming = stats.upcomingInterviews || [];
  const topSkills = stats.topSkills || [];

  const getPercent = (count) => {
    if (total === 0) return 0;
    return Math.round((count / total) * 100);
  };

  return (
    <div>
      <div className="analytics-grid">
        {/* Funnel Conversion Analytics */}
        <div className="analytics-card">
          <div className="analytics-header">
            <h3 className="analytics-title">
              <TrendingUp size={18} color="var(--primary)" />
              <span>Application Pipeline Funnel</span>
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {total} Total Submissions
            </span>
          </div>

          <div className="funnel-step">
            <div className="funnel-label-row">
              <span style={{ color: 'var(--stage-wishlist)' }}>💡 Target Wishlist</span>
              <span>{counts.wishlist} ({getPercent(counts.wishlist)}%)</span>
            </div>
            <div className="funnel-bar-track">
              <div
                className="funnel-bar-fill"
                style={{ width: `${getPercent(counts.wishlist)}%`, background: 'var(--stage-wishlist)' }}
              />
            </div>
          </div>

          <div className="funnel-step">
            <div className="funnel-label-row">
              <span style={{ color: 'var(--stage-applied)' }}>📨 Applied & Submitted</span>
              <span>{counts.applied} ({getPercent(counts.applied)}%)</span>
            </div>
            <div className="funnel-bar-track">
              <div
                className="funnel-bar-fill"
                style={{ width: `${getPercent(counts.applied)}%`, background: 'var(--stage-applied)' }}
              />
            </div>
          </div>

          <div className="funnel-step">
            <div className="funnel-label-row">
              <span style={{ color: 'var(--stage-interviewing)' }}>🎯 Interview Rounds</span>
              <span>{counts.interviewing} ({getPercent(counts.interviewing)}%)</span>
            </div>
            <div className="funnel-bar-track">
              <div
                className="funnel-bar-fill"
                style={{ width: `${getPercent(counts.interviewing)}%`, background: 'var(--stage-interviewing)' }}
              />
            </div>
          </div>

          <div className="funnel-step">
            <div className="funnel-label-row">
              <span style={{ color: 'var(--stage-offer)' }}>🎉 Final Offers Received</span>
              <span>{counts.offer} ({getPercent(counts.offer)}%)</span>
            </div>
            <div className="funnel-bar-track">
              <div
                className="funnel-bar-fill"
                style={{ width: `${getPercent(counts.offer)}%`, background: 'var(--stage-offer)' }}
              />
            </div>
          </div>
        </div>

        {/* Work Model Distribution */}
        <div className="analytics-card">
          <div className="analytics-header">
            <h3 className="analytics-title">
              <PieChart size={18} color="#06b6d4" />
              <span>Work Model Breakdown</span>
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
            {Object.entries(workModels).map(([model, count]) => {
              const pct = getPercent(count);
              const color = model === 'Remote' ? '#38bdf8' : (model === 'Hybrid' ? '#a78bfa' : '#34d399');
              return (
                <div key={model}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 600 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
                      {model}
                    </span>
                    <span>{count} positions ({pct}%)</span>
                  </div>
                  <div className="funnel-bar-track">
                    <div
                      className="funnel-bar-fill"
                      style={{ width: `${pct}%`, background: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              marginTop: '1.5rem',
              padding: '0.85rem',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)'
            }}
          >
            💡 <strong>Insight:</strong> {workModels.Remote || 0} of your applications offer Remote flexibility, maximizing interview scheduling efficiency.
          </div>
        </div>

        {/* Top Demanded Tech Skills */}
        <div className="analytics-card">
          <div className="analytics-header">
            <h3 className="analytics-title">
              <Code2 size={18} color="#ec4899" />
              <span>High-Frequency Tech Skills</span>
            </h3>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>
            Technologies and skill tags most requested by companies you have targeted:
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {topSkills.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(99, 102, 241, 0.1)',
                  border: '1px solid rgba(99, 102, 241, 0.25)',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  color: '#c7d2fe'
                }}
              >
                <span>{item.skill}</span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    padding: '0.1rem 0.4rem',
                    borderRadius: '999px',
                    background: 'rgba(255, 255, 255, 0.12)',
                    color: '#fff'
                  }}
                >
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Interview Schedule */}
        <div className="analytics-card">
          <div className="analytics-header">
            <h3 className="analytics-title">
              <Clock size={18} color="#fbbf24" />
              <span>Scheduled Interview Pipeline</span>
            </h3>
          </div>

          {upcoming.length === 0 ? (
            <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
              No upcoming interviews currently scheduled.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {upcoming.map((u, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(245, 158, 11, 0.08)',
                    border: '1px solid rgba(245, 158, 11, 0.2)'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>
                      {u.company} — <span style={{ fontWeight: 500, color: '#cbd5e1' }}>{u.roundName}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {u.notes || u.role}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#fbbf24',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      background: 'rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    {u.date}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
