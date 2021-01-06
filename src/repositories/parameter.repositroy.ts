import { BaseRepository } from "./base.repository";
import { Model } from "mongoose";
import { IParameter } from "../models/parameter.model";
import { Parameter } from "../models";

class ParameterRepository extends BaseRepository {
  private _parameter: Model<IParameter>;

  constructor(parameterModel: Model<IParameter>) {
    super(parameterModel);
    this._parameter = parameterModel;
  }
}

const parameter = new ParameterRepository(Parameter);

export { parameter, ParameterRepository };
