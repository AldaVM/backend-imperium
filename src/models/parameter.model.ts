import { model, Schema, Document } from "mongoose";

export interface IParameter extends Document {
  name: string;
  value: string;
  description: string;
}

const parameterSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is requierd"],
  },
  value: {
    type: String,
    required: [true, "Value is requierd"],
  },
  description: {
    type: String,
    required: [true, "description is requierd"],
  },
});

export default model<IParameter>("parameter", parameterSchema);
