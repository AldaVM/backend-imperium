import { BaseController } from "./base.controller";
import { customerService } from "../services";

class CustomerController extends BaseController {
  constructor(customerService: any) {
    super(customerService);
  }
}

const customerController = new CustomerController(customerService);

export { customerController, CustomerController };
