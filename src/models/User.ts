import mongoose, { Schema, Document, models } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  bio?: string;
  skillsOffered: string[];
  skillsNeeded: string[];
  timeCredits: number;
  avatarUrl?: string;
  role: 'user' | 'admin'; // ✅ include role in the TypeScript interface
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: String,
    skillsOffered: [String],
    skillsNeeded: [String],
    timeCredits: { type: Number, default: 0 },
    avatarUrl: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    }, // ✅ add this
  },
  { timestamps: true }
);

export default models.User || mongoose.model<IUser>("User", UserSchema);
