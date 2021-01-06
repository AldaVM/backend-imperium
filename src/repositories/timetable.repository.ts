import { BaseRepository } from "./base.repository";
import { Model } from "mongoose";
import { ITimetable } from "../models/timetable.model";
import { TimetableModel } from "../models";

class TimetableRepository extends BaseRepository {
  private _timetable: Model<ITimetable>;

  constructor(timetableModel: Model<ITimetable>) {
    super(timetableModel);
    this._timetable = timetableModel;
    this.findShiftsAvailable = this.findShiftsAvailable.bind(this);
  }

  async findShiftsAvailable(items: object, maxVacant: number): Promise<any> {
    const records = await this._timetable
      .find({ customerLength: { $gte: 0, $lte: maxVacant }, ...items })
      .exec();

    return records;
  }
}

const timetableRepository = new TimetableRepository(TimetableModel);

export { timetableRepository, TimetableRepository };
