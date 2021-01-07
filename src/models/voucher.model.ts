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
      select: ["dni", "names", "surnames", "email"],
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
  total: {
    type: Number,
    required: [true, "total is required"],
  },
});

voucherSchema.plugin(require("mongoose-autopopulate"));
export default model<IVoucher>("voucher", voucherSchema);
