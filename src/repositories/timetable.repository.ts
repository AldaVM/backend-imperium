import { BaseRepository } from "./base.repository";
import { Model } from "mongoose";
import { ITimetable } from "../models/timetable.model";
import { TimetableModel } from "../models";

class TimetableRepository extends BaseRepository {
  private _timetable: Model<ITimetable>;

  constructor(timetableModel: Model<ITimetable>) {
    super(timetableModel);
    this._timetable = timetableModel;
  }
}

const timetableRepository = new TimetableRepository(TimetableModel);

export { timetableRepository, TimetableRepository };
