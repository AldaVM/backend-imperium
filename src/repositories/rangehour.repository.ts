import { BaseRepository } from "./base.repository";
import { Model } from "mongoose";
import { IRangeHour } from "../models/rangehour.model";
import { RangeHour } from "../models";

class RangeHoursRepository extends BaseRepository {
  private _rangeHour: Model<IRangeHour>;

  constructor(rangeHoursModel: Model<IRangeHour>) {
    super(rangeHoursModel);
    this._rangeHour = rangeHoursModel;
  }
}

const rangeHours = new RangeHoursRepository(RangeHour);

export { rangeHours, RangeHoursRepository };
