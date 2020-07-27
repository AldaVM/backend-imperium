import { Schema, model, Document } from "mongoose";

export interface IVoucher extends Document {
  paid: Schema.Types.ObjectId;
  customers: Schema.Types.ObjectId;
  date_init: Date;
  date_expiration: Date;
  total: number;
}

const voucherSchema = new Schema({
  paid: {
    type: Schema.Types.ObjectId,
    ref: "paid",
    autopopulate: true,
    required: [true, "paid is required"],
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "customer",
    autopopulate: true,
    required: [true, "customer is required"],
  },
  date_init: {
    type: Date,
    required: [true, "class_shift is required"],
  },
  date_expiration: {
    type: Number,
    required: [true, "vacancies is required"],
  },
  total: {
    type: String,
    required: [true, "hour is required"],
  },
});

voucherSchema.plugin(require("mongoose-autopopulate"));
export default model<IVoucher>("timetable", voucherSchema);
