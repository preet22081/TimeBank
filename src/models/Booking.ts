import mongoose, { Schema, Document, models } from "mongoose";

export interface IBooking extends Document {
requesterId: string;
providerId: string;
serviceId: string;
date: Date;
status: "pending" | "accepted" | "completed" | "cancelled";
timeCredits: number;
}

const BookingSchema = new Schema({
  serviceOffer: { type: Schema.Types.ObjectId, ref: 'ServiceOffer' },
  serviceRequest: { type: Schema.Types.ObjectId, ref: 'ServiceRequest' },
  bookedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  bookedWith: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' },
  scheduledDate: Date,
}, { timestamps: true });


export default models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
