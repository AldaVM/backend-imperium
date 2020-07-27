import { Schema, model, Document } from "mongoose";

export interface IPaid extends Document {
  payment_type: string;
  weeks: number;
  price: number;
}

const paidSchema = new Schema({
  payment_type: {
    type: String,
    required: [true, "payment_type is required"],
  },
  weeks: {
    type: Number,
    required: [true, "weeks is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
});

export default model<IPaid>("paid", paidSchema);
