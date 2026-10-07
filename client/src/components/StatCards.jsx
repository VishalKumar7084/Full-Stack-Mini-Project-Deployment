import React from 'react';
import {
  Briefcase,
  TrendingUp,
  Award,
  CalendarCheck2,
  Clock,
  Sparkles
} from 'lucide-react';

export default function StatCards({ stats }) {
  if (!stats) return null;

  const total = stats.total || 0;
  const interviewing = stats.counts?.interviewing || 0;
  const applied = stats.counts?.applied || 0;
  const offers = stats.counts?.offer || 0;
  const scheduledInt = stats.totalScheduledInterviews || 0;
  const offerRate = stats.offerRate || 0;

  return (
    <div className="stats-grid">
      {/* Total Applications */}
      <div className="stat-card">
        <div className="stat-info">
          <span className="stat-label">Total Applications</span>
          <span className="stat-value">{total}</span>
          <span className="stat-subtext">Across {Object.keys(stats.workModelBreakdown || {}).length || 3} work models</span>
        </div>
        <div className="stat-icon-wrap" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
          <Briefcase size={24} />
        </div>
      </div>

      {/* Active Pipeline */}
      <div className="stat-card">
        <div className="stat-info">
          <span className="stat-label">Active Pipeline</span>
          <span className="stat-value">{applied + interviewing}</span>
          <span className="stat-subtext">{applied} pending review • {interviewing} active</span>
        </div>
        <div className="stat-icon-wrap" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
          <TrendingUp size={24} />
        </div>
      </div>

      {/* Offers Received */}
      <div className="stat-card">
        <div className="stat-info">
          <span className="stat-label">Offers Received</span>
          <span className="stat-value" style={{ color: '#34d399' }}>{offers}</span>
          <span className="stat-subtext">{offerRate}% overall offer conversion</span>
        </div>
        <div className="stat-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
          <Award size={24} />
        </div>
      </div>

      {/* Scheduled Interviews */}
      <div className="stat-card">
        <div className="stat-info">
          <span className="stat-label">Upcoming Rounds</span>
          <span className="stat-value" style={{ color: '#fbbf24' }}>{scheduledInt}</span>
          <span className="stat-subtext">Actionable interview rounds</span>
        </div>
        <div className="stat-icon-wrap" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
          <CalendarCheck2 size={24} />
        </div>
      </div>
    </div>
  );
}
