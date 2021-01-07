import { Model } from "mongoose";
import { BaseRepository } from "./base.repository";
import { VoucherModel } from "../models";
import { IVoucher } from "../models/voucher.model";

class VoucherRepository extends BaseRepository {
  private _voucher: Model<IVoucher>;
  constructor(voucher: Model<IVoucher>) {
    super(voucher);
    this._voucher = voucher;
  }
}

const voucherRepository = new VoucherRepository(VoucherModel);

export { voucherRepository, VoucherRepository };
