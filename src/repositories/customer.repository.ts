import { BaseRepository } from "./base.repository";
import { Model } from "mongoose";
import { ICustomer } from "../models/customer.model";
import { CustomerModel } from "../models";


class CustomerRepository extends BaseRepository {
  private _customerModel: Model<ICustomer>;

  constructor(customerModel: Model<ICustomer>) {
    super(customerModel);
    this._customerModel = customerModel;
    this.create = this.create.bind(this);
  }

  async create(entity: object) {
    const customer = new this._customerModel(entity);
    customer.create_at = customer._id.getTimestamp();

    return await customer.save();
  }

}

const customerRepository = new CustomerRepository(CustomerModel);

export { customerRepository, CustomerRepository };
