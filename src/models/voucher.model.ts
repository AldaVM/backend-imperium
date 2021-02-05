import { Schema, model, Document } from "mongoose";

export interface IVoucher extends Document {
  paid: Schema.Types.ObjectId;
  customer: Schema.Types.ObjectId;
  date_init: Date;
  date_expiration: Date;
  total: number;
}

const voucherSchema = new Schema({
  paid: {
    type: Schema.Types.ObjectId,
    ref: "paid",
    autopopulate: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "customer",
    autopopulate: {
      select: ["dni", "names", "surnames"],
      maxDepth: 1,
    },
    required: [true, "customer is required"],
  },
  date_init: {
    type: Date,
    required: [true, "date_init is required"],
  },
  date_expiration: {
    type: Date,
    required: [true, "date_expiration is required"],
  },
  rate: {
    type: Number,
    required: [true, "total is required"],
  },
  amount_paid: {
    type: Number,
    required: [true, "amount_paid is required"],
  },
  residue: {
    type: Number,
    required: [true, "residue is required"],
  },
  status_paid: {
    type: String,
    required: [true, "status_paid is required"],
  },
  hours_turn: {
    type: String,
  },
  turn_detail: {
    type: String,
  },
  type_modality: {
    type: String,
  },
});

voucherSchema.plugin(require("mongoose-autopopulate"));
export default model<IVoucher>("voucher", voucherSchema);
