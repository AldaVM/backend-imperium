import { BaseService } from "./base.service";
import { customerRepository } from "../repositories";
import { CustomerRepository } from "../repositories/customer.repository";

class CustomerServices extends BaseService {
  private _customerRepository: CustomerRepository;

  constructor(customerRepository: any) {
    super(customerRepository);
    this._customerRepository = customerRepository;
    this.validateShiftByDNI = this.validateShiftByDNI.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
    this.deleteTimetable = this.deleteTimetable.bind(this);
    this.addVoucher = this.addVoucher.bind(this);
    this.validatePendingVouchers = this.validatePendingVouchers.bind(this);
  }

  validatePendingVouchers(vouchers: any, status_last_voucher: string) {
    let pendings = [];

    if (vouchers.length > 0) {
      pendings = vouchers.filter(
        (voucher: any) => voucher.status_paid == "pending"
      );
    }

    return {
      isPendings: pendings.length > 1,
      count:
        status_last_voucher == "pending"
          ? pendings.length + 1
          : pendings.length,
    };
  }

  async addVoucher(idCustomer: string, newVoucher: any) {
    try {
      const customer: any = await this._customerRepository.findById(idCustomer);

      customer.vouchers.push(newVoucher._id);

      const result = this.validatePendingVouchers(
        customer.vouchers,
        newVoucher.status_paid
      );
      const status_paid = result.isPendings
        ? `pagos pendientes ${result.count}`
        : "sin pagos pendientes";

      await this._customerRepository.update(idCustomer, {
        vouchers: customer.vouchers,
        status_paid: status_paid,
      });

      return {
        ok: true,
        status: 200,
        message: "Nuevo voucher registrado",
        status_paid,
      };
    } catch (error) {
      return {
        ok: false,
        status: 500,
        message: "Error",
        error: error.message,
      };
    }
  }

  async deleteCustomer(id: string) {
    try {
      const record = await this._customerRepository.delete(id);

      return {
        ok: true,
        status: 200,
        message: "El usuario ha sido eliminado",
        deleted: record ? true : false,
      };
    } catch (error) {
      return {
        ok: false,
        status: 500,
        message: "Error",
        data: error,
      };
    }
  }
  async deleteTimetable(id: string) {
    try {
      const customer = await this._customerRepository.deleteTimetable(id);

      return {
        ok: true,
        status: 200,
        message: "Se retiro al cliente del turno",
        deleted: customer ? true : false,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        status: 500,
        message: "Error",
        data: error,
      };
    }
  }

  async validateShiftByDNI(dni: string) {
    const items = { dni };

    try {
      const [customer] = await this._customerRepository.findByItems(items);

      if (customer) {
        return customer.timetable.length >= 1
          ? {
              ok: false,
              status: 401,
              message: `Ya está inscrito a un turno 😀`,
            }
          : {
              ok: true,
              status: 200,
              message: "Registrar turno",
              data: customer,
            };
      }

      return {
        ok: false,
        status: 404,
        message: "No estás registrado o el documento es inválido 😕",
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

const customerService = new CustomerServices(customerRepository);

export { customerService, CustomerServices };
