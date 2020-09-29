import { BaseService } from "./base.service";
import { rangeHours } from "../repositories";
import { RangeHoursRepository } from "../repositories/rangehour.repository";

class RangeHoursService extends BaseService {
  private _rangeHoursService: RangeHoursRepository;

  constructor(rangeHoursRepository: any) {
    super(rangeHoursRepository);
    this._rangeHoursService = rangeHoursRepository;
  }
}

const rangeHoursService = new RangeHoursService(rangeHours);

export { rangeHoursService, RangeHoursService };
