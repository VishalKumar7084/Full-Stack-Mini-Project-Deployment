import { db } from '../config/db.js';

export async function getDashboardStats(req, res) {
  try {
    const stats = db.getStats(req.user.id);
    const applications = db.getApplications(req.user.id);

    // Calculate upcoming interviews
    const today = new Date().toISOString().split('T')[0];
    const upcomingInterviews = [];

    applications.forEach(app => {
      if (app.interviews && Array.isArray(app.interviews)) {
        app.interviews.forEach(round => {
          if (round.status === 'scheduled' && round.date >= today) {
            upcomingInterviews.push({
              applicationId: app.id,
              company: app.company,
              role: app.role,
              roundName: round.roundName,
              date: round.date,
              notes: round.notes
            });
          }
        });
      }
    });

    upcomingInterviews.sort((a, b) => a.date.localeCompare(b.date));

    // Top tags/skills demanded
    const tagCount = {};
    applications.forEach(app => {
      if (app.tags && Array.isArray(app.tags)) {
        app.tags.forEach(t => {
          tagCount[t] = (tagCount[t] || 0) + 1;
        });
      }
    });

    const topSkills = Object.entries(tagCount)
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    return res.json({
      success: true,
      data: {
        ...stats,
        upcomingInterviews,
        topSkills
      }
    });
  } catch (err) {
    console.error('Stats error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve stats.'
    });
  }
}
