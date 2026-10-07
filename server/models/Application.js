import mongoose from 'mongoose';

const InterviewRoundSchema = new mongoose.Schema({
  roundName: { type: String, required: true },
  date: { type: String, default: '' },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
  notes: { type: String, default: '' }
});

const ApplicationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    company: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    jobType: { type: String, default: 'Full-time' },
    workModel: { type: String, enum: ['Remote', 'Hybrid', 'On-site'], default: 'Hybrid' },
    location: { type: String, default: 'Remote' },
    stipend: { type: Number, default: null },
    stipendPeriod: { type: String, default: 'hourly' },
    currency: { type: String, default: 'USD' },
    status: {
      type: String,
      enum: ['wishlist', 'applied', 'interviewing', 'offer', 'rejected'],
      default: 'applied',
      index: true
    },
    applyDate: { type: String, default: '' },
    deadline: { type: String, default: '' },
    jobUrl: { type: String, default: '' },
    recruiterName: { type: String, default: '' },
    recruiterEmail: { type: String, default: '' },
    notes: { type: String, default: '' },
    tags: [{ type: String, trim: true }],
    interviews: [InterviewRoundSchema]
  },
  { timestamps: true }
);

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
