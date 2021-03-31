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
    this.deleteTimetable = this.deleteTimetable.bind(this);
  }

  async create(entity: any) {

    const customer = new this._customerModel(entity);
    customer.create_at = customer._id.getTimestamp();

    return await customer.save();
  }

  async deleteTimetable(id: string) {
    const customer = await this._customerModel.findByIdAndUpdate(id, {
      $unset: { timetable: 1, date_timetable: 1 },
    });
    return customer;
  }
}

const customerRepository = new CustomerRepository(CustomerModel);

export { customerRepository, CustomerRepository };
