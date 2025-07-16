import mongoose, { Schema, Document, models, Types } from 'mongoose';

export interface IBooking extends Document {
  serviceOffer?: Types.ObjectId;
  serviceRequest?: Types.ObjectId;
  bookedBy: Types.ObjectId;
  bookedWith: Types.ObjectId;
  status: 'pending' | 'confirmed' | 'completed' | 'rejected' | 'cancelled';
  scheduledDate: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    serviceOffer: { type: Schema.Types.ObjectId, ref: 'ServiceOffer' },
    serviceRequest: { type: Schema.Types.ObjectId, ref: 'ServiceRequest' },
    bookedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bookedWith: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'rejected', 'cancelled'],
      default: 'pending',
    },
    scheduledDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export default models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
