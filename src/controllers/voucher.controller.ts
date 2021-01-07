import { BaseController } from "./base.controller";
import { voucherService } from "../services";
import { VoucherServices } from "services/voucher.service";
import { Response, Request } from "express";

class VoucherController extends BaseController {
  private _voucherService: VoucherServices;

  constructor(voucherService: any) {
    super(voucherService);
    this._voucherService = voucherService;
    this.registerVoucher = this.registerVoucher.bind(this);
  }

  async registerVoucher(req: Request, res: Response) {
    const { body } = req;

    const voucher = await this._voucherService.registerVoucher(body);

    res.status(voucher.status).json(voucher);
  }
}

const voucherController = new VoucherController(voucherService);

export { voucherController, VoucherController };
