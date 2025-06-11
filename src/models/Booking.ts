import mongoose, { Schema, Document, models } from "mongoose";

export interface IBooking extends Document {
requesterId: string;
providerId: string;
serviceId: string;
date: Date;
status: "pending" | "accepted" | "completed" | "cancelled";
timeCredits: number;
}

const BookingSchema: Schema = new Schema(
{
    requesterId: { type: String, required: true },
    providerId: { type: String, required: true },
    serviceId: { type: String, required: true },
    date: Date,
    status: {
    type: String,
enum: ["pending", "accepted", "completed", "cancelled"],
default: "pending",
    },
    timeCredits: { type: Number, required: true },
},
{ timestamps: true }
);

export default models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
