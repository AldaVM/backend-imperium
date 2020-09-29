import { model, Schema, Document } from "mongoose";

export interface IRangeHour extends Document {
  hours: string;
  customers?: [object];
  timetable?: [object];
  limit_customer: number;
  customer_length: number;
}

const rangeHourSchema = new Schema({
  hours: {
    type: String,
    required: [true, "hours is required"],
  },
  timetable: [
    {
      type: Schema.Types.ObjectId,
      ref: "timetable",
    },
  ],
  customers: [
    {
      type: Schema.Types.ObjectId,
      ref: "customer",
    },
  ],
  limit_customer: {
    type: Number,
    default: 4,
  },
  customer_length: {
    type: Number,
    default: 0,
  },
});

export default model<IRangeHour>("rangehour", rangeHourSchema);
