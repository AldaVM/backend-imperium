import { BaseService } from "./base.service";
import { customerRepository } from "../repositories";

class CustomerServices extends BaseService {
  constructor(customerRepository: any) {
    super(customerRepository);
  }
}

const customerService = new CustomerServices(customerRepository);

export { customerService, CustomerServices };
