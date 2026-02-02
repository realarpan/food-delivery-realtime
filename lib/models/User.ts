import { Schema, model, Types } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  phone: String,
  address: String,
  mfaEnabled: { type: Boolean, default: false },
  mfaSecret: String,
  backupCodes: [String],
  avatar: String,
  role: { type: String, enum: ['user', 'restaurant', 'admin'], default: 'user' },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

export const User = model('User', UserSchema);
