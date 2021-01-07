import { BaseService } from "./base.service";
import { voucherRepository } from "../repositories";
import { VoucherRepository } from "../repositories/voucher.repository";
import { customerService } from "../services";

class VoucherServices extends BaseService {
  private _voucherRepository: VoucherRepository;

  constructor(voucherRepository: any) {
    super(voucherRepository);
    this._voucherRepository = voucherRepository;
    this.registerVoucher = this.registerVoucher.bind(this);
  }

  async registerVoucher(entity: any) {
    try {
      const newVoucher = await this._voucherRepository.create(entity);
      await customerService.addVoucher(entity?.customer, newVoucher?._id);

      return {
        ok: true,
        status: 200,
        message: `Nuevo voucher registrado al cliente ${entity?.customer}`,
        data: newVoucher,
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
