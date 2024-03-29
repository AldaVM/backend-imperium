import { BaseService } from "./base.service";
import { voucherRepository } from "../repositories";
import { VoucherRepository } from "../repositories/voucher.repository";
import { customerService, createNewPDF } from "../services";
import { createSchemaPDFVoucher } from "../helpers";
class VoucherServices extends BaseService {
  private _voucherRepository: VoucherRepository;

  constructor(voucherRepository: any) {
    super(voucherRepository);
    this._voucherRepository = voucherRepository;
    this.registerVoucher = this.registerVoucher.bind(this);
    this.calculatePaid = this.calculatePaid.bind(this);
    this.genereteVocuherPDF = this.genereteVocuherPDF.bind(this);
  }

  async genereteVocuherPDF(idVoucher: string) {
    try {
      const voucher = await this._voucherRepository.findById(idVoucher);
      const schemaVoucher = createSchemaPDFVoucher(voucher._doc);
  
      await createNewPDF(schemaVoucher, idVoucher);

      return {
        ok: true,
        status: 200,
        message: `Gernando pdf del voucher ${idVoucher}`,
        data: voucher,
      };
    } catch (error) {
      return {
        ok: false,
        status: 500,
        message: "Error",
        error,
      };
    }
  }

  calculatePaid(entity: any) {
    const { rate, amount_paid } = entity;

    const status_paid = rate - amount_paid === 0 ? "completed" : "pending";
    const residue = rate - amount_paid;

    return {
      status_paid,
      residue,
    };
  }

  async registerVoucher(entity: any) {
    try {
      const paid_numbers = this.calculatePaid(entity);
      const newVoucher = await this._voucherRepository.create({
        ...entity,
        ...paid_numbers,
      });

      const response = await customerService.addVoucher(
        entity?.customer,
        newVoucher
      );

      return {
        ok: true,
        status: 200,
        message: `Nuevo voucher registrado al cliente ${entity?.customer}`,
        data: newVoucher,
        response,
      };
    } catch (error) {
      return {
        ok: false,
        status: 500,
        message: "Error",
        error,
      };
    }
  }
}

const voucherService = new VoucherServices(voucherRepository);

export { voucherService, VoucherServices };
