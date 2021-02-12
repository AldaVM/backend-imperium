import { BaseController } from "./base.controller";
import { voucherService } from "../services";
import { VoucherServices } from "services/voucher.service";
import { Response, Request } from "express";
import fs from "fs";
import path from "path";

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

      const voucher = await this._voucherService.genereteVocuherPDF(id);
      const file = `${id}.pdf`;
      const filename = path.basename(file);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=" + filename);

      const filestream = fs.createReadStream(file);
      filestream.pipe(res.status(voucher.status).json(voucher));
      fs.unlinkSync(filename);
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
