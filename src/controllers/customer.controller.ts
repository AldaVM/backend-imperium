import { BaseController } from "./base.controller";
import { customerService } from "../services";
import { Request, Response } from "express";
import { CustomerServices } from "services/customer.service";

class CustomerController extends BaseController {

  private _customerService: CustomerServices

  constructor(customerService: any) {
    super(customerService);
    this._customerService = customerService;
    this.validateShiftByDNI = this.validateShiftByDNI.bind(this);
  }

  async validateShiftByDNI(req: Request, res: Response) {

    const { dni } = req.params

    const record = await this._customerService.validateShiftByDNI(dni)

    res.status(record.status).json(record);

  }

}

const customerController = new CustomerController(customerService);

export { customerController, CustomerController };
