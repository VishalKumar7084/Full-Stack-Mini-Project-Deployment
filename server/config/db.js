import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'careerflow.db.json');

// In-memory cache synced to JSON file
let memoryDb = {
  users: [],
  applications: []
};

let isWriting = false;
let pendingWrite = false;

// Ensure directory exists
if (!fsSync.existsSync(DATA_DIR)) {
  fsSync.mkdirSync(DATA_DIR, { recursive: true });
}

// Atomic file persist
async function persistDb() {
  if (isWriting) {
    pendingWrite = true;
    return;
  }
  isWriting = true;
  try {
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    await fs.writeFile(tempFile, JSON.stringify(memoryDb, null, 2), 'utf-8');
    await fs.rename(tempFile, DB_FILE);
  } catch (err) {
    console.error('Error persisting database:', err);
  } finally {
    isWriting = false;
    if (pendingWrite) {
      pendingWrite = false;
      await persistDb();
    }
  }
}

// Initialize database
export async function initDb() {
  try {
    if (fsSync.existsSync(DB_FILE)) {
      const raw = await fs.readFile(DB_FILE, 'utf-8');
      memoryDb = JSON.parse(raw);
    } else {
      memoryDb = { users: [], applications: [] };
      await seedInitialData();
      await persistDb();
    }
  } catch (err) {
    console.error('Failed to load DB, reinitializing:', err);
    memoryDb = { users: [], applications: [] };
    await seedInitialData();
    await persistDb();
  }
}

