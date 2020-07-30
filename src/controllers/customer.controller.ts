import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { customerService } from "../services";
import { ICustomerServices } from "../services/customer.service";

class CustomerController extends BaseController {
  private _customerService: ICustomerServices;

  constructor(customerService: ICustomerServices) {
    super(customerService);
    this._customerService = customerService;
    this.findByGender = this.findByGender.bind(this);
  }

  async findByGender(req: Request, res: Response) {
    const { gender } = req.params;

    const customers = await this._customerService.findByGender(gender);

    res.status(200).json({
      code: 200,
      message: "Records list",
      data: customers,
    });
  }
}

const customerController = new CustomerController(customerService);

export { customerController, CustomerController };
