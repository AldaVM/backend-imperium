import { BaseService } from "./base.service";
import { customerRepository, timetableRepository } from "../repositories";
import { IBaseRepository } from "repositories/base.repository";

class CustomerServices extends BaseService {
  private _customerRepository: IBaseRepository;

  constructor(customerRepository: any) {
    super(customerRepository);
    this._customerRepository = customerRepository;
    this.validateShiftByDNI = this.validateShiftByDNI.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
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

  async validateShiftByDNI(dni: string) {
    const items = { dni };

    try {
      const [customer] = await this._customerRepository.findByItems(items);

      if (customer) {
        return customer.timetable
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