// Realistic seed data
export async function seedInitialData() {
  const demoHashedPassword = await bcrypt.hash('DemoPass123!', 10);
  const demoUserId = 'usr_demo_intern_101';

  const demoUser = {
    id: demoUserId,
    name: 'Alex Rivera',
    email: 'demo@careerflow.dev',
    passwordHash: demoHashedPassword,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'Aspiring Software Engineer & Web Developer',
    university: 'Stanford University / Computer Science',
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString()
  };

  const sampleApps = [
    {
      id: 'app_001',
      userId: demoUserId,
      company: 'Stripe',
      role: 'Frontend Engineering Intern',
      jobType: 'Internship',
      workModel: 'Hybrid',
      location: 'San Francisco, CA',
      stipend: 55,
      stipendPeriod: 'hourly',
      currency: 'USD',
      status: 'offer',
      applyDate: '2026-08-15',
      deadline: '2026-09-01',
      jobUrl: 'https://stripe.com/jobs/intern',
      recruiterName: 'Elena Rostova',
      recruiterEmail: 'elena@stripe.com',
      notes: 'Received written offer for Summer 2026! Mentorship program looks amazing, tech stack is React, TypeScript, and design systems.',
      tags: ['React', 'TypeScript', 'UI/UX', 'Design Systems'],
      interviews: [
        { id: 'int_1', roundName: 'Recruiter Screen', date: '2026-08-20', status: 'completed', notes: 'Discussed past projects and graduation date.' },
        { id: 'int_2', roundName: 'Technical Phone Screen', date: '2026-08-27', status: 'completed', notes: 'JavaScript event loop, custom hook implementation.' },
        { id: 'int_3', roundName: 'Virtual Onsite (3 rounds)', date: '2026-09-08', status: 'completed', notes: 'UI architecture, algorithmic challenge, behavioral.' }
      ],
      createdAt: '2026-08-15T10:00:00.000Z',
      updatedAt: '2026-09-12T15:30:00.000Z'
    },
    {
      id: 'app_002',
      userId: demoUserId,
      company: 'Google',
      role: 'Software Student Trainee (STEP Intern)',
      jobType: 'Internship',
      workModel: 'On-site',
      location: 'Mountain View, CA',
      stipend: 52,
      stipendPeriod: 'hourly',
      currency: 'USD',
      status: 'interviewing',
      applyDate: '2026-08-25',
      deadline: '2026-09-15',
      jobUrl: 'https://careers.google.com/jobs',
      recruiterName: 'Marcus Vance',
      recruiterEmail: 'mvance@google.com',
      notes: 'Passed initial screening. Preparing for 2 back-to-back 45-minute coding rounds on data structures.',
      tags: ['Algorithms', 'Python', 'Go', 'Distributed Systems'],
      interviews: [
        { id: 'int_4', roundName: 'Resume Screening', date: '2026-08-29', status: 'completed', notes: 'Screening passed.' },
        { id: 'int_5', roundName: 'Technical Interview 1', date: '2026-10-12', status: 'scheduled', notes: 'Graphs and dynamic programming practice.' },
        { id: 'int_6', roundName: 'Technical Interview 2', date: '2026-10-14', status: 'scheduled', notes: 'System design basics and problem solving.' }
      ],
      createdAt: '2026-08-25T14:15:00.000Z',
      updatedAt: '2026-10-02T11:20:00.000Z'
    },
    {
      id: 'app_003',
      userId: demoUserId,
      company: 'Vercel',
      role: 'Full-Stack Developer Intern',
      jobType: 'Internship',
      workModel: 'Remote',
      location: 'Remote (US/Global)',
      stipend: 50,
      stipendPeriod: 'hourly',
      currency: 'USD',
      status: 'interviewing',
      applyDate: '2026-09-02',
      deadline: '2026-09-20',
      jobUrl: 'https://vercel.com/careers',
      recruiterName: 'Sarah Jenkins',
      recruiterEmail: 's.jenkins@vercel.com',
      notes: 'Take-home assignment submitted on Next.js App Router and Edge Middleware. Scheduled for review call.',
      tags: ['Next.js', 'React', 'Node.js', 'Edge Functions', 'Tailwind'],
      interviews: [
        { id: 'int_7', roundName: 'Take-Home Project', date: '2026-09-10', status: 'completed', notes: 'Built a collaborative dashboard demo.' },
        { id: 'int_8', roundName: 'Engineering Discussion', date: '2026-10-09', status: 'scheduled', notes: 'Deep dive into rendering paradigms and code review.' }
      ],
      createdAt: '2026-09-02T09:40:00.000Z',
      updatedAt: '2026-10-04T16:00:00.000Z'
    },
    {
      id: 'app_004',
      userId: demoUserId,
      company: 'Figma',
      role: 'Product Engineering Intern',
      jobType: 'Internship',
      workModel: 'Hybrid',
      location: 'San Francisco, CA',
      stipend: 56,
      stipendPeriod: 'hourly',
      currency: 'USD',
      status: 'applied',
      applyDate: '2026-09-18',
      deadline: '2026-10-10',
      jobUrl: 'https://figma.com/careers',
      recruiterName: 'David Cho',
      recruiterEmail: 'dcho@figma.com',
      notes: 'Applied via referral from Stanford alumni. Highlighted WebGL and canvas canvas manipulation projects.',
      tags: ['TypeScript', 'WebGL', 'WASM', 'Canvas API'],
      interviews: [],
      createdAt: '2026-09-18T16:20:00.000Z',
      updatedAt: '2026-09-18T16:20:00.000Z'
    },
    {
      id: 'app_005',
      userId: demoUserId,
      company: 'Airbnb',
      role: 'Frontend Engineering Intern',
      jobType: 'Internship',
      workModel: 'Remote',
      location: 'Remote',
      stipend: 54,
      stipendPeriod: 'hourly',
      currency: 'USD',
      status: 'applied',
      applyDate: '2026-09-22',
      deadline: '2026-10-15',
      jobUrl: 'https://careers.airbnb.com',
      recruiterName: 'Chloe Bennett',
      recruiterEmail: 'cbennett@airbnb.com',
      notes: 'Application submitted through career portal. Focused on component library and accessibility standards.',
      tags: ['React', 'Accessibility (a11y)', 'GraphQL', 'Jest'],
      interviews: [],
      createdAt: '2026-09-22T11:05:00.000Z',
      updatedAt: '2026-09-22T11:05:00.000Z'
    },
    {
      id: 'app_006',
      userId: demoUserId,
      company: 'Linear',
      role: 'Software Engineer Intern',
      jobType: 'Internship',
      workModel: 'Remote',
      location: 'San Francisco / Remote',
      stipend: 60,
      stipendPeriod: 'hourly',
      currency: 'USD',
      status: 'wishlist',
      applyDate: '',
      deadline: '2026-10-25',
      jobUrl: 'https://linear.app/careers',
      recruiterName: 'Tuomas Artman',
      recruiterEmail: 'talent@linear.app',
      notes: 'Need to tailor resume to emphasize high-speed client-side synchronization and SQLite/IndexedDB experience.',
      tags: ['React', 'TypeScript', 'IndexedDB', 'Realtime Sync'],
      interviews: [],
      createdAt: '2026-09-28T18:00:00.000Z',
      updatedAt: '2026-09-28T18:00:00.000Z'
    },
    {
      id: 'app_007',
      userId: demoUserId,
      company: 'Spotify',
      role: 'Web Platform Intern',
      jobType: 'Internship',
      workModel: 'Hybrid',
      location: 'New York, NY',
      stipend: 48,
      stipendPeriod: 'hourly',
      currency: 'USD',
      status: 'rejected',
      applyDate: '2026-08-10',
      deadline: '2026-08-30',
      jobUrl: 'https://spotifyjobs.com',
      recruiterName: 'Lukas Meyer',
      recruiterEmail: 'lmeyer@spotify.com',
      notes: 'Position closed early due to high volume. Encouraged to reapply for Spring 2027.',
      tags: ['JavaScript', 'CSS Architecture', 'Web Audio API'],
      interviews: [
        { id: 'int_9', roundName: 'Resume Screening', date: '2026-08-18', status: 'completed', notes: 'Pool filled.' }
      ],
      createdAt: '2026-08-10T12:00:00.000Z',
      updatedAt: '2026-09-01T09:00:00.000Z'
    }
  ];

  memoryDb.users = [demoUser];
  memoryDb.applications = sampleApps;
  await persistDb();
}

