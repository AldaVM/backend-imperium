import { BaseRepository, IBaseRepository } from "./base.repository";
import { Model } from "mongoose";
import { ICustomer } from "../models/customer.model";
import { CustomerModel } from "../models";

interface ICustomerRepository extends IBaseRepository {
  findByGender(gender: string): Promise<any>;
}

class CustomerRepository extends BaseRepository {
  private _customerModel: Model<ICustomer>;

  constructor(customerModel: Model<ICustomer>) {
    super(customerModel);
    this._customerModel = customerModel;
    this.create = this.create.bind(this);
    this.findByGender = this.findByGender.bind(this);
  }

  async create(entity: object) {
    const customer = new this._customerModel(entity);
    customer.create_at = customer._id.getTimestamp();

    return await customer.save();
  }

  async findByGender(gender: string) {
    const customers = await this._customerModel.find({ gender }).exec();

    return customers;
  }
}

const customerRepository: ICustomerRepository = new CustomerRepository(
  CustomerModel
);

export { customerRepository, CustomerRepository, ICustomerRepository };
