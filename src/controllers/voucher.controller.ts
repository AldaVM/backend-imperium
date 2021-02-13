import { BaseController } from "./base.controller";
import { voucherService } from "../services";
import { VoucherServices } from "services/voucher.service";
import { Response, Request } from "express";
import fs from "fs";

class VoucherController extends BaseController {
  private _voucherService: VoucherServices;

  constructor(voucherService: any) {
    super(voucherService);
    this._voucherService = voucherService;
    this.registerVoucher = this.registerVoucher.bind(this);
    this.genereteVocuherPDF = this.genereteVocuherPDF.bind(this);
  }

  async registerVoucher(req: Request, res: Response) {
    const { body } = req;

    const voucher = await this._voucherService.registerVoucher(body);

    res.status(voucher.status).json(voucher);
  }

  async genereteVocuherPDF(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this._voucherService.genereteVocuherPDF(id);
      const stream = fs.createReadStream(`${id}.pdf`);
      stream.pipe(res);
      fs.unlinkSync(`${id}.pdf`);
    } catch (error) {
      res.json(500).json({
        ok: false,
        status: 500,
        message: "Error",
        error,
      });
    }
  }
}

const voucherController = new VoucherController(voucherService);

export { voucherController, VoucherController };
