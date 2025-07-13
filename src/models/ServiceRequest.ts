import mongoose, { Schema, Document, models } from "mongoose";

export interface IServiceRequest extends Document {
  user: string;
  title: string;
  description: string;
  category: string;
  preferredDate: string;
}

const ServiceRequestSchema: Schema = new Schema(
  {
    user: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    category: { type: String, required: true },
    preferredDate: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.ServiceRequest || mongoose.model<IServiceRequest>("ServiceRequest", ServiceRequestSchema);
