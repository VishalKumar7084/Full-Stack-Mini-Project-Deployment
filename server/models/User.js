import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    title: { type: String, default: 'Candidate & Job Seeker' },
    university: { type: String, default: '' },
    avatarUrl: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
