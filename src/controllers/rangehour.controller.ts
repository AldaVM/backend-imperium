import { BaseController } from "./base.controller";
import { rangeHoursService } from "../services";
import { RangeHoursService } from "services/rangehour.service";

class RangeHoursController extends BaseController {
  private _rangeHoursService: RangeHoursService;

  constructor(rangeHoursService: any) {
    super(rangeHoursService);
    this._rangeHoursService = rangeHoursService;
  }
}

const rangeHoursController = new RangeHoursController(rangeHoursService);

export { rangeHoursController, RangeHoursController };
