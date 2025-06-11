import mongoose, { Schema, Document, models } from "mongoose";

export interface IServiceRequest extends Document {
userId: string;
title: string;
description: string;
category: string;
timeRequired: number;
status: "open" | "booked" | "completed";
}

const ServiceRequestSchema: Schema = new Schema(
{
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    category: { type: String, required: true },
    timeRequired: { type: Number, default: 1 },
    status: { type: String, enum: ["open", "booked", "completed"], default: "open" },
},
{ timestamps: true }
);

export default models.ServiceRequest || mongoose.model<IServiceRequest>("ServiceRequest", ServiceRequestSchema);
