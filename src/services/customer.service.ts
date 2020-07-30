import { BaseService, IBaseService } from "./base.service";
import { customerRepository } from "../repositories";
import { ICustomerRepository } from "../repositories/customer.repository";
import { verifyEntity } from "../helpers/verify-entity.helper";

interface ICustomerServices extends IBaseService {
  findByGender(gender: string): Promise<any>;
}

class CustomerServices extends BaseService {
  private _customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    super(customerRepository);
    this._customerRepository = customerRepository;
    this.findByGender = this.findByGender.bind(this);
  }

  async findByGender(gender: string) {
    const customers = await this._customerRepository.findByGender(gender);

    verifyEntity(customers, { status: 404, message: "Registry is not found" });

    return customers;
  }
}

const customerService: ICustomerServices = new CustomerServices(
  customerRepository
);

export { customerService, CustomerServices, ICustomerServices };