// User repository methods
export const db = {
  // Users
  findUserByEmail(email) {
    return memoryDb.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  findUserById(id) {
    return memoryDb.users.find(u => u.id === id);
  },

  async createUser({ name, email, passwordHash, title, university }) {
    const newUser = {
      id: `usr_${crypto.randomUUID().slice(0, 8)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
      title: title || 'Full-Stack Developer / Intern Candidate',
      university: university || 'Computer Science Student',
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=4f46e5,06b6d4`,
      createdAt: new Date().toISOString()
    };
    memoryDb.users.push(newUser);
    await persistDb();
    return newUser;
  },

  // Applications
  getApplications(userId, { status, search, sortBy = 'updatedAt', sortOrder = 'desc' } = {}) {
    let apps = memoryDb.applications.filter(a => a.userId === userId);

    if (status && status !== 'all') {
      apps = apps.filter(a => a.status.toLowerCase() === status.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      apps = apps.filter(a =>
        a.company.toLowerCase().includes(q) ||
        a.role.toLowerCase().includes(q) ||
        (a.location && a.location.toLowerCase().includes(q)) ||
        (a.tags && a.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    apps.sort((a, b) => {
      let valA = a[sortBy] || '';
      let valB = b[sortBy] || '';

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return apps;
  },

  getApplicationById(id, userId) {
    return memoryDb.applications.find(a => a.id === id && a.userId === userId);
  },

  async createApplication(userId, data) {
    const newApp = {
      id: `app_${crypto.randomUUID().slice(0, 8)}`,
      userId,
      company: data.company.trim(),
      role: data.role.trim(),
      jobType: data.jobType || 'Internship',
      workModel: data.workModel || 'Hybrid',
      location: data.location ? data.location.trim() : 'Remote',
      stipend: data.stipend ? Number(data.stipend) : null,
      stipendPeriod: data.stipendPeriod || 'hourly',
      currency: data.currency || 'USD',
      status: (data.status || 'applied').toLowerCase(),
      applyDate: data.applyDate || new Date().toISOString().split('T')[0],
      deadline: data.deadline || '',
      jobUrl: data.jobUrl || '',
      recruiterName: data.recruiterName || '',
      recruiterEmail: data.recruiterEmail || '',
      notes: data.notes || '',
      tags: Array.isArray(data.tags) ? data.tags : (data.tags ? data.tags.split(',').map(s => s.trim()).filter(Boolean) : []),
      interviews: Array.isArray(data.interviews) ? data.interviews : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    memoryDb.applications.push(newApp);
    await persistDb();
    return newApp;
  },

  async updateApplication(id, userId, data) {
    const index = memoryDb.applications.findIndex(a => a.id === id && a.userId === userId);
    if (index === -1) return null;

    const current = memoryDb.applications[index];
    const updated = {
      ...current,
      ...data,
      id: current.id,
      userId: current.userId,
      createdAt: current.createdAt,
      updatedAt: new Date().toISOString(),
      tags: Array.isArray(data.tags)
        ? data.tags
        : (data.tags !== undefined ? (typeof data.tags === 'string' ? data.tags.split(',').map(s => s.trim()).filter(Boolean) : current.tags) : current.tags),
      interviews: Array.isArray(data.interviews) ? data.interviews : current.interviews
    };

    memoryDb.applications[index] = updated;
    await persistDb();
    return updated;
  },

  async updateStatus(id, userId, newStatus) {
    const app = memoryDb.applications.find(a => a.id === id && a.userId === userId);
    if (!app) return null;

    app.status = newStatus.toLowerCase();
    app.updatedAt = new Date().toISOString();
    await persistDb();
    return app;
  },

  async deleteApplication(id, userId) {
    const index = memoryDb.applications.findIndex(a => a.id === id && a.userId === userId);
    if (index === -1) return false;

    memoryDb.applications.splice(index, 1);
    await persistDb();
    return true;
  },

  async addInterviewRound(appId, userId, interviewData) {
    const app = memoryDb.applications.find(a => a.id === appId && a.userId === userId);
    if (!app) return null;

    const round = {
      id: `int_${crypto.randomUUID().slice(0, 6)}`,
      roundName: interviewData.roundName || 'Interview Round',
      date: interviewData.date || new Date().toISOString().split('T')[0],
      status: interviewData.status || 'scheduled',
      notes: interviewData.notes || ''
    };

    if (!app.interviews) app.interviews = [];
    app.interviews.push(round);
    app.updatedAt = new Date().toISOString();
    await persistDb();
    return app;
  },

  getStats(userId) {
    const userApps = memoryDb.applications.filter(a => a.userId === userId);
    const total = userApps.length;

    const counts = {
      wishlist: 0,
      applied: 0,
      interviewing: 0,
      offer: 0,
      rejected: 0
    };

    let totalScheduledInterviews = 0;
    const workModelBreakdown = { Remote: 0, Hybrid: 0, 'On-site': 0 };
    const monthlyTimeline = {};

    userApps.forEach(app => {
      const s = (app.status || 'applied').toLowerCase();
      if (counts[s] !== undefined) counts[s]++;

      const wm = app.workModel || 'Remote';
      workModelBreakdown[wm] = (workModelBreakdown[wm] || 0) + 1;

      if (app.interviews && Array.isArray(app.interviews)) {
        totalScheduledInterviews += app.interviews.filter(i => i.status === 'scheduled').length;
      }

      if (app.applyDate) {
        const monthKey = app.applyDate.slice(0, 7); // YYYY-MM
        monthlyTimeline[monthKey] = (monthlyTimeline[monthKey] || 0) + 1;
      }
    });

    const activeApplications = counts.applied + counts.interviewing;
    const offerRate = total > 0 ? Math.round((counts.offer / total) * 100) : 0;
    const interviewRate = total > 0 ? Math.round(((counts.interviewing + counts.offer) / total) * 100) : 0;

    return {
      total,
      counts,
      activeApplications,
      offerRate,
      interviewRate,
      totalScheduledInterviews,
      workModelBreakdown,
      monthlyTimeline
    };
  }
};
