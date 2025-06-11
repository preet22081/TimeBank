import mongoose, { Schema, Document, models } from "mongoose";

export interface IReview extends Document {
reviewerId: string;
revieweeId: string;
bookingId: string;
rating: number;
comment: string;
}

const ReviewSchema: Schema = new Schema(
{
    reviewerId: { type: String, required: true },
    revieweeId: { type: String, required: true },
    bookingId: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: String,
},
{ timestamps: true }
);

export default models.Review || mongoose.model<IReview>("Review", ReviewSchema);
