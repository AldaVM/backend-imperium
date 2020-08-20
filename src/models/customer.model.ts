import { Schema, model, Document } from "mongoose";

export interface ICustomer extends Document {
  names: string;
  surnames: string;
  dni: string;
  create_at: number;
  phone_number?: string;
  age?: number;
  gender?: string;
  address?: string;
  email?: string;
  optional_number?: string;
  reference?: string;
  image?: string;
}

const customerSchema = new Schema({
  names: {
    type: String,
    required: [true, "name is required"],
  },
  surnames: {
    type: String,
    required: [true, "surnames is required"],
  },
  dni: {
    type: String,
    required: [true, "dni is required"],
    match: [/^[0-9]*$/],
  },
  phone_number: {
    type: String,
    match: [/^[0-9]*$/],
  },
  create_at: {
    type: Number,
    required: [true, "create_at is required"],
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  optional_number: {
    type: String,
    match: [/^[0-9]*$/],
  },
  reference: {
    type: String,
  },
  image: String,
});

export default model<ICustomer>("customer", customerSchema);
