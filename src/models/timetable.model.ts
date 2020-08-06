import { Schema, model, Document } from "mongoose";

export interface ITimetable extends Document {
  class_shift: string;
  intermediate_days: string;
  vacancies: number;
  hour: string;
  customers?: [object];
  customerLength: number;
}

const timetableSchema = new Schema({
  class_shift: {
    type: String,
    required: [true, "class_shift is required"],
  },
  intermediate_days: {
    type: String,
    required: [true, "class_shift is required"],
  },
  vacancies: {
    type: Number,
    required: [true, "vacancies is required"],
  },
  hour: {
    type: String,
    required: [true, "hour is required"],
  },
  customers: [
    {
      type: Schema.Types.ObjectId,
      ref: "customer",
      autopopulate: true,
    },
  ],
  customerLength: {
    type: Number,
    default: 0
  }
});

timetableSchema.plugin(require("mongoose-autopopulate"));
export default model<ITimetable>("timetable", timetableSchema);
